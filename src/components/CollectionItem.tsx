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

  const linkText =
    collection.type === 'taxon' ? 'Collection notes' : 'Collection terms'

  return (
    <section className="group card" aria-labelledby="collection">
      <div className="group">
        <h3 id="collection">{collection.name}</h3>
        <Link className="breadcrumb" href={`/collection/${collection.id}`}>
          {linkText}
        </Link>
      </div>
      <div>{collection.date}</div>
      <div>{collection.location}</div>
      <div>{collection.items.length} items</div>
      <button id="start-test" onClick={handleStartTest}>
        Start test
      </button>
    </section>
  )
}
