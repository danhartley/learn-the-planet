'use client'

import React, { useState } from 'react'

import Link from 'next/link'

import { useRouter } from 'next/navigation'
import { useTestPlanner } from '@/hooks/useTestPlanner'
import { TestConfigSettings } from '@/components/common/TestConfigSettings'
import { NextCloudinaryImage } from '@/components/image/NextCloudinaryImage'

import { Collection, Term, QuestionTemplateSelection } from '@/types'

type Props<Term> = {
  collection: Collection<Term>
}

export function TermGallery({ collection }: Props<Term>) {
  const router = useRouter()
  const { startTest } = useTestPlanner<Term>()
  const [config, setConfig] = useState({
    questionTemplateSelections: [
      { type: 'multipleChoice', isSelected: true },
      { type: 'textEntry', isSelected: true },
    ] as QuestionTemplateSelection[],
  })

  const handleStartTest = () => {
    startTest({ collection, config })
    router.push('/test')
  }

  const definitions = (collection.items as Term[]).map(item => {
    return (
      <React.Fragment key={item.id}>
        <dt id={item.term}>{item.term}</dt>
        <dd>
          <div>{item.definition}</div>
          <div>
            <em>{item.example}</em>
          </div>
          <div>
            <a href={item.source}>{item.source}</a>
          </div>
          {item.images &&
            item.images.map(img => {
              return (
                <NextCloudinaryImage
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  caption={img.caption}
                />
              )
            })}
        </dd>
      </React.Fragment>
    )
  })

  const traitIndex = (collection.items as Term[]).map(item => {
    return (
      <li key={item.id}>
        <Link href={`#${item.term}`} scroll={true}>
          {item.term}
        </Link>
      </li>
    )
  })

  return (
    <section aria-labelledby="term-gallery" className="group">
      <h1 id="term-gallery">{collection.name}</h1>
      <section aria-labelledby="terms" className="group-block">
        <h2 id="terms">Terms</h2>
        <ul>{traitIndex}</ul>
        <dl>{definitions}</dl>
      </section>
      <button id="start-test" onClick={handleStartTest}>
        Start test
      </button>
      <TestConfigSettings config={config} setConfig={setConfig} />
    </section>
  )
}
