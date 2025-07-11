'use client'

import React, { useState } from 'react'
import Link from 'next/link'

import { useRouter } from 'next/navigation'

import { useTestPlanner } from '@/hooks/useTestPlanner'

import { TestConfigSettings } from '@/components/common/TestConfigSettings'
import { TaxonCard } from '@/components/common/TaxonCard'
import { NextCloudinaryImage } from '@/components/image/common/NextCloudinaryImage'

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

// New component for rendering collection links sections
const CollectionLinksSection: React.FC<{
  collections: CollectionSummary[]
  currentCollection: Collection<unknown>
  sectionId: string
  title: string
}> = ({ collections, currentCollection, sectionId, title }) => {
  if (!collections || collections.length === 0) {
    return null
  }

  const filteredCollections = collections.filter(
    linkedCollection => linkedCollection.shortId !== currentCollection.shortId
  )

  if (filteredCollections.length === 0) {
    return null
  }

  return (
    <section aria-labelledby={sectionId} className="sub-section">
      <h2 id={sectionId}>{title}</h2>
      <ul>
        {filteredCollections.map((linkedCollection: CollectionSummary) => (
          <li key={linkedCollection.shortId}>
            <Link
              href={`/collection/${linkedCollection?.slug}-${encodeURIComponent(linkedCollection?.shortId || '')}`}
            >
              {linkedCollection.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
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
                  key={img.id}
                  id={img.id}
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

      <CollectionLinksSection
        collections={collections?.topic}
        currentCollection={collection}
        sectionId="item-gallery"
        title="Related topics"
      />

      <CollectionLinksSection
        collections={collections?.taxon}
        currentCollection={collection}
        sectionId="taxon-gallery"
        title="Taxa"
      />

      <CollectionLinksSection
        collections={collections?.term}
        currentCollection={collection}
        sectionId="term-gallery"
        title="Terms"
      />

      <CollectionLinksSection
        collections={collections?.trait}
        currentCollection={collection}
        sectionId="trait-gallery"
        title="Traits"
      />

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
