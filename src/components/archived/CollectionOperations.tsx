'use client'
import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { CollectionTextField } from '@/components/common/CollectionTextField'
import { CollectionType } from '@/components/common/CollectionType'

import { useCollectionOperations } from '@/hooks/useCollectionOperations'

import { Operation, ContentHandlerType } from '@/types'

type Props = {
  operation: Operation
  collectionType?: ContentHandlerType
}

export default function CollectionOperations({
  operation = 'create',
  collectionType = 'topic',
}: Props) {
  const { type, setType, imageUrl, setImageUrl, addCollection } =
    useCollectionOperations()

  const MIN_NAME_LENGTH = 5

  const router = useRouter()

  useState(() => {
    setType(collectionType)
  })
  const [collectionName, setCollectionName] = useState<string>('')

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

      <CollectionTextField
        fieldValue={imageUrl}
        setFieldValue={setCollectionName}
        fieldText="collection name"
        type={type}
        required={true}
      />

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
    </>
  )
}
