'use client'

import React from 'react'

import Link from 'next/link'

import { useRouter } from 'next/navigation'
import { useTestPlanner } from '@/hooks/useTestPlanner'
import { TraitCard } from '@/components/common/TraitCard'
import { Collection, Trait, CollectionSummary } from '@/types'

type Props<T> = {
  collection: Collection<T>
}

export function TraitGallery<T>({ collection }: Props<T>) {
  const router = useRouter()
  const { startTest } = useTestPlanner<T>()

  const handleStartTest = () => {
    startTest(collection)
    router.push('/test')
  }

  const traits = (collection.items as Trait[]).map(item => {
    return (
      <React.Fragment key={item.id}>
        <TraitCard trait={item}></TraitCard>
      </React.Fragment>
    )
  })

  const collections = collection?.collections?.map(
    (subCollection: CollectionSummary<T>) => {
      return subCollection ? (
        <li key={subCollection.id}>
          <Link href={`/collection/${encodeURIComponent(subCollection.id)}`}>
            {subCollection.name}
          </Link>
        </li>
      ) : null
    }
  )

  const terms = collections?.filter(sc => sc?.type === 'term') ? (
    <section aria-labelledby="topic-gallery" className="sub-section">
      <h3 id="topic-gallery">Terms</h3>
      <ul>{collections}</ul>
    </section>
  ) : null

  return (
    <section aria-labelledby="trait-gallery" className="group">
      <h1 id="trait-gallery">Traits</h1>
      <h2>{collection.name}</h2>
      <section aria-labelledby="terms" className="group-block">
        <h3 id="traits">Traits</h3>
        <div className="column-group">{traits}</div>
        <p>
          <button id="start-test" onClick={handleStartTest}>
            Start test
          </button>
        </p>
        {terms}
      </section>
    </section>
  )
}
