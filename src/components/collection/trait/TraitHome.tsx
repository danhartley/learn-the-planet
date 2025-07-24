'use client'
import React, { useEffect, useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { CollectionList } from '@/components/CollectionList'

import { generateLoadingCards } from '@/components/common/LoadingCard'

import { SessionState, CollectionStatus } from '@/types'

type Props = {
  session: SessionState | undefined
}

export const TraitHome = ({ session }: Props) => {
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
        console.error('Error fetching traits:', err)
        setError('Error loading traits')
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

  const traits = userCollections.filter(c => c.type === 'trait')

  if (loading) {
    return (
      <section aria-labelledby="traits" className="column-group">
        <h1 id="traits">Traits</h1>
        <section aria-labelledby="featured-traits" className="group-block">
          <div className="group">
            <h2 id="featured-traits">Featured collections</h2>
            <div>Common characteristics and qualities of species</div>
          </div>
          <div className="block-container">
            <ul className="grid-md column-count">
              {generateLoadingCards(traits.length || 5)}
            </ul>
          </div>
        </section>
      </section>
    )
  }

  // Only show "no traits" after we've finished loading and confirmed no data
  if (!collectionSummaries || collectionSummaries.length === 0) {
    return <div>No traits found</div>
  }

  return (
    <section aria-labelledby="traits" className="column-group">
      <h1 id="traits">Traits</h1>
      <section aria-labelledby="featured-traits" className="group-block">
        <div className="group">
          <h2 id="featured-traits">Featured collections</h2>
          <div>Common characteristics and qualities of species</div>
        </div>
        <CollectionList collections={traits} />
      </section>
    </section>
  )
}
