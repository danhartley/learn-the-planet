import React, { useState, useEffect } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { TaxonAutocomplete } from '@/components/collection/taxon/TaxonAutocomplete'

import { Topic, Taxon } from '@/types'
import { getShortId } from '@/utils/strings'

export const AddTraitTaxa = () => {
  const { collection, addCollectionItem, apiResponse } = useCollection()
  const [changesToSave, setChangesToSave] = useState(false)
  const [selectedTaxa, setSelectedTaxa] = useState<Taxon[]>([])

  useEffect(() => {
    setChangesToSave(true)
  }, [selectedTaxa])

  const saveChanges = async () => {
    if (collection && selectedTaxa.length > 0) {
      const item = {
        id: getShortId(),
        examples: selectedTaxa,
      } as Topic

      addCollectionItem(collection, {
        ...item,
        examples: selectedTaxa,
      })
      setSelectedTaxa([])
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
    <section aria-labelledby="new-section">
      <h2 id="new-section">Add taxa</h2>
      <TaxonAutocomplete
        selectedTaxa={selectedTaxa}
        onTaxonToggle={handleTaxonToggle}
        changesToSave={changesToSave}
        saveChanges={saveChanges}
        apiResponse={apiResponse}
        sectionIndex={1}
      />
    </section>
  )
}
