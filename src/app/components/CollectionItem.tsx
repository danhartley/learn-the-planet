'use client'

import { useRouter } from 'next/navigation'
import { useTestPlanner } from '@/hooks/useTestPlanner'
import { Collection } from '@/types'

type Props = {
  collection: Collection
}

export function CollectionItem({ collection }: Props) {
  const router = useRouter()
  const { startTest } = useTestPlanner()

  const handleStartTest = () => {
    startTest(collection)
    router.push('/test')
  }

  return (
    <div>
      <h3>{collection.name}</h3>
      <p>{collection.count} items</p>
      <button onClick={handleStartTest}>Start Test</button>
    </div>
  )
}
