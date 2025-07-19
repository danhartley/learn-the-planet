'use client'
import Link from 'next/link'

import { Url } from 'next/dist/shared/lib/router/router'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTestPlanner } from '@/hooks/useTestPlanner'
import { TestConfigSettings } from '@/components/common/TestConfigSettings'

import { TaxonCard } from '@/components/common/TaxonCard'
import { IconicTaxonIcon } from '@/components/image/common/IconicTaxonIcon'

import { Collection, Taxon, QuestionTemplateSelection } from '@/types'

type Props<Taxon> = {
  collection: Collection<Taxon>
}

export const TaxonGallery = ({ collection }: Props<Taxon>) => {
  const router = useRouter()
  const { startTest } = useTestPlanner<Taxon>()
  const [config, setConfig] = useState({
    questionTemplateSelections: [
      { type: 'multipleChoice', isSelected: true },
      { type: 'textEntry', isSelected: true },
    ] as QuestionTemplateSelection[],
  })

  // Early return after all hooks have been called
  if (!collection?.items?.[0]) {
    return null // Return null instead of undefined
  }

  const handleStartTest = () => {
    startTest({ collection, config })
    router.push('/test')
  }

  const taxa = collection?.items.map(item => {
    const firstImage = item?.images ? item.images[0] : null
    const image = item?.image || firstImage
    if (!image) return null
    return <TaxonCard key={item.id + crypto.randomUUID()} taxon={item} />
  })

  const authors = collection.author?.authors?.join(',')

  return (
    <section aria-labelledby="taxon-gallery" className="column-group">
      <div>
        <h1 id="taxon-gallery">{collection.name}</h1>
        <div>{authors}</div>
        <div className="font-xs">
          {collection?.author?.source && (
            <Link href={collection?.author?.source as Url}>
              {collection?.author?.title}
            </Link>
          )}
        </div>
        <div>{collection?.date}</div>
        <div>{collection?.location}</div>
      </div>
      <section aria-labelledby="taxa" className="group-block">
        <h2 id="taxa">Taxa</h2>
        <IconicTaxonIcon collection={collection} />
        <hr />
        <div className="block">{taxa}</div>
      </section>
      <TestConfigSettings config={config} setConfig={setConfig} />
      <button id="start-test" onClick={handleStartTest}>
        Start test
      </button>
    </section>
  )
}
