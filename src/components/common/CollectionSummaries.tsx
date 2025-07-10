'use client'
import React, { useEffect, useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { CollectionList } from '@/components/CollectionList'

import { SessionState, CollectionStatus } from '@/types'

type Props = {
  session: SessionState | undefined
}

export const CollectionSummaries = ({ session }: Props) => {
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
        console.error('Error fetching collections:', err)
        setError('Error loading collections')
      } finally {
        setLoading(false)
      }
    }

    fetchCollections()
  }, [getCollectionSummaries])

  if (loading) {
    return <div>Loading collections...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!collectionSummaries || collectionSummaries.length === 0) {
    return <div>No collections found</div>
  }

  const userCollections = collectionSummaries.filter(
    summary =>
      (summary.status as CollectionStatus) === 'public' ||
      summary.ownerId === session?.userId
  )

  const topics = userCollections.filter(c => c.type === 'topic')
  const traits = userCollections.filter(c => c.type === 'trait')
  const taxa = userCollections.filter(c => c.type === 'taxon')
  const terms = userCollections.filter(c => c.type === 'term')

  return (
    <section aria-labelledby="collections">
      <div className="group">
        <h1 id="collections">Collections</h1>
        <h2>Topics, traits, taxa, and terms</h2>
      </div>
      <section aria-labelledby="topics" className="group-block">
        <h3 id="topics">Topics</h3>
        <CollectionList collections={topics} />
      </section>
      <section aria-labelledby="traits" className="group-block">
        <h3 id="traits">Traits</h3>
        <CollectionList collections={traits} />
      </section>
      <section aria-labelledby="taxa" className="group-block">
        <h3 id="taxa">Taxa</h3>
        <CollectionList collections={taxa} />
      </section>
      <section aria-labelledby="terms" className="group-block">
        <h3 id="terms">Terms</h3>
        <CollectionList collections={terms} />
      </section>
    </section>
  )
}
