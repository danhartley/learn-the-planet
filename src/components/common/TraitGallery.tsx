'use client'

import React from 'react'

import { useRouter } from 'next/navigation'
import { useTestPlanner } from '@/hooks/useTestPlanner'

import { Collection, Definition } from '@/types'

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

  const definitions = (collection.items as Definition[]).map(item => {
    return (
      <React.Fragment key={item.id}>
        <dt>{item.term}</dt>
        <dd>
          <div>{item.definition}</div>
          <div>
            <em>{item.example}</em>
          </div>
          <div>
            <a href={item.source}>{item.source}</a>
          </div>
        </dd>
      </React.Fragment>
    )
  })

  return (
    <section aria-labelledby="term-gallery" className="group">
      <h1 id="term-gallery">Definitions</h1>
      <h2>{collection.name}</h2>
      <section aria-labelledby="terms" className="group-block">
        <h3 id="terms">Terms</h3>
        <dl>{definitions}</dl>
        <p>
          <button id="start-test" onClick={handleStartTest}>
            Start test
          </button>
        </p>
      </section>
    </section>
  )
}
