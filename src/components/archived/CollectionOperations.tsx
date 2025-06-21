'use client'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { CollectionNewNameField } from '@/components/archived/CollectionNewNameField'
import { CollectionTextField } from '@/components/common/CollectionTextField'
import { CollectionType } from '@/components/common/CollectionType'
import { CollectionItemPicker } from '@/components/common/CollectionItemPicker'
import { CollectionSelector } from '@/components/common/CollectionSelector'

import { CollectionTopicUpdate } from '@/components/common/edit/CollectionTopicUpdate'

import { useCollectionOperations } from '@/hooks/useCollectionOperations'

import {
  Operation,
  ContentHandlerType,
  UpdateCollectionFieldsOptions,
  Collection,
  Topic,
} from '@/types'

type Props = {
  operation: Operation
  collectionType?: ContentHandlerType
}

export default function CollectionOperations({
  operation = 'create',
  collectionType = 'topic',
}: Props) {
  const {
    // collection,
    // name,
    type,
    setType,
    // slug,
    // setSlug,
    imageUrl,
    setImageUrl,
    // items,
    // setItems,
    // collectionSummaries,
    // selectedCollections,
    // setSelectedCollections,

    addCollection,
    // updateCollectionItems,
    // updateCollectionFields,
    // updateLinkedCollections,

    apiResponse,
  } = useCollectionOperations()

  const MIN_NAME_LENGTH = 5

  const router = useRouter()

  useState(() => {
    setType(collectionType)
  })
  const [collectionName, setCollectionName] = useState<string>('')

  useEffect(() => {
    const createCollection = async () => {
      if (collectionName) {
        await addCollection(collectionName, type)
      }
    }

    // createCollection()
  }, [collectionName])

  // useEffect(() => {
  //   const updateItems = async () => {
  //     if (collection && items)
  //       if (collection) {
  //         await updateCollectionItems(items)
  //       }
  //   }

  //   updateItems()
  // }, [items, collection])

  // useEffect(() => {
  //   const updateField = async () => {
  //     if (collection) {
  //       await updateCollectionFields({
  //         name,
  //         slug,
  //         imageUrl,
  //       } as UpdateCollectionFieldsOptions)
  //     }
  //   }
  //   updateField()
  // }, [name, slug, imageUrl])

  // useEffect(() => {
  //   const updateReferences = async () => {
  //     const collectionReferences = selectedCollections
  //       .map(n => collectionSummaries.find(cs => cs.name === n))
  //       .filter(c => c !== undefined)

  //     await updateLinkedCollections({
  //       collectionReferences,
  //     })
  //   }

  //   updateReferences()
  // }, [selectedCollections])

  const createCollection = () => {
    const create = async () => {
      const newCollection = await addCollection(collectionName, type)
      router.push(
        `/collection/edit/${newCollection?.slug}-${newCollection?.shortId}`
      )
    }
    if (collectionName && collectionName.length > MIN_NAME_LENGTH) create()
  }

  return (
    <>
      <CollectionType operation={operation} type={type} setType={setType} />

      {/* <CollectionNewNameField
        type={type}
        setCollectionName={setCollectionName}
      /> */}

      <CollectionTextField
        fieldValue={imageUrl}
        setFieldValue={setCollectionName}
        fieldText="collection name"
        type={type}
        required={true}
      />

      {/* <CollectionTextField
        fieldValue={slug}
        setFieldValue={setSlug}
        fieldText="Collection slug"
        type={type}
      /> */}

      <CollectionTextField
        fieldValue={imageUrl}
        setFieldValue={setImageUrl}
        fieldText="collection image url"
        type={type}
      />

      <button
        onClick={createCollection}
        disabled={collectionName.length < MIN_NAME_LENGTH}
      >
        Create collection
      </button>

      {/* 
      {collection && collection.items && type === 'topic' && (
        <CollectionTopicUpdate
          collection={collection as Collection<Topic>}
          operation={operation}
        />
      )}

      {collection && type === 'topic' && (
        <CollectionSelector
          options={collectionSummaries.map(c => c.name)}
          selectedCollections={selectedCollections}
          setSelectedCollections={setSelectedCollections}
          apiResponse={apiResponse}
        />
      )}

      {collection && (
        <CollectionItemPicker
          type={type}
          setItems={setItems}
          items={items}
          operation={operation}
          apiResponse={apiResponse}
        />
      )} */}
    </>
  )
}
