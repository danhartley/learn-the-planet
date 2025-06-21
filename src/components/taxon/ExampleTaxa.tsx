import React, { useState, useEffect } from 'react'

import { useCollectionOperations } from '@/hooks/useCollectionOperations'

import { TaxonAutocomplete } from '@/components/taxon/TaxonAutocomplete'

import { Collection, Topic, Taxon, Operation } from '@/types'

type Props = {
  collection: Collection<Topic>
  section: Topic
  sectionIndex: number
}

export const ExampleTaxa = ({ collection, section, sectionIndex }: Props) => {
  const [changesToSave, setChangesToSave] = useState(false)
  const [selectedTaxa, setSelectedTaxa] = useState<Taxon[]>(
    section?.examples || []
  )
  const { updateCollectionItem, apiResponse } = useCollectionOperations()

  useEffect(() => {
    setChangesToSave(true)
  }, [section?.examples])

  const saveChanges = () => {
    section.examples = selectedTaxa || []
    updateCollectionItem(collection, section)
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
      operation={'update-items' as Operation}
      sectionIndex={sectionIndex}
    />
  )
}
