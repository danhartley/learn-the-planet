'use client'

import { useState } from 'react'

import { useSession } from 'next-auth/react'
import { useAuthenticatedAuthor } from '@/hooks/useAuthenticatedAuthor'

import { Articles } from '@/components/author/Articles'
import { Author } from '@/components/author/Author'

import { Author as AuthorType, SessionState } from '@/types'

type Props = {
  authors: AuthorType[]
}

export const Authors = ({ authors }: Props) => {
  const { data: session } = useSession()
  const authenticatedAuthor = useAuthenticatedAuthor(
    session as unknown as SessionState
  )
  const [editingAuthorId, setEditingAuthorId] = useState<string | null>(null)

  const toggleEditAuthor = (authorId: string) => {
    setEditingAuthorId(editingAuthorId === authorId ? null : authorId)
  }

  const canEditAuthor = (author: AuthorType) => {
    return (
      session?.user?.id === author.ownerId ||
      authenticatedAuthor?.role === 'admin'
    )
  }

  return (
    <>
      <ul className="list-group">
        {authors.map(author => {
          const isEditing = editingAuthorId === author.id

          return (
            <li key={author.id} className="list-group">
              <div>
                {author.displayName}{' '}
                {session?.user?.id === author.ownerId ? '*' : ''}
              </div>
              {isEditing && authenticatedAuthor ? (
                <Author
                  authenticatedAuthor={authenticatedAuthor}
                  authorToEdit={author}
                />
              ) : (
                <div>
                  <em>{author.bio}</em>
                </div>
              )}
              <div>
                {canEditAuthor(author) && (
                  <button
                    onClick={() => toggleEditAuthor(author.id)}
                    className={`small ${isEditing ? 'cancel' : ''}`}
                  >
                    {isEditing ? 'Cancel edit' : 'Edit'}
                  </button>
                )}
              </div>
              <Articles
                ownerId={author.ownerId}
                author={author.displayName}
                authenticatedAuthor={authenticatedAuthor}
              />
              <hr />
            </li>
          )
        })}
      </ul>
    </>
  )
}
