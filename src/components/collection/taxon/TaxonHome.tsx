'use client'
import React, { useEffect, useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { CollectionList } from '@/components/CollectionList'

import { generateLoadingCards } from '@/components/common/LoadingCard'

import { SessionState, CollectionStatus } from '@/types'

type Props = {
  session: SessionState | undefined
}

export const TaxonHome = ({ session }: Props) => {
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
        console.error('Error fetching taxa:', err)
        setError('Error loading taxa')
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

  const taxa = userCollections.filter(c => c.type.toString() === 'taxon')

  // Show loading state if still loading OR if we don't have data yet
  if (loading || !collectionSummaries) {
    return (
      <section aria-labelledby="taxa" className="column-group">
        <h1 id="taxa">taxa</h1>
        <section aria-labelledby="featured-taxa" className="group-block">
          <div className="group">
            <h2 id="featured-taxa">Featured collections</h2>
            <div>Taxa data sourced from Wikipedia and iNaturalist</div>
          </div>
          <div className="block-container">
            <ul className="grid-md">
              {generateLoadingCards(taxa.length || 5)}
            </ul>
          </div>
        </section>
      </section>
    )
  }

  // Only show "no taxa" after we've finished loading and confirmed no data
  if (taxa.length === 0) {
    return <div>No taxa found</div>
  }

  return (
    <section aria-labelledby="taxa" className="column-group">
      <h1 id="taxa">taxa</h1>
      <section aria-labelledby="featured-taxa" className="group-block">
        <div className="group">
          <h2 id="featured-taxa">Featured collections</h2>
          <div>Taxa data sourced from Wikipedia and iNaturalist</div>
        </div>
        <CollectionList collections={taxa} />
      </section>
    </section>
  )
}
