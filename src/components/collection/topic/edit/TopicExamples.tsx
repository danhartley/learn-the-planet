import React, { useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { TaxonAutocomplete } from '@/components/collection/taxon/TaxonAutocomplete'

import { Collection, Topic, Taxon } from '@/types'

type Props = {
  collection: Collection<Topic>
  section: Topic
  sectionIndex: number
}

export const TopicExamples = ({ collection, section, sectionIndex }: Props) => {
  const { updateCollectionItem, deleteCollectionItem, apiResponse } =
    useCollection()
  const [selectedTaxa, setSelectedTaxa] = useState<Taxon[]>(
    section?.examples || []
  )

  const handleSaveChanges = (taxaWithDistractors: Taxon[]) => {
    section.examples = taxaWithDistractors || []
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

  const deleteTaxa = () => {
    deleteCollectionItem(collection, section.id)
  }

  return (
    <TaxonAutocomplete
      selectedTaxa={selectedTaxa}
      onTaxonToggle={handleTaxonToggle}
      onSaveChanges={handleSaveChanges}
      apiResponse={apiResponse}
      sectionIndex={sectionIndex}
      deleteTaxa={deleteTaxa}
      section={section as Topic}
      saveText="Save taxa"
    />
  )
}
