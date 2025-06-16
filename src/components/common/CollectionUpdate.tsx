'use client'
import { useEffect } from 'react'

import Link from 'next/link'

import { CollectionItemPicker } from '@/components/common/CollectionItemPicker'
import { CollectionExtensions } from '@/components/common/CollectionExtensions'
import { CollectionUpdateCollectionReferences } from '@/components/common/edit/CollectionUpdateCollectionReferences'
import { CollectionUpdateCollectionFields } from '@/components/common/edit/CollectionUpdateCollectionFields'
import { CollectionTopicUpdate } from '@/components/common/edit/CollectionTopicUpdate'
import { CollectionUpdateOperationSelector } from '@/components/common/edit/CollectionUpdateOperationSelector'
import { CollectionUpdateDelete } from '@/components/common/edit/CollectionUpdateDelete'
import { CollectionSaveUpdatedItems } from '@/components/common/edit/CollectionSaveUpdatedItems'

import { useCollectionOperations } from '@/hooks/useCollectionOperations'

import { Collection, ContentHandlerType, Operation, Topic } from '@/types'

type Props = {
  collection: Collection<unknown>
}
export const CollectionUpdate = ({ collection }: Props) => {
  const {
    setItems,
    setCollection,
    updateCollectionItems,
    addInaturalistProperties,
    isItemsValid,
    inatMessage,
    setType,
    type,
    operation,
    setOperation,
    deleteCollection,
    collectionSummaries,
    selectedCollections,
    setSelectedCollections,
    updateCollectionReferences,
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
    <>
      <section aria-labelledby="edit-options">
        <h2 id="edit-options">
          <Link href={`/collection/${collection.slug}-${collection.shortId}`}>
            {collection.name}
          </Link>
        </h2>
        <CollectionUpdateOperationSelector
          type={type}
          operation={operation}
          setOperation={setOperation}
        />
      </section>

      <CollectionUpdateCollectionFields
        operation={operation}
        name={name}
        type={type}
        setName={setName}
        slug={slug}
        setSlug={setSlug}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        apiResponse={apiResponse}
        setCollectionsFields={setCollectionsFields}
        updateCollectionFields={updateCollectionFields}
      />

      <CollectionUpdateCollectionReferences
        collection={collection}
        collectionSummaries={collectionSummaries}
        selectedCollections={selectedCollections}
        setSelectedCollections={setSelectedCollections}
        apiResponse={apiResponse}
        updateCollectionReferences={updateCollectionReferences}
        operation={operation}
        type={type}
      />

      <CollectionUpdateDelete
        type={type}
        operation={operation}
        apiResponse={apiResponse}
        deleteCollection={deleteCollection}
      />

      <CollectionItemPicker
        type={collection.type as ContentHandlerType}
        setItems={setItems}
        items={JSON.stringify(collection.items, null, 2)}
        operation={operation}
      />

      <CollectionTopicUpdate
        collection={collection as Collection<Topic>}
        operation={operation}
      />

      <CollectionExtensions
        onAddProperties={addInaturalistProperties}
        isItemsValid={isItemsValid}
        isValid={isItemsValid}
        message={inatMessage}
        setMessage={setInatMessage}
        operation={operation}
        type={type}
      />

      <CollectionSaveUpdatedItems
        operation={operation}
        type={type}
        apiResponse={apiResponse}
        isItemsValid={isItemsValid}
        saveAction={updateCollectionItems}
      />
    </>
  )
}
