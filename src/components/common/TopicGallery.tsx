'use client'

import React, { useState } from 'react'
import Link from 'next/link'

import { useRouter } from 'next/navigation'

import { useTestPlanner } from '@/hooks/useTestPlanner'

import { TestConfigSettings } from '@/components/common/TestConfigSettings'
import { TaxonCard } from '@/components/common/TaxonCard'
import { NextCloudinaryImage } from '@/components/image/common/NextCloudinaryImage'
import { Credits } from '@/components/common/Credits'
import { CollectionLinks } from '@/components/common/CollectionLinks'
import { IconicTaxonIcon } from '@/components/image/common/IconicTaxonIcon'

import { groupCollectionsByType } from '@/utils/arrays'

import { Collection, Topic, Taxon, QuestionTemplateSelection } from '@/types'

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
                  key={img.id || img.src}
                  id={img.id || img.src}
                  src={img.src}
                  alt={img.alt || img.caption}
                  caption={img.caption}
                />
              )
            })}
          <div key={sectionIndex} className="article-item">
            {section?.text?.map((para, paraIndex) => (
              <p key={`${sectionIndex}-${paraIndex}`}>{para}</p>
            ))}
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

  const authors = collection.author?.authors?.join(',')

  return (
    <section aria-labelledby="topic-gallery" className="column-group">
      <div>
        <h1 id="topic-gallery">{collection.name}</h1>
        <div>{authors}</div>
        <div>{collection.date}</div>
        <div>{collection.location}</div>
      </div>
      <article>{article}</article>
      <IconicTaxonIcon collection={collection} />
      <Credits collection={collection} />

      {hasExamples && (
        <>
          <TestConfigSettings config={config} setConfig={setConfig} />
          <button id="start-test" onClick={handleStartTest}>
            Start test
          </button>
          <hr />
        </>
      )}

      <CollectionLinks
        collections={collections?.topic}
        currentCollection={collection}
        title="Related topics"
      />

      <CollectionLinks
        collections={collections?.taxon}
        currentCollection={collection}
        title="Taxa"
      />

      <CollectionLinks
        collections={collections?.term}
        currentCollection={collection}
        title="Terms"
      />

      <CollectionLinks
        collections={collections?.trait}
        currentCollection={collection}
        title="Traits"
      />

      {fieldNotesUrl}
    </section>
  )
}
