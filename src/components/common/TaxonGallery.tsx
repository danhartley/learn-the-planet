'use client'

import { useRouter } from 'next/navigation'
import { useTestPlanner } from '@/hooks/useTestPlanner'

import { Collection, Taxon } from '@/types'
import { TaxonCard } from '@/components/common/TaxonCard'

type Props<Taxon> = {
  collection: Collection<Taxon>
}

export const TaxonGallery = ({ collection }: Props<Taxon>) => {
  if (!collection?.items?.[0]) return

  const router = useRouter()
  const { startTest } = useTestPlanner<Taxon>()

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

  return (
    <section aria-labelledby="taxon-gallery" className="group">
      <h1 id="taxon-gallery">Collection notes</h1>
      <h2>{collection.name}</h2>
      <div>{collection.date}</div>
      <div>{collection.location}</div>
      <section aria-labelledby="taxa" className="group-block">
        <h3 id="taxa">Taxa</h3>
        <div className="block">{taxa}</div>
        <button id="start-test" onClick={handleStartTest}>
          Start test
        </button>
      </section>
    </section>
  )
}
