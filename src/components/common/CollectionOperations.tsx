'use client'
import { useState, useEffect } from 'react'
import { CollectionName } from '@/components/common/CollectionName'
import { CollectionType } from '@/components/common/CollectionType'
import { CollectionItemPicker } from '@/components/common/CollectionItemPicker'

import { useRouter } from 'next/navigation'
import { useTestPlanner } from '@/hooks/useTestPlanner'

import {
  Operation,
  ContentType,
  ContentHandlerType,
  LearningItem,
  Collection,
} from '@/types'

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
  const [type, setType] = useState<ContentHandlerType>(collectionType)
  const [name, setName] = useState<string>('')
  const [items, setItems] = useState<LearningItem[] | undefined>()
  const [isValid, setIsValid] = useState<boolean>(false)

  const router = useRouter()
  const { startTest } = useTestPlanner<LearningItem>()

  // Validate form whenever dependencies change
  useEffect(() => {
    const nameValid = name.trim().length > 0
    const itemsValid = !!items && items.length > 0

    setIsValid(nameValid && itemsValid)
  }, [name, items, type])

  const createCollection = () => {
    if (isValid) {
      const collection: Collection<LearningItem> = {
        id: crypto.randomUUID(),
        type,
        name,
        items: items!,
      }
      startTest({ collection })
      router.push('/test')
    }
  }

  return (
    <>
      <CollectionName
        operation={operation}
        name={name}
        setName={setName}
        type={type}
      />
      <CollectionType
        operation={operation}
        types={types}
        type={type}
        setType={setType}
      />
      <CollectionItemPicker type={type} setItems={setItems} />
      <button
        id="create-collection"
        onClick={createCollection}
        disabled={!isValid}
      >
        Create collection
      </button>
    </>
  )
}
