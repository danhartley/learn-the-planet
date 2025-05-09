'use client'

import React from 'react'

import { useRouter } from 'next/navigation'
import { useTestPlanner } from '@/hooks/useTestPlanner'

import { Collection, Trait } from '@/types'

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
        <dt>{item.trait}</dt>
        <dd>
          <div>{item.name}</div>
          <div>
            <em>{item.description}</em>
          </div>
          <div>
            <a href={item.source}>{item.source}</a>
          </div>
        </dd>
      </React.Fragment>
    )
  })

  return (
    <section aria-labelledby="trait-gallery" className="group">
      <h1 id="trait-gallery">Traits</h1>
      <h2>{collection.name}</h2>
      <section aria-labelledby="terms" className="group-block">
        <h3 id="traits">Traits</h3>
        <dl>{traits}</dl>
        <p>
          <button id="start-test" onClick={handleStartTest}>
            Start test
          </button>
        </p>
      </section>
    </section>
  )
}
