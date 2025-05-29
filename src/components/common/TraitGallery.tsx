'use client'

import React, { useState } from 'react'

import Link from 'next/link'

import { useRouter } from 'next/navigation'
import { useTestPlanner } from '@/hooks/useTestPlanner'
import { TraitCard } from '@/components/common/TraitCard'
import {
  Collection,
  Trait,
  CollectionSummary,
  QuestionTemplateSelection,
} from '@/types'
import { TestConfigSettings } from '@/components/common/TestConfigSettings'

type Props<Trait> = {
  collection: Collection<Trait>
}

export function TraitGallery({ collection }: Props<Trait>) {
  const router = useRouter()
  const { startTest } = useTestPlanner<Trait>()
  const [config, setConfig] = useState({
    questionTemplateSelections: [
      { type: 'multipleChoice', isSelected: true },
      { type: 'textEntry', isSelected: true },
      { type: 'multiSelect', isSelected: true },
    ] as QuestionTemplateSelection[],
  })

  const handleStartTest = () => {
    startTest({ collection, config })
    router.push('/test')
  }

  const traits = (collection.items as Trait[]).map(item => {
    return (
      <React.Fragment key={item.id}>
        <TraitCard trait={item}></TraitCard>
      </React.Fragment>
    )
  })

  const traitIndex = (collection.items as Trait[]).map(item => {
    return (
      <li key={item.id}>
        <Link href={`#${item.trait}`} scroll={true}>
          {item.trait}
        </Link>
      </li>
    )
  })

  const collections = collection?.collections?.map(
    (subCollection: CollectionSummary) => {
      return subCollection ? (
        <li key={subCollection.shortId}>
          <Link
            href={`/collection/${encodeURIComponent(subCollection?.shortId || '')}`}
          >
            {subCollection.name}
          </Link>
        </li>
      ) : null
    }
  )

  const hasCollections = Array.isArray(collections) && collections.length > 0

  const terms = hasCollections ? (
    <section aria-labelledby="topic-gallery" className="sub-section">
      <h2 id="topic-gallery">Terms</h2>
      <ul>{collections}</ul>
    </section>
  ) : null

  return (
    <section aria-labelledby="trait-gallery" className="group">
      <h1 id="trait-gallery">{collection.name}</h1>
      <section aria-labelledby="traits" className="group-block">
        <h2 id="traits">Traits</h2>
        <ul className="trait">{traitIndex}</ul>
        <div className="column-group">{traits}</div>
        {terms}
      </section>
      <button id="start-test" onClick={handleStartTest}>
        Start test
      </button>
      <TestConfigSettings config={config} setConfig={setConfig} />
    </section>
  )
}
