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
            {String(trait.phenology[key as keyof typeof trait.phenology])}
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
    <section className="linked-collections">
      <section id={trait.trait} className="trait">
        <dl>
          <dt>{trait.trait}</dt>
          <dd>
            <div>{trait.definition}</div>
            {!!trait.source ? (
              <div>
                <a href={trait.source.url}>{trait.source.name}</a>
              </div>
            ) : (
              <div></div>
            )}
          </dd>
        </dl>
      </section>
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
    </section>
  )
}
