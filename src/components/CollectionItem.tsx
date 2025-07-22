'use client'

import { useRouter } from 'next/navigation'
import { useTestPlanner } from '@/hooks/useTestPlanner'

import { CollectionCard } from '@/components/common/CollectionCard'

import { CollectionSummary } from '@/types'

type Props = {
  collectionSummary: CollectionSummary
}

export function CollectionItem({ collectionSummary }: Props) {
  const router = useRouter()
  const { startTest } = useTestPlanner()

  const handleStartTest = async () => {
    try {
      const response = await fetch(
        `/api/collection/}${collectionSummary.slug}-${collectionSummary.shortId}`,
        {
          method: 'GET',
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const collection = await response.json()

      startTest({ collection })
      router.push('/test')
    } catch (error) {
      console.error('Failed to fetch collection:', error)
    }
  }

  return (
    <CollectionCard
      handleStartTest={handleStartTest}
      collectionSummary={collectionSummary}
    />
  )
}
