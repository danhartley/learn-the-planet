import { CollectionList } from '@/components/CollectionList'
import { Collection } from '@/types'
import { getCollections } from '@/api/collections'

export default async function CollectionsPage() {
  const collections: Collection[] = await getCollections()

  return <CollectionList collections={collections} />
}
