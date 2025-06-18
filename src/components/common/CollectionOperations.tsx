'use client'
import { useEffect, useState } from 'react'
import { CollectionTextField } from '@/components/common/CollectionTextField'
import { CollectionType } from '@/components/common/CollectionType'
import { CollectionItemPicker } from '@/components/common/CollectionItemPicker'
import { CollectionSelector } from '@/components/common/CollectionSelector'
import { CollectionSaveItems } from '@/components/common/CollectionSaveItems'

import { useCollectionOperations } from '@/hooks/useCollectionOperations'

import { Operation, ContentType, ContentHandlerType } from '@/types'

type Props = {
  operation: Operation
  collectionType?: ContentHandlerType
}

export default function CollectionOperations({
  operation = 'read',
  collectionType = 'topic',
}: Props) {
  const {
    type,
    setType,
    name,
    setName,
    setItems,
    isValid,
    operationMessage,
    addCollection,
    collectionSummaries,
    selectedCollections,
    setSelectedCollections,
    apiResponse,
    items,
  } = useCollectionOperations()

  useState(() => {
    setType(collectionType)
  })

  useEffect(() => {
    console.log('name', name)
    console.log('isValid', isValid)
  }, [name, items])

  return (
    <>
      <CollectionType operation={operation} type={type} setType={setType} />

      <div className="group-block">
        <CollectionTextField
          operation={operation}
          fieldValue={name}
          setFieldValue={setName}
          fieldText="Collection name"
          type={type}
        />
      </div>

      <CollectionItemPicker
        type={type}
        setItems={setItems}
        items={''}
        operation={operation}
      />

      {/* type === 'topic' */}
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
