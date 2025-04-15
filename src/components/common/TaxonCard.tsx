'use client'

import { ResponsiveImage } from '@/components/common/ResponsiveImage'

import { Taxon, Image as Img } from '@/types'

type Props = {
  taxon: Taxon
}

export const TaxonCard = ({ taxon }: Props) => {
  const bgClassName = `bg-${taxon.iconicTaxon?.toLowerCase()}`
  const classNames = `taxon ${bgClassName}`

  return (
    <div className={classNames}>
      <figure>
        <ResponsiveImage
          id={taxon.id.toString()}
          img={taxon.image as Img}
          alt={taxon.binomial}
        />
        <figcaption>
          <div>
            <em>{taxon.binomial}</em>
          </div>
          <div>{taxon.vernacularName}</div>
        </figcaption>
      </figure>
    </div>
  )
}
