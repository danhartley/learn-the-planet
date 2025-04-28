import { CollectionList } from '@/components/CollectionList'
import { Collection } from '@/types'
import { getCollections } from '@/api/collections'

export default async function CollectionsPage<T>() {
  const collections: Collection<T>[] = await getCollections()

  const taxonomy = collections.filter(c => c.type === 'taxonomy')
  const definitions = collections.filter(c => c.type === 'definition')

  return (
    <>
      <h2 id="collections">Available Collections</h2>
      <section aria-labelledby="taxonomy">
        <h3 id="taxonomy">Taxonomy</h3>
        <CollectionList collections={taxonomy} />
      </section>
      <section aria-labelledby="definitions">
        <h3 id="definitions">Definitions</h3>
        <CollectionList collections={definitions} />
      </section>
    </>
  )
}
