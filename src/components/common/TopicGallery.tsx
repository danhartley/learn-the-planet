'use client'

import React from 'react'
import Link from 'next/link'

import { groupCollectionsByType } from '@/utils/arrays'

import { Collection, CollectionSummary, Topic } from '@/types'

type Props<Topic> = {
  collection: Collection<Topic>
}

export const TopicGallery = ({ collection }: Props<Topic>) => {
  const fieldNotesUrl = collection?.fieldNotes?.url ? (
    <Link href={collection.fieldNotes.url}>Field notes</Link>
  ) : null

  const collections = groupCollectionsByType(collection?.collections || [])

  const collectionLinks = (collections: CollectionSummary[]) => {
    return collections.map((subCollection: CollectionSummary) => {
      return subCollection ? (
        <li key={subCollection.shortId}>
          <Link
            href={`/collection/${subCollection?.slug}-${encodeURIComponent(subCollection?.shortId || '')}`}
          >
            {subCollection.name}
          </Link>
        </li>
      ) : null
    })
  }

  const articles = collection.items.map((section, sectionIndex) => {
    return (
      <React.Fragment key={section.id}>
        <h2>{section.topic}</h2>
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

  const topics =
    collections?.topic.length > 0 ? (
      <section aria-labelledby="topic-gallery" className="sub-section">
        <h2 id="topic-gallery">Related topics</h2>
        <ul>{collectionLinks(collections.topic)}</ul>
      </section>
    ) : null

  const taxa =
    collections?.taxon.length > 0 ? (
      <section aria-labelledby="taxon-gallery" className="sub-section">
        <h2 id="taxon-gallery">Taxa</h2>
        <ul>{collectionLinks(collections.taxon)}</ul>
      </section>
    ) : null

  const terms =
    collections?.term.length > 0 ? (
      <section aria-labelledby="topic-gallery" className="sub-section">
        <h2 id="topic-gallery">Terms</h2>
        <ul>{collectionLinks(collections.term)}</ul>
      </section>
    ) : null

  const traits =
    collections?.trait.length > 0 ? (
      <section aria-labelledby="topic-gallery" className="sub-section">
        <h2 id="topic-gallery">Traits</h2>
        <ul>{collectionLinks(collections.trait)}</ul>
      </section>
    ) : null

  return (
    <section aria-labelledby="topics" className="group">
      <h1 id="topics">{collection.name}</h1>
      <div>{collection.date}</div>
      <div>{collection.location}</div>
      <article>{articles}</article>
      {topics}
      {taxa}
      {terms}
      {traits}
      {fieldNotesUrl}
    </section>
  )
}
