import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'

import { useCollectionOperations } from '@/hooks/useCollectionOperations'

import { TaxonAutocomplete } from '@/components/common/taxon/TaxonAutocomplete'

import { Taxon, Operation, Collection, ApiResponse } from '@/types'

type Props = {
  setItems: Dispatch<SetStateAction<unknown[] | undefined>>
  items?: string
  operation?: Operation
  collection?: Collection<unknown>
  apiResponse: ApiResponse
}

export const CollectionInatTaxonPicker = ({
  setItems,
  items,
  operation,
  collection,
}: Props) => {
  const [changesToSave, setChangesToSave] = useState(false)
  const [selectedTaxa, setSelectedTaxa] = useState<Taxon[]>(
    items ? JSON.parse(items) : []
  )
  const [isTaxonArrayValid, setIsTaxonArrayValid] = useState<ApiResponse>({
    success: false,
    message: '',
  })
  const { apiResponse, updateCollectionItems } = useCollectionOperations()

  useEffect(() => {
    setChangesToSave(true)
  }, [selectedTaxa])

  const saveChanges = async () => {
    setItems(selectedTaxa)
    if (collection) {
      await updateCollectionItems(collection, selectedTaxa)
      setIsTaxonArrayValid(apiResponse)
    } else {
      setItems(selectedTaxa)
      setIsTaxonArrayValid({ success: true, message: 'Taxa added' })
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
    <TaxonAutocomplete
      selectedTaxa={selectedTaxa}
      onTaxonToggle={handleTaxonToggle}
      changesToSave={changesToSave}
      saveChanges={saveChanges}
      apiResponse={isTaxonArrayValid}
      operation={operation}
    />
  )
}
