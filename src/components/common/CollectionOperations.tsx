'use client'
import { useState } from 'react'
import { CollectionTextField } from '@/components/common/CollectionTextField'
import { CollectionType } from '@/components/common/CollectionType'
import { CollectionItemPicker } from '@/components/common/CollectionItemPicker'
import { CollectionExtensions } from '@/components/common/CollectionExtensions'
import { CollectionSelector } from '@/components/common/CollectionSelector'
import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

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
    needsCollectionItems,
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
      <CollectionTextField
        operation={operation}
        fieldValue={name}
        setFieldValue={setName}
        fieldText="name"
        type={type}
      />

      <CollectionType
        operation={operation}
        types={types}
        type={type}
        setType={setType}
      />

      <CollectionItemPicker type={type} setItems={setItems} items={''} />

      {needsCollectionItems && (
        <CollectionExtensions
          onAddProperties={addInaturalistProperties}
          isItemsValid={isItemsValid}
          isValid={isValid}
          message={inatMessage}
          setMessage={setInatMessage}
        />
      )}

      {type === 'topic' && (
        <CollectionSelector
          options={collectionSummaries.map(c => c.name)}
          selectedCollections={selectedCollections}
          setSelectedCollections={setSelectedCollections}
        />
      )}

      <section aria-labelledby="create-collection">
        <div>
          <h2 id="create-collection">Create {type} collection</h2>
          <ApiResponseMessage apiResponse={operationMessage} />
        </div>
        <div className="form-row">
          <button disabled={!isValid} onClick={addCollection}>
            Create collection
          </button>
          <ApiResponseMessage apiResponse={apiResponse} />
        </div>
      </section>
    </>
  )
}
