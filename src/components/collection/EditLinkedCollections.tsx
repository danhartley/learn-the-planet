import React, { useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { CollectionSelector } from '@/components/collection/CollectionSelector'
import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { CollectionSummary } from '@/types'

type Props = {
  collectionSummaries: CollectionSummary[]
}

export const EditLinkedCollections = ({ collectionSummaries }: Props) => {
  const { collection, updateLinkedCollections, apiResponse } = useCollection()

  const [linkedCollections, setLinkedCollections] = useState(
    collection?.collections?.map(collection => collection.name) || []
  )

  if (!collection) return null

  // Exclude the current collection
  const permittedCollections = collectionSummaries.filter(
    c => c.id !== collection.id
  )

  const handleChange = async () => {
    const collections = linkedCollections
      ?.map(name => collectionSummaries.find(cs => cs.name === name))
      .filter(c => c !== undefined) as CollectionSummary[]

    await updateLinkedCollections(collections || [])
  }

  return (
    <>
      <CollectionSelector
        options={permittedCollections.map(collection => collection.name)}
        selectedCollections={linkedCollections}
        setSelectedCollections={setLinkedCollections}
      />
      <div className="form-row">
        <button onClick={handleChange} className="save">
          Update collections
        </button>
        <ApiResponseMessage apiResponse={apiResponse} />
      </div>
    </>
  )
}
