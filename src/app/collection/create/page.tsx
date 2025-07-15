import { CollectionProvider } from '@/contexts/CollectionContext'

import { CreateOperation } from '@/components/collection/CreateOperation'

export default function Page() {
  return (
    <>
      <h1>Create collection</h1>
      <div>Create a new topic or a collection of taxa, traits or terms</div>
      <CollectionProvider>
        <CreateOperation />
      </CollectionProvider>
    </>
  )
}
