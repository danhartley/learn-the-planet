import React, { useState, useEffect } from 'react'

// import { useCollectionOperations } from '@/hooks/useCollectionOperations'
import { useCollection } from '@/contexts/CollectionContext'

import { TaxonAutocomplete } from '@/components/collection/taxon/TaxonAutocomplete'

import { Collection, Topic, Taxon, Operation } from '@/types'

type Props = {
  collection: Collection<Topic>
  section: Topic
  sectionIndex: number
}

export const TopicExamples = ({ collection, section, sectionIndex }: Props) => {
  const { addItem, updateCollectionItem, deleteItem, apiResponse } =
    useCollection()
  const [changesToSave, setChangesToSave] = useState(false)
  const [selectedTaxa, setSelectedTaxa] = useState<Taxon[]>(
    section?.examples || []
  )
  // const { updateCollectionItem, apiResponse } = useCollectionOperations()

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

  const deleteTaxa = () => {
    deleteItem(collection, section.id)
  }

  return (
    <TaxonAutocomplete
      selectedTaxa={selectedTaxa}
      onTaxonToggle={handleTaxonToggle}
      changesToSave={changesToSave}
      saveChanges={saveChanges}
      apiResponse={apiResponse}
      sectionIndex={sectionIndex}
      deleteTaxa={deleteTaxa}
    />
  )
}
