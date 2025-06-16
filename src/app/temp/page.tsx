'use client'

import React, { useState } from 'react'

import { TaxonAutocomplete } from '@/components/common/taxon/TaxonAutocomplete'

import { Taxon } from '@/types'

export default function Page() {
  const [selectedTaxa, setSelectedTaxa] = useState<Taxon[]>([])

  const handleTaxonToggle = (taxon: Taxon) => {
    setSelectedTaxa(prev => {
      const isSelected = prev.some(selected => selected.id === taxon.id)

      if (isSelected) {
        // Remove taxon
        return prev.filter(selected => selected.id !== taxon.id)
      } else {
        // Add taxon
        return [...prev, taxon]
      }
    })
  }

  return (
    <div>
      <div>
        <h1>Taxon Autocomplete Demo</h1>
        <TaxonAutocomplete
          selectedTaxa={selectedTaxa}
          onTaxonToggle={handleTaxonToggle}
        />
      </div>
    </div>
  )
}
