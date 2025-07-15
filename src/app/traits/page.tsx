import { auth } from '@/auth'

import { CollectionProvider } from '@/contexts/CollectionContext'

import { TraitHome } from '@/components/collection/trait/TraitHome'

import { SessionState } from '@/types'

export default async function CollectionsPage() {
  const session = await auth()

  return (
    <CollectionProvider>
      <TraitHome session={session as unknown as SessionState} />
    </CollectionProvider>
  )
}
