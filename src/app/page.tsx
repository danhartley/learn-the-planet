import { auth } from '@/auth'

import { CollectionProvider } from '@/contexts/CollectionContext'

import { CollectionSummaries } from '@/components/common/CollectionSummaries'

import { SessionState } from '@/types'

export default async function CollectionsPage() {
  const session = await auth()

  return (
    <CollectionProvider>
      <CollectionSummaries session={session as unknown as SessionState} />
    </CollectionProvider>
  )
}
