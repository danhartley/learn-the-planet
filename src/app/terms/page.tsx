import { auth } from '@/auth'

import { CollectionProvider } from '@/contexts/CollectionContext'

import { TermHome } from '@/components/collection/term/TermHome'

import { SessionState } from '@/types'

export default async function CollectionsPage() {
  const session = await auth()

  return (
    <CollectionProvider>
      <TermHome session={session as unknown as SessionState} />
    </CollectionProvider>
  )
}
