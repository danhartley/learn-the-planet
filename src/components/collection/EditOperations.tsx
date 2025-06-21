'use client'
import { useState, useEffect } from 'react'

import { OperationSelector } from '@/components/collection/OperationSelector'
import { EditProperties } from '@/components/collection/EditProperties'
import { DeleteCollection } from '@/components/collection/DeleteCollection'
import { EditLinkedCollections } from '@/components/collection/EditLinkedCollections'
import { TopicItems } from '@/components/collection/TopicItems'

import { useCollectionOperations } from '@/hooks/useCollectionOperations'

import {
  Collection,
  CollectionSummary,
  Operation,
  UpdateCollectionFieldsOptions,
  Topic,
  ContentHandlerType,
} from '@/types'

type Props = {
  collection: Collection<unknown>
  onCollectionUpdate?: (collection: Collection<unknown>) => void
}

export const EditOperations = ({ collection, onCollectionUpdate }: Props) => {
  const [operation, setOperation] = useState<Operation>('update-items')
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [collectionFields, setCollectionsFields] =
    useState<UpdateCollectionFieldsOptions>()
  const [linkedCollections, setLinkedCollections] = useState<
    CollectionSummary[]
  >([])

  const {
    collectionSummaries,

    setCollection,

    updateCollectionFields,
    deleteCollection,
    updateLinkedCollections,

    apiResponse,
  } = useCollectionOperations()

  useEffect(() => {
    setCollectionsFields({
      name: collection.name,
      slug: collection.slug,
      imageUrl: collection.imageUrl || '',
    } as UpdateCollectionFieldsOptions)
    setLinkedCollections(collection.collections || [])
  }, [collection])

  const handleFieldsChange = (newFields: UpdateCollectionFieldsOptions) => {
    setCollectionsFields(newFields)
    updateCollectionFields(collection, newFields)
  }

  const handleLinkedCollectionsChange = async (
    updatedLinkedConnections: CollectionSummary[] | undefined
  ) => {
    setLinkedCollections(updatedLinkedConnections || [])
    const updatedCollection = await updateLinkedCollections(
      collection,
      updatedLinkedConnections || []
    )
    setCollection(updatedCollection)
    onCollectionUpdate?.(updatedCollection)
  }

  return (
    <>
      <OperationSelector
        operation={operation}
        setOperation={setOperation}
        type={collection?.type || 'topic'}
      />

      {operation === ('update' as Operation) && (
        <EditProperties
          collection={collection}
          handleFieldsChange={handleFieldsChange}
          apiResponse={apiResponse}
        />
      )}

      {operation === ('update-collections' as Operation) && (
        <EditLinkedCollections
          collection={collection}
          collectionSummaries={collectionSummaries}
          handleLinkedCollectionsChange={handleLinkedCollectionsChange}
          apiResponse={apiResponse}
        />
      )}

      {operation === ('delete' as Operation) && (
        <DeleteCollection
          type={collection.type}
          deleteCollection={() => deleteCollection(collection)}
          apiResponse={apiResponse}
        />
      )}

      {collection.type === ('topic' as ContentHandlerType) && (
        <TopicItems collection={collection as Collection<Topic>} />
      )}
    </>
  )
}
