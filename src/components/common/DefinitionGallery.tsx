'use client'

import React from 'react'

import { useRouter } from 'next/navigation'
import { useTestPlanner } from '@/hooks/useTestPlanner'

import { Collection, Definition } from '@/types'

type Props<T> = {
  collection: Collection<T>
}

export function DefinitionGallery<T>({ collection }: Props<T>) {
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
    <section aria-labelledby="definitions">
      <h1 id="definitions">Terms</h1>
      <dl>{definitions}</dl>
      <button id="start-test" onClick={handleStartTest}>
        Test your knowledge of these terms
      </button>
    </section>
  )
}
