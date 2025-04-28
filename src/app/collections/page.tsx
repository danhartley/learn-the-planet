import { CollectionList } from '@/components/CollectionList'
import { Collection } from '@/types'
import { getCollections } from '@/api/collections'

export default async function CollectionsPage<T>() {
  const collections: Collection<T>[] = await getCollections()

  const taxa = collections.filter(c => c.type === 'taxon')
  const definitions = collections.filter(c => c.type === 'definition')

  return (
    <>
      <h2 id="collections">Available Collections</h2>
      <section aria-labelledby="taxa">
        <h3 id="taxa">Taxa</h3>
        <CollectionList collections={taxa} />
      </section>
      <section aria-labelledby="definitions">
        <h3 id="definitions">Terms</h3>
        <CollectionList collections={definitions} />
      </section>
    </>
  )
}
