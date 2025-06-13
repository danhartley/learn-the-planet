'use client'
import { useEffect } from 'react'

import { CollectionTopicSection } from '@/components/common/CollectionTopicSection'

import { useCollectionOperations } from '@/hooks/useCollectionOperations'

import { Collection, Topic, ContentHandlerType, Operation } from '@/types'

type Props = {
  collection: Collection<Topic>
}

export const CollectionTopicUpdate = ({ collection }: Props) => {
  const {
    setItems,
    setCollection,
    updateCollectionItems,
    needsCollectionItems,
    addInaturalistProperties,
    isItemsValid,
    inatMessage,
    setType,
    type,
    operationMessage,
    operation,
    setOperation,
    deleteCollection,
    collectionSummaries,
    selectedCollections,
    setSelectedCollections,
    updateCollections,
    apiResponse,
    setName,
    name,
    slug,
    setSlug,
    setCollectionsFields,
    updateCollectionFields,
    imageUrl,
    setImageUrl,
    setInatMessage,
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
        {collection.items.map(section => {
          return <CollectionTopicSection key={section.id} section={section} />
        })}
      </>
    )
  )
}
