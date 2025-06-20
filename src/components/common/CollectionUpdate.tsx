'use client'
import { useEffect } from 'react'

import Link from 'next/link'

import { CollectionItemPicker } from '@/components/common/CollectionItemPicker'
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
    isItemsValid,
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
    items,
  } = useCollectionOperations()

  useEffect(() => {
    setCollection(collection)
    setOperation('update-items' as Operation)
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
        <h1 id="edit-options">
          <Link href={`/collection/${collection.slug}-${collection.shortId}`}>
            {collection.name}
          </Link>
        </h1>
        <CollectionUpdateOperationSelector
          type={type}
          operation={operation}
          setOperation={setOperation}
        />
      </section>

      {/* update */}
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

      {/* update-collections */}
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

      {/* delete */}
      <CollectionUpdateDelete
        type={type}
        operation={operation}
        apiResponse={apiResponse}
        deleteCollection={deleteCollection}
      />

      {/* create or (update-items and not topic)  */}
      <CollectionItemPicker
        type={collection.type as ContentHandlerType}
        setItems={setItems}
        items={JSON.stringify(collection.items, null, 2)}
        operation={operation}
        apiResponse={apiResponse}
      />

      {/* update-items and topic */}
      <CollectionTopicUpdate
        collection={collection as Collection<Topic>}
        operation={operation}
      />

      {/* update-items and not topic */}
      <CollectionSaveUpdatedItems
        operation={operation}
        type={type}
        apiResponse={apiResponse}
        isItemsValid={isItemsValid}
        saveAction={() => updateCollectionItems(items || [])}
      />
    </>
  )
}
