import { CollectionList } from '@/components/CollectionList'
import { Collection } from '@/types'
import { getCollections } from '../api/collections' // This could read from a file initially

export default async function CollectionsPage() {
  const collections: Collection[] = await getCollections()

  return <CollectionList collections={collections} />
}
