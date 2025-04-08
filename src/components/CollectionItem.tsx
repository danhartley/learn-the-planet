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
    collection.items.forEach(i => {
      const [genus, species] = i.binomial.split(' ')
      i.genus = genus
      i.species = species
      i.image = i.images[0]
      i?.distractors?.forEach(d => {
        const [genus, species] = d.binomial.split(' ')
        d.genus = genus
        d.species = species
        d.image = d.images[0]
      })
    })

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
