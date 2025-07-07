'use client'
import React from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { CollectionStatus, CollectionSummary } from '@/types'

export const TopicState = () => {
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
    <section aria-labelledby="update-collection-visibility">
      <div className="group">
        <h2 id="update-collection-visibility">Update Collection visibility</h2>
        <div>
          Public collections are available to everyone. Private collections are
          only available to their owner.
        </div>
      </div>
      <div className={`form-row ${collection?.type}`}>
        <ul>
          <li>
            <label>
              <input
                type="radio"
                name="collectionStatus"
                value="private"
                checked={collectionSummary.status === 'private'}
                onChange={handleStatusChange}
              />
              Private
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="collectionStatus"
                value="public"
                checked={collectionSummary.status === 'public'}
                onChange={handleStatusChange}
              />
              Public
            </label>
          </li>
        </ul>
        <ApiResponseMessage apiResponse={apiResponse} />
      </div>
    </section>
  )
}
