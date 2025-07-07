'use client'
import { useState, useEffect } from 'react'

import Link from 'next/link'

import { useCollection } from '@/contexts/CollectionContext'

import { OperationSelector } from '@/components/collection/OperationSelector'
import { EditProperties } from '@/components/collection/EditProperties'
import { DeleteCollection } from '@/components/collection/DeleteCollection'
import { EditLinkedCollections } from '@/components/collection/EditLinkedCollections'
import { TopicItems } from '@/components/collection/topic/edit/topicItems/TopicItems'
import { AddTopic } from '@/components/collection/topic/add/AddTopic'
import { TopicState } from '@/components/collection/topic/edit/TopicState'
import { TraitItems } from '@/components/collection/trait/edit/TraitItems'
import { AddTrait } from '@/components/collection/trait/add/AddTrait'
import { EditTaxa } from '@/components/collection/taxon/EditTaxa'
import { TermItems } from '@/components/collection/term/edit/TermItems'
import { AddTerm } from '@/components/collection/term/add/AddTerm'
import { AddRawTrait } from '@/components/collection/trait/add/AddRawTrait'
import { AddRawTerm } from '@/components/collection/term/add/AddRawTerm'

import { Operation, CollectionSummary, ContentHandlerType } from '@/types'

export const EditOperations = () => {
  const { collection, getCollectionSummaries } = useCollection()
  const [operation, setOperation] = useState<Operation>('update-items')
  const [collectionSummaries, setCollectionSummaries] =
    useState<CollectionSummary[]>()

  useEffect(() => {
    getCollectionSummaries().then(setCollectionSummaries)
  }, [getCollectionSummaries])

  const isTopic = collection?.type === ('topic' as ContentHandlerType)
  const isTrait = collection?.type === ('trait' as ContentHandlerType)
  const isTaxon = collection?.type === ('taxon' as ContentHandlerType)
  const isTerm = collection?.type === ('term' as ContentHandlerType)

  const isUpdateItems = operation === ('update-items' as Operation)
  const isAddItem = operation === ('add-item' as Operation)
  const isAddRawData = operation === ('add-raw-data' as Operation)
  const isEditState = operation === ('edit-state' as Operation)

  return (
    <>
      <h1 id="edit-options">
        <Link href={`/collection/${collection?.slug}-${collection?.shortId}`}>
          {collection?.name}
        </Link>
      </h1>
      <OperationSelector
        operation={operation}
        setOperation={setOperation}
        type={collection?.type || 'topic'}
      />

      {operation === ('update' as Operation) && <EditProperties />}
      {operation === ('linked-collections' as Operation) &&
        collectionSummaries && (
          <EditLinkedCollections collectionSummaries={collectionSummaries} />
        )}

      {isUpdateItems && isTopic && <TopicItems />}
      {isAddItem && isTopic && <AddTopic />}
      {isEditState && isTopic && <TopicState />}

      {isUpdateItems && isTrait && <TraitItems />}
      {isAddItem && isTrait && <AddTrait />}
      {isAddRawData && isTrait && <AddRawTrait />}

      {isUpdateItems && isTaxon && <EditTaxa />}

      {isUpdateItems && isTerm && <TermItems />}
      {isAddItem && isTerm && <AddTerm />}
      {isAddRawData && isTerm && <AddRawTerm />}

      {operation === ('delete' as Operation) && <DeleteCollection />}
    </>
  )
}
