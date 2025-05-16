'use client'
import { useState } from 'react'
import { CollectionName } from '@/components/common/CollectionName'
import { CollectionType } from '@/components/common/CollectionType'
import { CollectionItemPicker } from '@/components/common/CollectionItemPicker'

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
  const [type, setType] = useState<ContentHandlerType>(collectionType)
  const [name, setName] = useState<string>('')
  console.log(name)

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
      <CollectionItemPicker type={type} />
    </>
  )
}
