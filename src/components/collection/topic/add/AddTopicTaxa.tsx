import React, { useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { TaxonAutocomplete } from '@/components/collection/taxon/TaxonAutocomplete'

import { Topic, Taxon } from '@/types'
import { getShortId } from '@/utils/strings'

export const AddTopicTaxa = () => {
  const { collection, addCollectionItem, apiResponse } = useCollection()
  const [selectedTaxa, setSelectedTaxa] = useState<Taxon[]>([])

  const handleSaveChanges = (taxaWithDistractors: Taxon[]) => {
    setSelectedTaxa(taxaWithDistractors)
    if (collection && selectedTaxa.length > 0) {
      const item = {
        id: getShortId(),
        examples: taxaWithDistractors,
      } as Topic

      addCollectionItem(collection, item)
      setSelectedTaxa([])
    }
  }

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
    <>
      {/* <h2 id="new-section">Add taxa</h2> */}
      <TaxonAutocomplete
        selectedTaxa={selectedTaxa}
        onTaxonToggle={handleTaxonToggle}
        onSaveChanges={handleSaveChanges}
        apiResponse={apiResponse}
        sectionIndex={1}
      />
    </>
  )
}
