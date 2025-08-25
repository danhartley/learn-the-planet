import { auth } from '@/auth'

import { CollectionProvider } from '@/contexts/CollectionContext'

import { Author, SessionState } from '@/types'
import { getAuthors } from '@/api/database'

import { Authors } from '@/components/author/Authors'

export default async function Page() {
  const session = await auth()
  const authors: Author[] = await getAuthors()

  return (
    <CollectionProvider>
      <>
        <h1>Authors</h1>
        <Authors
          authors={authors}
          session={session as unknown as SessionState}
        />
      </>
    </CollectionProvider>
  )
}
