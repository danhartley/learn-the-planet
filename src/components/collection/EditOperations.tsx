'use client'
import { useState, useEffect } from 'react'

import Link from 'next/link'

import { useCollection } from '@/contexts/CollectionContext'

import { OperationSelector } from '@/components/collection/OperationSelector'
import { EditProperties } from '@/components/collection/EditProperties'
import { DeleteCollection } from '@/components/collection/DeleteCollection'
import { EditLinkedCollections } from '@/components/collection/EditLinkedCollections'
import { TopicItems } from '@/components/collection/topic/TopicItems'
import { AddToItems } from '@/components/collection/AddToItems'

import { ElementNavigator, createElementIdArray } from '@/utils/navigation'

import { Operation, CollectionSummary, ContentHandlerType } from '@/types'

export const EditOperations = () => {
  const { collection, getCollectionSummaries } = useCollection()
  const [operation, setOperation] = useState<Operation>('update-items')
  const [collectionSummaries, setCollectionSummaries] =
    useState<CollectionSummary[]>()

  useEffect(() => {
    getCollectionSummaries().then(setCollectionSummaries)
  }, [getCollectionSummaries])

  useEffect(() => {
    const elementIds = createElementIdArray()

    if (elementIds.length > 0) {
      const navigator = new ElementNavigator(
        elementIds,
        'up-arrow',
        'down-arrow'
      )

      const handleUpClick = () => navigator.navigateUp()
      const handleDownClick = () => navigator.navigateDown()

      const upButton = document.getElementById('up-arrow')
      const downButton = document.getElementById('down-arrow')

      upButton?.addEventListener('click', handleUpClick)
      downButton?.addEventListener('click', handleDownClick)

      return () => {
        upButton?.removeEventListener('click', handleUpClick)
        downButton?.removeEventListener('click', handleDownClick)
      }
    }
  }, [])

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
      {operation === ('delete' as Operation) && <DeleteCollection />}
      {operation === ('update-items' as Operation) &&
        collection?.type === ('topic' as ContentHandlerType) && <TopicItems />}
      {operation === ('update-items' as Operation) && <AddToItems />}

      <div id="edit-navigation">
        <div id="up-arrow"> </div>
        <div id="down-arrow"> </div>
      </div>
    </>
  )
}
