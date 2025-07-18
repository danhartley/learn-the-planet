'use client'
import React, { useEffect, useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { CollectionList } from '@/components/CollectionList'

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

  if (loading) {
    return <div>Loading taxa...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!collectionSummaries || collectionSummaries.length === 0) {
    return <div>No taxa found</div>
  }

  const userCollections = collectionSummaries.filter(
    summary =>
      (summary.status as CollectionStatus) === 'public' ||
      summary.ownerId === session?.userId
  )

  const taxa = userCollections.filter(c => c.type === 'taxon')

  return (
    <section aria-labelledby="taxa" className="column-group">
      <div className="group">
        <h1 id="taxa">taxa</h1>
        <div>Taxa data sourced from Wikipedia and iNaturalist</div>
      </div>
      <section aria-labelledby="featured-taxa" className="group-block">
        <h2 id="featured-taxa">Featured taxa</h2>
        <CollectionList collections={taxa} />
      </section>
    </section>
  )
}
