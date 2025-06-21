'use client'
import { useState } from 'react'

import { OperationSelector } from '@/components/collection/OperationSelector'
import { EditProperties } from '@/components/collection/EditProperties'
import { DeleteCollection } from '@/components/collection/DeleteCollection'
import { EditLinkedCollections } from '@/components/collection/EditLinkedCollections'
import { TopicItems } from '@/components/collection/TopicItems'
import { AddToTopic } from '@/components/common/topic/AddToTopic'

import { useCollectionOperations } from '@/hooks/useCollectionOperations'

import { Collection, Operation, ContentHandlerType } from '@/types'

type Props = {
  collection: Collection<unknown>
}

export const EditOperations = ({ collection }: Props) => {
  const [operation, setOperation] = useState<Operation>('update-items')
  const { collectionSummaries } = useCollectionOperations()

  return (
    <>
      <OperationSelector
        operation={operation}
        setOperation={setOperation}
        type={collection?.type || 'topic'}
      />

      <>
        {operation === ('update' as Operation) && <EditProperties />}

        {operation === ('linked-collections' as Operation) && (
          <EditLinkedCollections collectionSummaries={collectionSummaries} />
        )}

        {operation === ('delete' as Operation) && <DeleteCollection />}

        {operation === ('update-items' as Operation) &&
          collection.type === ('topic' as ContentHandlerType) && <TopicItems />}
      </>

      <AddToTopic />
    </>
  )
}
