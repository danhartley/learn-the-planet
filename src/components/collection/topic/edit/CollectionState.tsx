'use client'
import React from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { DeleteCollection } from '@/components/collection/DeleteCollection'
import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { CollectionStatus, CollectionSummary } from '@/types'

export const CollectionState = () => {
  const {
    collection,
    collectionSummaries,
    updateCollectionState,
    apiResponse,
  } = useCollection()

  if (!collectionSummaries) {
    return null
  }

  const collectionSummary: CollectionSummary = collectionSummaries.find(
    summary => summary.shortId === collection?.shortId
  ) as unknown as CollectionSummary

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = event.target.value as CollectionStatus
    updateCollectionState(collectionSummary, newStatus)
  }

  return (
    <section
      aria-labelledby="update-collection-visibility"
      className="list-group group-block"
    >
      <div className="group">
        <h2 id="update-collection-visibility">Update Collection visibility</h2>
        <div>
          Public collections are available to everyone. Private collections are
          only available to their owner.
        </div>
      </div>

      <div className="form-row">
        <ul className="list-group">
          <li>
            <input
              id="private"
              type="radio"
              name="collectionStatus"
              value="private"
              checked={collectionSummary.status === 'private'}
              onChange={handleStatusChange}
            />
            <label htmlFor="private">Private</label>
          </li>
          <li>
            <input
              id="public"
              type="radio"
              name="collectionStatus"
              value="public"
              checked={collectionSummary.status === 'public'}
              onChange={handleStatusChange}
            />
            <label htmlFor="public">Public</label>
          </li>
        </ul>
        <ApiResponseMessage apiResponse={apiResponse} />
      </div>

      <DeleteCollection />
    </section>
  )
}
