import { CollectionProvider } from '@/contexts/CollectionContext'

import { CreateOperation } from '@/components/collection/CreateOperation'

export default function Page() {
  return (
    <>
      <div className="group">
        <h1>Create collection</h1>
        <div>Create a new topic or a collection of taxa, traits or terms</div>
      </div>
      <CollectionProvider>
        <CreateOperation />
      </CollectionProvider>
    </>
  )
}
