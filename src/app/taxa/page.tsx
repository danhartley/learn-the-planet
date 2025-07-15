import { auth } from '@/auth'

import { CollectionProvider } from '@/contexts/CollectionContext'

import { TaxonHome } from '@/components/collection/taxon/TaxonHome'

import { SessionState } from '@/types'

export default async function CollectionsPage() {
  const session = await auth()

  return (
    <CollectionProvider>
      <TaxonHome session={session as unknown as SessionState} />
    </CollectionProvider>
  )
}
