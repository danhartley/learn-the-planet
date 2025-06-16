'use client'
import { useState } from 'react'
import { CollectionTextField } from '@/components/common/CollectionTextField'
import { CollectionType } from '@/components/common/CollectionType'
import { CollectionItemPicker } from '@/components/common/CollectionItemPicker'
import { CollectionExtensions } from '@/components/common/CollectionExtensions'
import { CollectionSelector } from '@/components/common/CollectionSelector'
import { CollectionSaveItems } from '@/components/common/CollectionSaveItems'

import { useCollectionOperations } from '@/hooks/useCollectionOperations'

import { Operation, ContentType, ContentHandlerType } from '@/types'

type Props = {
  operation: Operation
  types?: ContentType[]
  collectionType?: ContentHandlerType
}

export default function CollectionOperations({
  operation = 'read',
  types,
  collectionType = 'topic',
}: Props) {
  const {
    type,
    setType,
    name,
    setName,
    setItems,
    inatMessage,
    isValid,
    isItemsValid,
    operationMessage,
    addInaturalistProperties,
    addCollection,
    collectionSummaries,
    selectedCollections,
    setSelectedCollections,
    apiResponse,
    setInatMessage,
  } = useCollectionOperations()

  useState(() => {
    setType(collectionType)
  })

  return (
    <>
      <div className="group-block">
        <CollectionTextField
          operation={operation}
          fieldValue={name}
          setFieldValue={setName}
          fieldText="Collection name"
          type={type}
        />
      </div>

      <CollectionType
        operation={operation}
        types={types}
        type={type}
        setType={setType}
      />

      <CollectionItemPicker
        type={type}
        setItems={setItems}
        items={''}
        operation={operation}
      />

      <CollectionExtensions
        onAddProperties={addInaturalistProperties}
        isItemsValid={isItemsValid}
        isValid={isValid}
        message={inatMessage}
        setMessage={setInatMessage}
        operation={operation}
        type={type}
      />

      <CollectionSelector
        options={collectionSummaries.map(c => c.name)}
        selectedCollections={selectedCollections}
        setSelectedCollections={setSelectedCollections}
        type={type}
      />

      <CollectionSaveItems
        operation={operation}
        type={type}
        operationMessage={operationMessage}
        apiResponse={apiResponse}
        isValid={isValid}
        saveAction={addCollection}
      />
    </>
  )
}
