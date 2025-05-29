'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTestPlanner } from '@/hooks/useTestPlanner'
import { TestConfigSettings } from '@/components/common/TestConfigSettings'
import { Collection, Taxon, QuestionTemplateSelection } from '@/types'
import { TaxonCard } from '@/components/common/TaxonCard'

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

  return (
    <section aria-labelledby="taxon-gallery" className="group">
      <h1 id="taxon-gallery">{collection.name}</h1>
      <div>{collection?.date}</div>
      <div>{collection?.location}</div>
      <section aria-labelledby="taxa" className="group-block">
        <h2 id="taxa">Taxa</h2>
        <div className="block">{taxa}</div>
      </section>
      <button id="start-test" onClick={handleStartTest}>
        Start test
      </button>
      <TestConfigSettings config={config} setConfig={setConfig} />
    </section>
  )
}
