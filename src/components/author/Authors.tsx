'use client'

import { useState, useEffect } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { Articles } from '@/components/author/Articles'
import { Author } from '@/components/author/Author'

import { Author as AuthorType, SessionState } from '@/types'

type Props = {
  authors: AuthorType[]
  session: SessionState | undefined
}

export const Authors = ({ authors, session }: Props) => {
  const { getAuthorByOwnerId } = useCollection()
  const [authenticatedAuthor, setAuthenticatedAuthor] = useState<
    AuthorType | undefined
  >()
  const [editingAuthorId, setEditingAuthorId] = useState<string | null>(null)

  useEffect(() => {
    const getAuthenticatedAuthor = async () => {
      if (session?.user.id) {
        const author = await getAuthorByOwnerId(session?.user.id)
        setAuthenticatedAuthor(author)
      }
    }
    getAuthenticatedAuthor()
  }, [session])

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
            <Articles ownerId={author.ownerId} author={author.displayName} />
            <div>
              {canEditAuthor(author) && (
                <button
                  onClick={() => toggleEditAuthor(author.id)}
                  className="small"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              )}
            </div>
            <hr />
          </li>
        )
      })}
    </ul>
  )
}
