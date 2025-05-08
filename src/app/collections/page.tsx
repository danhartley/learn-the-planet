import { CollectionList } from '@/components/CollectionList'
import { Collection } from '@/types'
import { getCollections } from '@/api/collections'

export default async function CollectionsPage<T>() {
  const collections: Collection<T>[] = await getCollections()

  const taxa = collections.filter(c => c.type === 'taxon')
  const definitions = collections.filter(c => c.type === 'definition')
  const topics = collections.filter(c => c.type === 'topic')

  return (
    <section aria-labelledby="collections">
      <div className="group">
        <h1 id="collections">Collections</h1>
        <h2>Taxa, terms and topics</h2>
      </div>
      <section aria-labelledby="topics" className="group-block">
        <h3 id="topics">Topics</h3>
        <CollectionList collections={topics} />
      </section>
      <section aria-labelledby="taxa" className="group-block">
        <h3 id="taxa">Taxa</h3>
        <CollectionList collections={taxa} />
      </section>
      <section aria-labelledby="terms" className="group-block">
        <h3 id="terms">Terms</h3>
        <CollectionList collections={definitions} />
      </section>
    </section>
  )
}
