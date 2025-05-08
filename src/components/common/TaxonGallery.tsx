'use client'

import Link from 'next/link'

import { useRouter } from 'next/navigation'
import { useTestPlanner } from '@/hooks/useTestPlanner'

import { Collection, Taxon, SubCollectionSummary } from '@/types'
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

  const articles = collection.article?.sections.map((section, sectionIndex) => {
    return (
      <div key={sectionIndex} className="article-item">
        {/* Render all paragraphs */}
        {section.text.map((para, paraIndex) => (
          <p key={`${sectionIndex}-${paraIndex}`}>{para}</p>
        ))}

        {/* Render credit information once per article item */}
        <div className="article-credit">
          <p>
            <em>{section.credit.title}</em>
          </p>
          <p>Authors: {section.credit.authors.join(', ')}</p>
          <p>
            <a href={section.credit.source}>Source</a>
          </p>
        </div>
      </div>
    )
  })

  return (
    <section aria-labelledby="taxon-gallery" className="group">
      <h1 id="taxon-gallery">Collection notes</h1>
      <h2>{collection.name}</h2>
      <div>{collection.date}</div>
      <div>{collection.location}</div>
      <article>{articles}</article>
      {fieldNotesUrl}
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
