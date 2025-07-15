import { auth } from '@/auth'

import { CollectionProvider } from '@/contexts/CollectionContext'

import { TopicHome } from '@/components/collection/topic/TopicHome'

import { SessionState } from '@/types'

export default async function CollectionsPage() {
  const session = await auth()

  return (
    <CollectionProvider>
      <TopicHome session={session as unknown as SessionState} />
    </CollectionProvider>
  )
}
