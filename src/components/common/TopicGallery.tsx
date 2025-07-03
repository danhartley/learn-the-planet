'use client'

import React, { useState } from 'react'
import Link from 'next/link'

import { useRouter } from 'next/navigation'

import { useTestPlanner } from '@/hooks/useTestPlanner'

import { TestConfigSettings } from '@/components/common/TestConfigSettings'
import { TaxonCard } from '@/components/common/TaxonCard'
import { NextCloudinaryImage } from '@/components/image/NextCloudinaryImage'

import { groupCollectionsByType } from '@/utils/arrays'

import {
  Collection,
  CollectionSummary,
  Topic,
  Taxon,
  QuestionTemplateSelection,
} from '@/types'

type Props<Topic> = {
  collection: Collection<Topic>
}

export const TopicGallery = ({ collection }: Props<Topic>) => {
  const fieldNotesUrl = collection?.fieldNotes?.url ? (
    <Link href={collection.fieldNotes.url}>Field notes</Link>
  ) : null
  const [config, setConfig] = useState({
    questionTemplateSelections: [
      { type: 'multipleChoice', isSelected: true },
      { type: 'textEntry', isSelected: true },
    ] as QuestionTemplateSelection[],
  })
  const { startTest } = useTestPlanner<Taxon>() // Changed to Taxon since we're testing examples
  const router = useRouter()

  // Extract all examples from topics to create a testable collection
  const createExamplesCollection = (): Collection<Taxon> => {
    const allExamples: Taxon[] = []

    collection.items?.forEach(topic => {
      if (topic.examples && topic.examples.length > 0) {
        allExamples.push(...topic.examples)
      }
    })

    return {
      ...collection,
      type: 'taxon', // Set type to taxon for proper question template selection
      items: allExamples,
    } as Collection<Taxon>
  }

  const handleStartTest = () => {
    const examplesCollection = createExamplesCollection()

    // Only start test if there are examples to test
    if (examplesCollection.items && examplesCollection.items.length > 0) {
      startTest({ collection: examplesCollection, config })
      router.push('/test')
    }
  }

  // Check if there are any examples available for testing
  const hasExamples = collection.items?.some(
    topic => topic.examples && topic.examples.length > 0
  )

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

  const article =
    collection.items &&
    collection.items.map((section, sectionIndex) => {
      return (
        <React.Fragment key={section.id}>
          {section.topic && (
            <h2>
              <em>{section.topic}</em>
            </h2>
          )}
          {section.images &&
            section.images.map(img => {
              return (
                <NextCloudinaryImage
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  caption={img.caption}
                />
              )
            })}
          <div key={sectionIndex} className="article-item">
            {section?.text?.map((para, paraIndex) => (
              <p key={`${sectionIndex}-${paraIndex}`}>{para}</p>
            ))}

            <div className="article-credit">
              {section.credit?.source && (
                <p>
                  <a href={section?.credit?.source}>
                    <em>{section?.credit?.title}</em>
                  </a>
                </p>
              )}

              <p>
                {section?.credit?.authors ? (
                  <span key={section.credit?.title}>
                    {`Authors: ${section.credit.authors.join(', ')}`}
                  </span>
                ) : null}
              </p>
            </div>
          </div>
          <div className="block">
            {section.examples?.map(taxon => {
              return (
                <TaxonCard
                  key={taxon.id + crypto.randomUUID()}
                  taxon={taxon}
                ></TaxonCard>
              )
            })}
          </div>
        </React.Fragment>
      )
    })

  const topics =
    collections?.topic.length > 0 ? (
      <section aria-labelledby="item-gallery" className="sub-section">
        <h2 id="item-gallery">Related topics</h2>
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
      <section aria-labelledby="term-gallery" className="sub-section">
        <h2 id="term-gallery">Terms</h2>
        <ul>{collectionLinks(collections.term)}</ul>
      </section>
    ) : null

  const traits =
    collections?.trait.length > 0 ? (
      <section aria-labelledby="trait-gallery" className="sub-section">
        <h2 id="trait-gallery">Traits</h2>
        <ul>{collectionLinks(collections.trait)}</ul>
      </section>
    ) : null

  const authors = collection.credit?.authors?.join(',')

  return (
    <section aria-labelledby="topic-gallery" className="group">
      <div className="group">
        <h1 id="topic-gallery">{collection.name}</h1>
        <div>{authors}</div>
        <div>{collection.date}</div>
        <div>{collection.location}</div>
      </div>
      <article>{article}</article>
      {topics}
      {taxa}
      {terms}
      {traits}
      {fieldNotesUrl}
      {hasExamples && (
        <>
          <button id="start-test" onClick={handleStartTest}>
            Start test
          </button>
          <TestConfigSettings config={config} setConfig={setConfig} />
        </>
      )}
    </section>
  )
}
