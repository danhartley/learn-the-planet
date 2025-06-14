'use client'
import React, { useEffect } from 'react'

import Link from 'next/link'

import { CollectionTopicSection } from '@/components/common/edit/CollectionTopicSection'
import { CollectionTopicCloudImage } from '@/components/common/edit/CollectionTopicCloudImage'

import { useCollectionOperations } from '@/hooks/useCollectionOperations'

import { Collection, Topic, ContentHandlerType, Operation } from '@/types'

type Props = {
  collection: Collection<Topic>
}

export const CollectionTopicUpdate = ({ collection }: Props) => {
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
    setOperation('update' as Operation)
    setSelectedCollections(collection.collections?.map(c => c.name) || [])
    setType(collection.type as ContentHandlerType)
    setName(collection.name)
    setSlug(collection.slug)
    setImageUrl(collection.imageUrl || '')
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection.id])

  return (
    !!collection &&
    !!collection.items && (
      <>
        <Link href={`/collection/${collection.slug}-${collection.shortId}`}>
          {collection.name}
        </Link>
        {collection.items.map(section => {
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
            </React.Fragment>
          )
        })}
      </>
    )
  )
}
