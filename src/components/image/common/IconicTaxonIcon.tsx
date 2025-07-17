import React from 'react'

import { taxonUrls } from '@/api/phylopic/api'

import { IconicTaxon } from '@/types'

type IconicTaxonProps = {
  iconicTaxa: IconicTaxon[]
}

export const IconicTaxonIcon: React.FC<IconicTaxonProps> = ({ iconicTaxa }) => {
  return (
    <div className="iconic-taxon">
      {iconicTaxa.map(iconicTaxon => (
        <img
          key={iconicTaxon}
          src={taxonUrls[iconicTaxon]?.icon}
          alt={`${iconicTaxon} icon, credit to ${taxonUrls[iconicTaxon]?.credit}`}
        />
      ))}
    </div>
  )
}

export default IconicTaxonIcon
