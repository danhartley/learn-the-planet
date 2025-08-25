import { auth } from '@/auth'

import { CollectionProvider } from '@/contexts/CollectionContext'

import { Author as AuthorType, SessionState } from '@/types'
import { getAuthorByOwnerId } from '@/api/database'

import { Author } from '@/components/author/Author'

export default async function Page() {
  const session = await auth()
  const ownerId = session?.user?.id
  let author: AuthorType | undefined
  if (ownerId) author = await getAuthorByOwnerId(ownerId)

  return (
    <CollectionProvider>
      <>
        <h1>Author</h1>
        {author && <Author authenticatedAuthor={author} />}
      </>
    </CollectionProvider>
  )
}
