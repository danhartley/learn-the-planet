'use client'

import { ResponsiveImage } from '@/components/common/ResponsiveImage'

import { Taxon, Image as Img } from '@/types'

type Props = {
  taxon: Taxon
}

type responsiveImage = Img | null

export const TaxonCard = ({ taxon }: Props) => {
  const bgClassName = `bg-${taxon.iconicTaxon?.toLowerCase()}`
  const classNames = `taxon ${bgClassName}`
  const image: responsiveImage = taxon.image ?? taxon.images?.[0] ?? null

  const taxa = !!image ? (
    <div className={classNames}>
      <figure>
        <ResponsiveImage
          id={taxon.id.toString()}
          img={image}
          alt={taxon.binomial}
        />
        <figcaption>
          <div>
            <div>
              {taxon.genus ? (
                <em>
                  <span>{taxon.genus}</span> <span>{taxon.species}</span>
                </em>
              ) : (
                <em>{taxon.binomial}</em>
              )}
            </div>
            <div>{taxon.vernacularName}</div>
          </div>
        </figcaption>
      </figure>
    </div>
  ) : null

  return <>{taxa}</>
}
