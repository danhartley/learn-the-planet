'use client'

import { ResponsiveImage } from '@/components/common/ResponsiveImage'

import { Taxon, Image as Img } from '@/types'

type Props = {
  taxon: Taxon
}

type RImage = Img | null

export const TaxonCard = ({ taxon }: Props) => {
  const bgClassName = `bg-${taxon.iconicTaxon?.toLowerCase()}`
  const classNames = `taxon ${bgClassName}`
  const image: RImage = taxon.image ?? taxon.images?.[0] ?? null

  return !!image ? (
    <div className={classNames}>
      <figure>
        <ResponsiveImage
          id={taxon.id.toString()}
          img={image}
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
  ) : null
}
