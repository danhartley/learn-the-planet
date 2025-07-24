'use client'
import React, { useEffect, useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { CollectionList } from '@/components/CollectionList'

import { generateLoadingCards } from '@/components/common/LoadingCard'

import { SessionState, CollectionStatus } from '@/types'

type Props = {
  session: SessionState | undefined
}

export const TermHome = ({ session }: Props) => {
  const { collectionSummaries, getCollectionSummaries } = useCollection()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true)
        setError(null)
        await getCollectionSummaries()
      } catch (err) {
        console.error('Error fetching terms:', err)
        setError('Error loading terms')
      } finally {
        setLoading(false)
      }
    }

    fetchCollections()
  }, [getCollectionSummaries])

  if (error) {
    return <div>{error}</div>
  }

  const userCollections =
    collectionSummaries?.filter(
      summary =>
        (summary.status as CollectionStatus) === 'public' ||
        summary.ownerId === session?.userId
    ) || []

  const terms = userCollections.filter(c => c.type === 'term')

  // Show loading state if still loading OR if we don't have data yet
  if (loading || !collectionSummaries || collectionSummaries.length === 0) {
    return (
      <section aria-labelledby="terms" className="column-group">
        <h1 id="terms">terms</h1>
        <section aria-labelledby="featured-terms" className="group-block">
          <div className="group">
            <h2 id="featured-terms">Featured collections</h2>
            <div>Terms used in biology and ecology</div>
          </div>
          <div className="block-container">
            <ul className="grid-md column-count">
              {generateLoadingCards(terms.length || 5)}
            </ul>
          </div>
        </section>
      </section>
    )
  }

  // Only show "no terms" after we've finished loading and confirmed no data
  if (terms.length === 0) {
    return <div>No terms found</div>
  }

  return (
    <section aria-labelledby="terms" className="column-group">
      <h1 id="terms">terms</h1>
      <section aria-labelledby="featured-terms" className="group-block">
        <div className="group">
          <h2 id="featured-terms">Featured collections</h2>
          <div>Terms used in biology and ecology</div>
        </div>
        <CollectionList collections={terms} />
      </section>
    </section>
  )
}
