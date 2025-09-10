import React from 'react'

import Image from 'next/image'

import { taxonUrls } from '@/api/phylopic/api'

import { Collection, IconicTaxon } from '@/types'

type IconicTaxonProps = {
  collection: Collection<unknown>
}

export const IconicTaxonIcon: React.FC<IconicTaxonProps> = ({ collection }) => {
  if (!collection.items) return null

  let iconicTaxa: IconicTaxon[] = []

  switch (collection.type.toString()) {
    case 'taxon':
      iconicTaxa = [
        ...new Set(
          collection.items
            .map(i =>
              (i as { iconicTaxon?: string }).iconicTaxon?.toLowerCase()
            )
            .filter((it): it is IconicTaxon => it !== undefined)
        ),
      ]
      break

    case 'trait':
    case 'topic':
    case 'term':
      iconicTaxa = [
        ...new Set(
          collection.items
            .flatMap(
              i =>
                (i as { examples?: { iconicTaxon?: string }[] }).examples || []
            )
            .map(example => example.iconicTaxon?.toLowerCase())
            .filter((it): it is IconicTaxon => it !== undefined)
        ),
      ]
      break

    default:
      iconicTaxa = []
      break
  }

  return (
    <div className="iconic-taxon">
      {iconicTaxa.map(iconicTaxon => (
        <Image
          key={iconicTaxon}
          id={iconicTaxon}
          src={taxonUrls[iconicTaxon]?.icon}
          alt={`${iconicTaxon} icon, credit to ${taxonUrls[iconicTaxon]?.credit}`}
          width={0}
          height={0}
          style={{
            width: '40px',
            height: 'auto', // This maintains aspect ratio
          }}
        />
      ))}
    </div>
  )
}

export default IconicTaxonIcon
