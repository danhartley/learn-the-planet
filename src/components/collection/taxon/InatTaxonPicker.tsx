import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'

import { TaxonAutocomplete } from '@/components/collection/taxon/TaxonAutocomplete'

import { Taxon, Operation, ApiResponse } from '@/types'

type Props = {
  setItems: Dispatch<SetStateAction<unknown[] | undefined>>
  items?: string
  operation?: Operation
  apiResponse: ApiResponse
}

export const InatTaxonPicker = ({
  setItems,
  items,
  operation,
  apiResponse,
}: Props) => {
  const [changesToSave, setChangesToSave] = useState(false)
  const [selectedTaxa, setSelectedTaxa] = useState<Taxon[]>(
    items ? JSON.parse(items) : []
  )

  useEffect(() => {
    setChangesToSave(true)
  }, [selectedTaxa])

  const saveChanges = async () => {
    setItems(selectedTaxa)
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
