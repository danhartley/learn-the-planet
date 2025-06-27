import React, { useState, useEffect } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { TaxonAutocomplete } from '@/components/collection/taxon/TaxonAutocomplete'

import { Collection, Trait, Taxon } from '@/types'

type Props = {
  collection: Collection<Trait>
  section: Trait
}

export const TraitExamples = ({ collection, section }: Props) => {
  const { updateCollectionItem, apiResponse } = useCollection()
  const [changesToSave, setChangesToSave] = useState(false)
  const [selectedTaxa, setSelectedTaxa] = useState<Taxon[]>(
    section?.examples || []
  )

  useEffect(() => {
    setChangesToSave(true)
  }, [section?.examples])

  const saveChanges = () => {
    section.examples = selectedTaxa || []
    updateCollectionItem(collection, section)
    setSelectedTaxa([])
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
      section={section as Trait}
      saveText={'Update trait taxa'}
    />
  )
}
