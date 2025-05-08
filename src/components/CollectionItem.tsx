'use client'

import Link from 'next/link'

import { useRouter } from 'next/navigation'
import { useTestPlanner } from '@/hooks/useTestPlanner'
import { Collection, ContentHandlerType } from '@/types'

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

  let linkText

  switch (collection.type as ContentHandlerType) {
    case 'taxon':
      linkText = 'View taxa'
      break
    case 'definition':
      linkText = 'Review terms'
      break
    case 'topic':
      linkText = 'Background'
      break
    case 'trait':
      linkText = 'View traits'
      break
  }

  const items =
    collection.items?.length > 0 ? `${collection.items?.length} items` : ''

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
      <div>{items}</div>
      <button id="start-test" onClick={handleStartTest}>
        Start test
      </button>
    </section>
  )
}
