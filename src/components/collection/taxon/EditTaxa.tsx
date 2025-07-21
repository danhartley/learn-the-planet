import React, { useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { TaxonAutocomplete } from '@/components/collection/taxon/TaxonAutocomplete'

import { Taxon, Collection } from '@/types'

export const EditTaxa = () => {
  const { collection, updateCollectionItems, apiResponse } = useCollection()
  const [selectedTaxa, setSelectedTaxa] = useState<Taxon[]>(
    (collection as Collection<Taxon>)?.items || []
  )

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

  const handleSaveChanges = (taxaWithDistractors: Taxon[]) => {
    setSelectedTaxa(taxaWithDistractors)

    if (collection) {
      updateCollectionItems(collection, taxaWithDistractors)
    }
  }

  return (
    <TaxonAutocomplete
      selectedTaxa={selectedTaxa}
      onTaxonToggle={handleTaxonToggle}
      onSaveChanges={handleSaveChanges}
      apiResponse={apiResponse}
      sectionIndex={1}
    />
  )
}
