'use client'
import React, { useEffect, useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { CollectionList } from '@/components/CollectionList'

import { generateLoadingCards } from '@/components/common/LoadingCard'

import {
  SessionState,
  CollectionStatus,
  CollectionFilters,
  ContentHandlerType,
  CollectionSummary,
} from '@/types'

type Props = {
  session: SessionState | undefined
}

export const TopicHome = ({ session }: Props) => {
  const { getFilteredCollectionSummaries } = useCollection()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [collectionSummaries, setCollectionSummaries] =
    useState<CollectionSummary[]>()

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true)
        setError(null)
        const filters: CollectionFilters = {
          type: 'topic' as unknown as ContentHandlerType,
        }
        const summaries = await getFilteredCollectionSummaries(filters)
        setCollectionSummaries(summaries)
      } catch (err) {
        console.error('Error fetching topics:', err)
        setError('Error loading topics')
      } finally {
        setLoading(false)
      }
    }

    fetchCollections()
  }, [getFilteredCollectionSummaries])

  if (error) {
    return <div>{error}</div>
  }

  // Process data if available (even during loading)
  const userCollections =
    collectionSummaries?.filter(
      summary =>
        (summary.status as CollectionStatus) === 'public' ||
        summary.ownerId === session?.userId
    ) || []

  const topics = userCollections.filter(c => c.type.toString() === 'topic')

  // Show loading state if still loading OR if we don't have data yet
  if (loading || !collectionSummaries) {
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
          <div className="block-container">
            <ul className="grid-md">
              {generateLoadingCards(topics.length || 5)}
            </ul>
          </div>
        </section>
      </section>
    )
  }

  // Only show "no topics" after we've finished loading and confirmed no data
  if (topics.length === 0) {
    return <div>No topics found</div>
  }

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
