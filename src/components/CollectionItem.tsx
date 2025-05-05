'use client'

import Link from 'next/link'

import { useRouter } from 'next/navigation'
import { useTestPlanner } from '@/hooks/useTestPlanner'
import { Collection } from '@/types'

type Props<T> = {
  collection: Collection<T>
}

export function CollectionItem<T>({ collection }: Props<T>) {
  const router = useRouter()
  const { startTest } = useTestPlanner<T>()

  const handleStartTest = () => {
    startTest(collection)
    router.push('/test')
  }

  return (
    <section className="group card" aria-labelledby="collection">
      <div className="group">
        <h3 id="collection">{collection.name}</h3>
        <Link className="breadcrumb" href={`/collection/${collection.id}`}>
          Collection notes
        </Link>
      </div>
      <div>{collection.date}</div>
      <div>{collection.location}</div>
      <Link href={`/collection/${encodeURIComponent(collection.id)}`}>
        {collection.items.length} items
      </Link>
      <button id="start-test" onClick={handleStartTest}>
        Start test
      </button>
    </section>
  )
}
