import CollectionOperations from '@/components/common/CollectionOperations'

import { ContentType } from '@/types'

export default function Page() {
  return (
    <>
      <h1>Create collection</h1>
      <CollectionOperations operation="create" />
    </>
  )
}
