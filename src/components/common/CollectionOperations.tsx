'use client'
import { useEffect, useState } from 'react'
import { CollectionNewNameField } from '@/components/common/CollectionNewNameField'
import { CollectionTextField } from '@/components/common/CollectionTextField'
import { CollectionType } from '@/components/common/CollectionType'
import { CollectionItemPicker } from '@/components/common/CollectionItemPicker'
import { CollectionSelector } from '@/components/common/CollectionSelector'

import { useCollectionOperations } from '@/hooks/useCollectionOperations'

import {
  Operation,
  ContentHandlerType,
  UpdateCollectionFieldsOptions,
} from '@/types'

type Props = {
  operation: Operation
  collectionType?: ContentHandlerType
}

export default function CollectionOperations({
  operation = 'read',
  collectionType = 'topic',
}: Props) {
  const {
    collection,
    addCollection,
    name,
    type,
    setType,
    slug,
    setSlug,
    imageUrl,
    setImageUrl,
    updateCollectionItems,
    items,
    setItems,
    updateCollectionFields,
    collectionSummaries,
    selectedCollections,
    setSelectedCollections,
    apiResponse,
    updateCollectionReferences,
  } = useCollectionOperations()

  useState(() => {
    setType(collectionType)
  })
  const [collectionName, setCollectionName] = useState<string>()

  useEffect(() => {
    const createCollection = async () => {
      if (collectionName) {
        await addCollection(collectionName, type)
      }
    }

    createCollection()
  }, [collectionName])

  useEffect(() => {
    console.log(items)
    const addItems = async () => {
      if (collection && items)
        if (collection) await updateCollectionItems(collection, items)
    }

    addItems()
  }, [items])

  useEffect(() => {
    const updateField = async () => {
      if (collection) {
        await updateCollectionFields({
          name,
          slug,
          imageUrl,
        } as UpdateCollectionFieldsOptions)
      }
    }
    updateField()
  }, [name, slug, imageUrl])

  useEffect(() => {
    const updateReferences = async () => {
      const collectionReferences = selectedCollections
        .map(n => collectionSummaries.find(cs => cs.name === n))
        .filter(c => c !== undefined)

      await updateCollectionReferences({
        collectionReferences,
      })
    }

    updateReferences()
  }, [selectedCollections])

  return (
    <>
      <CollectionType operation={operation} type={type} setType={setType} />

      <div className="group-block">
        <CollectionNewNameField
          type={type}
          setCollectionName={setCollectionName}
          collection={collection}
        />
      </div>

      {collection && (
        <div className="group-block">
          <CollectionTextField
            fieldValue={slug || collection.slug}
            setFieldValue={setSlug}
            fieldText="Collection slug"
            type={type}
          />
        </div>
      )}

      {collection && (
        <div className="group-block">
          <CollectionTextField
            fieldValue={imageUrl || collection.imageUrl || ''}
            setFieldValue={setImageUrl}
            fieldText="Collection image url"
            type={type}
          />
        </div>
      )}

      {collection && (
        <CollectionItemPicker
          type={type}
          setItems={setItems}
          items={collection.items || collection.items}
          operation={operation}
          apiResponse={apiResponse}
        />
      )}

      {collection && type === 'topic' && (
        <CollectionSelector
          options={collectionSummaries.map(c => c.name)}
          selectedCollections={selectedCollections || collection.collections}
          setSelectedCollections={setSelectedCollections}
          apiResponse={apiResponse}
        />
      )}
    </>
  )
}
