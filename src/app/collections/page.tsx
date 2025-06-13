export const dynamic = 'force-dynamic'
export const revalidate = 0

import { CollectionList } from '@/components/CollectionList'
import { CollectionSummary } from '@/types'
import { getCollectionSummaries } from '@/api/database'

export default async function CollectionsPage() {
  let collections: CollectionSummary[] | undefined

  try {
    collections = await getCollectionSummaries()
  } catch (error) {
    console.error('Error fetching collections:', error)
    // You might want to show an error state here
    return <div>Error loading collections</div>
  }

  if (!collections) {
    console.log('No collections returned')
    return <div>No collections found</div>
  }

  const topics = collections.filter(c => c.type === 'topic')
  const traits = collections.filter(c => c.type === 'trait')
  const taxa = collections.filter(c => c.type === 'taxon')
  const terms = collections.filter(c => c.type === 'term')

  return (
    <section aria-labelledby="collections">
      <div className="group">
        <h1 id="collections">Collections</h1>
        <h2>Topics, traits, taxa, and terms</h2>
      </div>
      <section aria-labelledby="topics" className="group-block">
        <h3 id="topics">Topics</h3>
        <CollectionList collections={topics} />
      </section>
      <section aria-labelledby="traits" className="group-block">
        <h3 id="traits">Traits</h3>
        <CollectionList collections={traits} />
      </section>
      <section aria-labelledby="taxa" className="group-block">
        <h3 id="taxa">Taxa</h3>
        <CollectionList collections={taxa} />
      </section>
      <section aria-labelledby="terms" className="group-block">
        <h3 id="terms">Terms</h3>
        <CollectionList collections={terms} />
      </section>
    </section>
  )
}
