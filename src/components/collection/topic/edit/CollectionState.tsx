'use client'
import React from 'react'

import { useSession } from 'next-auth/react'

import { useCollection } from '@/contexts/CollectionContext'
import { useAuthenticatedAuthor } from '@/hooks/useAuthenticatedAuthor'

import { DeleteCollection } from '@/components/collection/DeleteCollection'

import { CollectionStatus, CollectionSummary, SessionState } from '@/types'

export const CollectionState = () => {
  const { data: session } = useSession()
  const authenticatedAuthor = useAuthenticatedAuthor(
    session as unknown as SessionState
  )
  const { collection, collectionSummaries, updateCollectionState } =
    useCollection()

  if (!collectionSummaries) {
    return null
  }

  const collectionSummary: CollectionSummary = collectionSummaries.find(
    summary => summary.shortId === collection?.shortId
  ) as unknown as CollectionSummary

  const publish = () => {
    updateCollectionState(
      collectionSummary,
      'public' as unknown as CollectionStatus
    )
  }
  console.log('authenticatedAuthor?.role', authenticatedAuthor?.role)
  return (
    <section
      aria-labelledby="update-collection-visibility"
      className="list-group group-block"
    >
      <div className="group">
        <h2 id="update-collection-visibility">Update collection visibility</h2>
        <div>
          Public collections are available to everyone. Private collections are
          only available to their owner.
        </div>
      </div>

      {collectionSummary.status === 'private' && (
        <button onClick={publish}>Publish</button>
      )}

      {collectionSummary.status === 'public' && (
        <div>
          <strong>This collection is public.</strong>
        </div>
      )}

      {(collectionSummary.status === 'private' ||
        authenticatedAuthor?.role === 'admin') && (
        <DeleteCollection collectionSummary={collectionSummary} />
      )}
    </section>
  )
}
