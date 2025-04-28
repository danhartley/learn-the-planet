'use client'

import Link from 'next/link'

import { useRouter } from 'next/navigation'
import { useTestPlanner } from '@/hooks/useTestPlanner'

import { Collection, Taxon, SubCollectionSummary } from '@/types'
import { TaxonCard } from '@/components/common/TaxonCard'

type Props = {
  collection: Collection<Taxon>
}

export const TaxonGallery = ({ collection }: Props) => {
  if (!collection?.items?.[0]) return

  const router = useRouter()
  const { startTest } = useTestPlanner<T>()

  const handleStartTest = () => {
    startTest(collection)
    router.push('/test')
  }

  const taxa = collection?.items.map(item => {
    const firstImage = item?.images ? item.images[0] : null
    const image = item?.image || firstImage
    if (!image) return
    return <TaxonCard key={item.id + crypto.randomUUID()} taxon={item} />
  })

  const fieldNotesUrl = collection?.fieldNotes?.url ? (
    <Link href={collection.fieldNotes.url}>Field notes</Link>
  ) : null

  const subCollections = collection?.collections?.map(
    (subCollection: SubCollectionSummary<Taxon>) => {
      return subCollection ? (
        <li key={subCollection.id}>
          <Link href={`/collection/${encodeURIComponent(subCollection.id)}`}>
            {subCollection.name}
          </Link>
        </li>
      ) : null
    }
  )

  const definitions = subCollections?.filter(
    sc => sc?.type === 'definition'
  ) ? (
    <section aria-labelledby="definitions" className="sub-section">
      <h3 id="definitions">Terms</h3>
      <ul>{subCollections}</ul>
    </section>
  ) : null

  return (
    <section aria-labelledby="collection" className="group">
      <h1 id="collection">Collection: {collection.name}</h1>
      <div>{collection.date}</div>
      <div>{collection.location}</div>
      {definitions}
      {fieldNotesUrl}
      <section aria-labelledby="taxa" className="sub-section">
        <h3 id="taxa">Taxa</h3>
        <div className="block">{taxa}</div>
        <button id="start-test" onClick={handleStartTest}>
          Test your knowledge of these taxa
        </button>
      </section>
    </section>
  )
}
