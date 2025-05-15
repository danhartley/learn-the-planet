import CollectionOperations from '@/components/common/CollectionOperations'
import { ContentHandlerType } from '@/types'

export default function Page() {
  const type: ContentHandlerType = 'trait' // extract for URL

  return (
    <>
      <h1>Edit collection</h1>
      <CollectionOperations operation="update" collectionType={type} />
    </>
  )
}
