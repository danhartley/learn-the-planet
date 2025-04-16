'use client'

import Link from 'next/link'

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
      i.image = i.images?.[0]
      i?.distractors?.forEach(d => {
        const [genus, species] = d.binomial.split(' ')
        d.genus = genus
        d.species = species
        d.image = d.images?.[0]
      })
    })

    startTest(collection)
    router.push('/test')
  }

  return (
    <section className="group card" aria-labelledby="collection">
      <h3 id="collection">{collection.name}</h3>
      <div>{collection.date}</div>
      <div>{collection.location}</div>
      <Link href={`/collection/${encodeURIComponent(collection.id)}`}>
        {collection.items.length} items
      </Link>
      <button id="start-test" onClick={handleStartTest}>
        Start Test
      </button>
    </section>
  )
}
