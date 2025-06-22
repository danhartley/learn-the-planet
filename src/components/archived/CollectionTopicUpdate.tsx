'use client'
import React, { useEffect } from 'react'

import { CollectionTopicSection } from '@/components/archived/edit/CollectionTopicSection'
import { CollectionTopicCloudImage } from '@/components/archived/edit/CollectionTopicCloudImage'
import { ExampleTaxa } from '@/components/collection/topic/TopicExamples'

import { useCollectionOperations } from '@/hooks/useCollectionOperations'

import { Collection, Topic, ContentHandlerType, Operation } from '@/types'

type Props = {
  collection: Collection<Topic>
  operation: Operation
}

export const CollectionTopicUpdate = ({ collection, operation }: Props) => {
  const {
    setCollection,
    setType,
    setOperation,
    setSelectedCollections,
    setName,
    setSlug,
    setImageUrl,
  } = useCollectionOperations()

  useEffect(() => {
    setCollection(collection)
    setOperation(operation)
    setSelectedCollections(collection.collections?.map(c => c.name) || [])
    setType(collection.type as ContentHandlerType)
    setName(collection.name)
    setSlug(collection.slug)
    setImageUrl(collection.imageUrl || '')
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection.id])

  return (
    <>
      {collection.items &&
        collection.items.map(section => {
          return (
            <React.Fragment key={section.id}>
              <CollectionTopicSection
                key={section.id}
                collection={collection}
                section={section}
              />
              {section.images?.map(img => {
                return (
                  <CollectionTopicCloudImage
                    collection={collection}
                    section={section}
                    key={img.src}
                    image={img}
                  />
                )
              })}
              {section.examples && (
                <ExampleTaxa collection={collection} section={section} />
              )}
            </React.Fragment>
          )
        })}
    </>
  )
}
