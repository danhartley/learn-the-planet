'use client'

import React, { useState, useEffect } from 'react'

import { IconicTaxon } from '@/types'

interface Props {
  setSelectedIconicTaxons: (selectedTaxons: IconicTaxon[]) => void
}

const allTaxa: IconicTaxon[] = [
  'plantae',
  'insecta',
  'mammalia',
  'reptilia',
  'aves',
  'amphibia',
  'actinopterygii',
  'mollusca',
  'fungi',
  'animalia',
  'arachnida',
]

export function IconicTaxaFilter({ setSelectedIconicTaxons }: Props) {
  const [selectedTaxa, setSelectedTaxa] = useState<IconicTaxon[]>(allTaxa)

  useEffect(() => {
    setSelectedIconicTaxons(selectedTaxa)
  }, [selectedTaxa, setSelectedIconicTaxons])

  const handleTaxonChange = (taxon: IconicTaxon, checked: boolean) => {
    if (checked) {
      setSelectedTaxa(prev => [...prev, taxon])
    } else {
      setSelectedTaxa(prev => prev.filter(t => t !== taxon))
    }
  }

  return (
    <section className="group-block">
      <fieldset id="iconic-taxa-container">
        <legend>
          <h2>Filter your iNaturalist search by taxa</h2>
        </legend>
        <div>
          {allTaxa.map(taxon => (
            <div key={taxon} className={`bg-${taxon}`}>
              <input
                type="checkbox"
                name="taxa"
                id={taxon}
                value={taxon}
                checked={selectedTaxa.includes(taxon)}
                onChange={e => handleTaxonChange(taxon, e.target.checked)}
              />
              <label htmlFor={taxon}>{taxon}</label>
            </div>
          ))}
        </div>
      </fieldset>
    </section>
  )
}
