import { CollectionProvider } from '@/contexts/CollectionContext'

import { CreateOperation } from '@/components/collection/CreateOperation'

export default function Page() {
  return (
    <>
      <h1>Create collection</h1>
      <CollectionProvider>
        <CreateOperation />
      </CollectionProvider>
    </>
  )
}
