'use client'
import React, { useEffect, useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { CollectionList } from '@/components/CollectionList'

import { SessionState, CollectionStatus } from '@/types'

type Props = {
  session: SessionState | undefined
}

export const TopicHome = ({ session }: Props) => {
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
        console.error('Error fetching topics:', err)
        setError('Error loading topics')
      } finally {
        setLoading(false)
      }
    }

    fetchCollections()
  }, [getCollectionSummaries])

  if (loading) {
    return <div>Loading topics...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!collectionSummaries || collectionSummaries.length === 0) {
    return <div>No topics found</div>
  }

  const userCollections = collectionSummaries.filter(
    summary =>
      (summary.status as CollectionStatus) === 'public' ||
      summary.ownerId === session?.userId
  )

  const topics = userCollections.filter(c => c.type === 'topic')

  return (
    <section aria-labelledby="topics" className="column-group">
      <h1 id="topics">Topics</h1>
      <section aria-labelledby="featured-topics" className="group-block">
        <div className="group">
          <h2 id="featured-topics">Featured collections</h2>
          <div>
            Fieldnotes, nature diaries, essays, field guides, and lessons
          </div>
        </div>
        <CollectionList collections={topics} />
      </section>
    </section>
  )
}
