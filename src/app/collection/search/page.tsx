import { CollectionProvider } from '@/contexts/CollectionContext'

import { Filters } from '@/components/collection/search/Filters'

export default function Page() {
  return (
    <CollectionProvider>
      <Filters />
    </CollectionProvider>
  )
}
