import React, { Dispatch, SetStateAction } from 'react'

import { CollectionSelector } from '@/components/common/CollectionSelector'
import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import {
  Collection,
  CollectionSummary,
  ApiResponse,
  Operation,
  ContentHandlerType,
} from '@/types'

type Props = {
  collection: Collection<unknown>
  collectionSummaries: CollectionSummary[]
  selectedCollections: string[]
  setSelectedCollections: Dispatch<SetStateAction<string[]>>
  updateCollectionReferences: ({
    collection,
    collectionReferences,
  }: {
    collection: Collection<unknown>
    collectionReferences: CollectionSummary[]
  }) => Promise<void>
  apiResponse: ApiResponse
  operation: Operation
  type: ContentHandlerType
}

export const CollectionUpdateCollectionReferences = ({
  collection,
  collectionSummaries,
  selectedCollections,
  setSelectedCollections,
  apiResponse,
  updateCollectionReferences,
  operation,
  type,
}: Props) => {
  // Exclude the current collection itself
  const permittedCollections = collectionSummaries.filter(
    c => c.id !== collection.id
  )

  const updateReferences = async () => {
    const collectionReferences = selectedCollections
      .map(n => collectionSummaries.find(cs => cs.name === n))
      .filter(c => c !== undefined)

    await updateCollectionReferences({
      collection,
      collectionReferences,
    })
  }

  return (
    operation === ('update-collections' as Operation) && (
      <>
        <CollectionSelector
          options={permittedCollections.map(c => c.name)}
          selectedCollections={selectedCollections}
          setSelectedCollections={setSelectedCollections}
          type={type}
        />
        <div className="form-row">
          <button onClick={updateReferences}>Update collections</button>
          <ApiResponseMessage apiResponse={apiResponse} />
        </div>
      </>
    )
  )
}
