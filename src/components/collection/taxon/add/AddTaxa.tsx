import React, { useState, useEffect } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { TaxonAutocomplete } from '@/components/collection/taxon/TaxonAutocomplete'

import { Taxon, Operation } from '@/types'

type Props = {
  setItems: (items: Taxon[]) => void // Changed from Dispatch<SetStateAction<...>>
  items: Taxon[] | undefined
  operation?: Operation
}

export const AddTaxa = ({ items, setItems }: Props) => {
  const { apiResponse } = useCollection()
  const [changesToSave, setChangesToSave] = useState(false)
  const [selectedTaxa, setSelectedTaxa] = useState<Taxon[]>(items || [])

  useEffect(() => {
    setChangesToSave(true)
  }, [selectedTaxa])

  const saveChanges = async () => {
    setItems(selectedTaxa) // This now calls the parent's handler
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
