'use client'

import Link from 'next/link'

import { Collection, Taxon } from '@/types'
import { TaxonCard } from '@/components/common/TaxonCard'

type Props = {
  collection: Collection<Taxon>
}

export const TaxonGallery = ({ collection }: Props) => {
  if (!collection?.items?.[0]?.images?.[0]) return // Ensure items and images are properly accessed

  const images = collection?.items.map(item => {
    const image = item?.images ? item.images[0] : null
    if (!image) return
    return <TaxonCard key={item.id + crypto.randomUUID()} taxon={item} />
  })

  const fieldNotesUrl = collection?.fieldNotes?.url ? (
    <Link href={collection.fieldNotes.url}>Field notes</Link>
  ) : null

  return (
    <section aria-labelledby="collection" className="group">
      <h2 id="collection">Collection: {collection.name}</h2>
      <div>{collection.date}</div>
      <div>{collection.location}</div>
      {fieldNotesUrl}
      <div className="block">{images}</div>
    </section>
  )
}
