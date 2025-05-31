'use client'

import React from 'react'
import Link from 'next/link'

import { Collection, CollectionSummary, Topic } from '@/types'

type Props<Topic> = {
  collection: Collection<Topic>
}

export const TopicGallery = ({ collection }: Props<Topic>) => {
  const fieldNotesUrl = collection?.fieldNotes?.url ? (
    <Link href={collection.fieldNotes.url}>Field notes</Link>
  ) : null

  const collections = collection?.collections?.map(
    (subCollection: CollectionSummary) => {
      return subCollection ? (
        <li key={subCollection.shortId}>
          <Link
            href={`/collection/${subCollection?.slug}-${encodeURIComponent(subCollection?.shortId || '')}`}
          >
            {subCollection.name}
          </Link>
        </li>
      ) : null
    }
  )
  const articles = collection.items.map((section, sectionIndex) => {
    return (
      <React.Fragment key={section.id}>
        <h3>{section.topic}</h3>
        <div key={sectionIndex} className="article-item">
          {section.text.map((para, paraIndex) => (
            <p key={`${sectionIndex}-${paraIndex}`}>{para}</p>
          ))}

          <div className="article-credit">
            <p>
              <a href={section?.credit?.source}>
                <em>{section?.credit?.title}</em>
              </a>
            </p>

            <p>
              {section?.credit?.authors
                ? `Authors: ${section.credit.authors.join(', ')}`
                : null}
            </p>
          </div>
        </div>
      </React.Fragment>
    )
  })

  const terms = collections?.filter(sc => sc?.type === 'term') ? (
    <section aria-labelledby="topic-gallery" className="sub-section">
      <h2 id="topic-gallery">Terms</h2>
      <ul>{collections}</ul>
    </section>
  ) : null

  return (
    <section aria-labelledby="collection" className="group">
      <h1 id="collection">{collection.name}</h1>
      <div>{collection.date}</div>
      <div>{collection.location}</div>
      <article>{articles}</article>
      {terms}
      {fieldNotesUrl}
    </section>
  )
}
