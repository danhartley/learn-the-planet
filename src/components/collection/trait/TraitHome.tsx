'use client'
import React, { useEffect, useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { CollectionList } from '@/components/CollectionList'

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

  if (loading) {
    return <div>Loading traits...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!collectionSummaries || collectionSummaries.length === 0) {
    return <div>No traits found</div>
  }

  const userCollections = collectionSummaries.filter(
    summary =>
      (summary.status as CollectionStatus) === 'public' ||
      summary.ownerId === session?.userId
  )

  const traits = userCollections.filter(c => c.type === 'trait')

  return (
    <section aria-labelledby="traits">
      <div className="group">
        <h1 id="traits">Traits</h1>
        <div>Common characteristics and qualities of species</div>
      </div>
      <section aria-labelledby="featured-traits" className="group-block">
        <h2 id="featured-traits">Featured traits</h2>
        <CollectionList collections={traits} />
      </section>
    </section>
  )
}
