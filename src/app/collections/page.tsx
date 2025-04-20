import { CollectionList } from '@/components/CollectionList'
import { Collection } from '@/types'
import { getCollections } from '@/api/collections'

export default async function CollectionsPage<T>() {
  const collections: Collection<T>[] = await getCollections()

  return <CollectionList collections={collections} />
}
