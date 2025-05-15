import CollectionOperations from '@/components/common/CollectionOperations'

import { ContentType } from '@/types'

export default function Page() {
  const types: ContentType[] = [
    {
      key: 'topic',
      value: 'topic',
    },
    {
      key: 'trait',
      value: 'trait',
    },
    {
      key: 'taxon',
      value: 'taxon',
    },
    {
      key: 'term',
      value: 'term',
    },
  ]
  return (
    <>
      <h1>Create collection</h1>
      <CollectionOperations operation="create" types={types} />
    </>
  )
}
