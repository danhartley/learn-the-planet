import { CollectionProvider } from '@/contexts/CollectionContext'

import { Author } from '@/types'
import { getAuthors } from '@/api/database'

import { Authors } from '@/components/author/Authors'

export default async function Page() {
  const authors: Author[] = await getAuthors()

  return (
    <CollectionProvider>
      <>
        <h1>Authors</h1>
        <Authors authors={authors} />
      </>
    </CollectionProvider>
  )
}
