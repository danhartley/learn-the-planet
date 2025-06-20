import React, { useState } from 'react'

import { CollectionSelector } from '@/components/collection/CollectionSelector'
import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { Collection, CollectionSummary, ApiResponse } from '@/types'

type Props = {
  collection: Collection<unknown>
  collectionSummaries: CollectionSummary[]
  handleLinkedCollectionsChange: (
    updatedLinkedConnections: CollectionSummary[]
  ) => void
  apiResponse: ApiResponse
}

export const EditLinkedCollections = ({
  collection,
  collectionSummaries,
  handleLinkedCollectionsChange,
  apiResponse,
}: Props) => {
  const [linkedCollections, setLinkedCollections] = useState(
    collection?.collections?.map(collection => collection.name) || []
  )

  // Exclude the current collection
  const permittedCollections = collectionSummaries.filter(
    c => c.id !== collection.id
  )

  const handleChange = () => {
    const collections = linkedCollections
      ?.map(name => collectionSummaries.find(cs => cs.name === name))
      .filter(c => c !== undefined)

    handleLinkedCollectionsChange(collections || [])
  }

  return (
    <>
      <CollectionSelector
        options={permittedCollections.map(collection => collection.name)}
        selectedCollections={linkedCollections}
        setSelectedCollections={setLinkedCollections}
      />
      <div className="form-row">
        <button onClick={handleChange}>Update collections</button>
        <ApiResponseMessage apiResponse={apiResponse} />
      </div>
    </>
  )
}
