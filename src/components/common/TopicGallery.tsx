'use client'

import Link from 'next/link'

import { Collection, Taxon, CollectionSummary, Topic } from '@/types'

type Props<Topic> = {
  collection: Collection<Topic>
}

export const TopicGallery = ({ collection }: Props<Topic>) => {
  const fieldNotesUrl = collection?.fieldNotes?.url ? (
    <Link href={collection.fieldNotes.url}>Field notes</Link>
  ) : null

  const collections = collection?.collections?.map(
    (subCollection: CollectionSummary<Taxon>) => {
      return subCollection ? (
        <li key={subCollection.id}>
          <Link href={`/collection/${encodeURIComponent(subCollection.id)}`}>
            {subCollection.name}
          </Link>
        </li>
      ) : null
    }
  )

  const articles = collection.items.map((section, sectionIndex) => {
    return (
      <div key={sectionIndex} className="article-item">
        {/* Render all paragraphs */}
        {section.text.map((para, paraIndex) => (
          <p key={`${sectionIndex}-${paraIndex}`}>{para}</p>
        ))}

        {/* Render credit information once per article item */}
        <div className="article-credit">
          <p>
            <em>{section?.credit?.title}</em>
          </p>
          <p>Authors: {section?.credit?.authors.join(', ')}</p>
          <p>
            <a href={section?.credit?.source}>Source</a>
          </p>
        </div>
      </div>
    )
  })

  const terms = collections?.filter(sc => sc?.type === 'term') ? (
    <section aria-labelledby="topic-gallery" className="sub-section">
      <h3 id="topic-gallery">Terms</h3>
      <ul>{collections}</ul>
    </section>
  ) : null

  return (
    <section aria-labelledby="collection" className="group">
      <h1 id="collection">Collection overview</h1>
      <h2>{collection.name}</h2>
      <div>{collection.date}</div>
      <div>{collection.location}</div>
      <article>{articles}</article>
      {terms}
      {fieldNotesUrl}
    </section>
  )
}
