import { Trait } from '@/types'

import { TaxonCard } from '@/components/common/TaxonCard'

type Props = {
  trait: Trait
}

export const TraitCard = ({ trait }: Props) => {
  const morphology = trait?.morphology?.map((description, i) => {
    return <li key={i}>{description}</li>
  })

  let phenology

  if (trait?.phenology) {
    phenology = Object.keys(trait?.phenology).map(key => {
      if (
        trait.phenology &&
        trait.phenology[key as keyof typeof trait.phenology]
      ) {
        return (
          <li key={key}>
            <span>{key}</span>:{' '}
            {trait.phenology[key as keyof typeof trait.phenology]}
          </li>
        )
      }
    })
  }

  const examples = trait.examples?.map(taxon => {
    return (
      <TaxonCard key={taxon.id + crypto.randomUUID()} taxon={taxon}></TaxonCard>
    )
  })

  return (
    <div className="trait">
      <dl>
        <dt>{trait.trait}</dt>
        <dd>
          <div>
            <em>{trait.definition}</em>
          </div>
          <div>
            <a href={trait.source}>{trait.source}</a>
          </div>
        </dd>
      </dl>
      <section aria-labelledby="morphology">
        <h4 id="morphology">Morphology</h4>
        <ul>{morphology}</ul>
      </section>
      <section aria-labelledby="phenology">
        <h4 id="phenology">Phenology</h4>
        <ul>{phenology}</ul>
      </section>
      <section aria-labelledby="examples">
        <h4 id="examples">Examples</h4>
        <div className="block">{examples}</div>
      </section>
    </div>
  )
}
