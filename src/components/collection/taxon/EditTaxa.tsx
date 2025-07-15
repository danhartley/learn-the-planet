import React, { useState, useEffect } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { TaxonAutocomplete } from '@/components/collection/taxon/TaxonAutocomplete'

import { Taxon, Collection } from '@/types'

export const EditTaxa = () => {
  const { collection, updateCollectionItems, apiResponse } = useCollection()
  const [changesToSave, setChangesToSave] = useState(false)
  const [selectedTaxa, setSelectedTaxa] = useState<Taxon[]>(
    (collection as Collection<Taxon>)?.items || []
  )

  useEffect(() => {
    setChangesToSave(true)
  }, [selectedTaxa])

  const saveChanges = async () => {
    console.log('selectedTaxa', selectedTaxa)
    if (collection) {
      updateCollectionItems(collection, selectedTaxa)
    }
    setChangesToSave(false)
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
    <TaxonAutocomplete
      selectedTaxa={selectedTaxa}
      onTaxonToggle={handleTaxonToggle}
      changesToSave={changesToSave}
      saveChanges={saveChanges}
      apiResponse={apiResponse}
      sectionIndex={1}
    />
  )
}
