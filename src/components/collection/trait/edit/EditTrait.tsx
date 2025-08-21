import React, { useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { TaxonAutocomplete } from '@/components/collection/taxon/TaxonAutocomplete'
import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { Trait, Taxon } from '@/types'

interface EditTraitProps {
  trait: Trait
}

export const EditTrait: React.FC<EditTraitProps> = ({ trait }) => {
  const {
    collection,
    updateCollectionItem,
    deleteCollectionItem,
    apiResponse,
  } = useCollection()

  const [traitValue, setTraitValue] = useState(trait.trait)
  const [definition, setDefinition] = useState(trait.definition)
  const [sourceName, setSourceName] = useState(trait.source?.name || '')
  const [sourceUrl, setSourceUrl] = useState(trait.source?.url || '')
  const [morphology, setMorphology] = useState(
    trait.morphology ? trait.morphology.join('\n') : ''
  )
  const [phenology, setPhenology] = useState(
    trait.phenology ? trait.phenology.join('\n') : ''
  )
  const [examples] = useState(trait.examples)
  const [selectedTaxa, setSelectedTaxa] = useState<Taxon[]>(
    trait.examples || []
  )

  const handleTaxonToggle = (taxon: Taxon) => {
    setSelectedTaxa(prev => {
      const isSelected = prev?.some(selected => selected.id === taxon.id)

      if (isSelected) {
        // Remove taxon
        return prev?.filter(selected => selected.id !== taxon.id)
      } else {
        // Add taxon
        return [...(prev || []), taxon]
      }
    })
  }

  const handleTraitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTraitValue(e.target.value)
  }

  const handleDefinitionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDefinition(e.target.value)
  }

  const handleSourceNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSourceName(e.target.value)
  }

  const handleSourceUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSourceUrl(e.target.value)
  }

  const handleMorphologyChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMorphology(e.target.value)
  }

  const handlePhenologyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPhenology(e.target.value)
  }

  const handleSave = () => {
    if (!traitValue.trim() || !definition.trim()) {
      return // Don't save if required fields are empty
    }

    // Convert textarea content to arrays, filtering out empty paragraphs
    const morphologyArray = morphology.trim()
      ? morphology
          .split('\n')
          .map(p => p.trim())
          .filter(p => p.length > 0)
      : undefined

    const phenologyArray = phenology.trim()
      ? phenology
          .split('\n')
          .map(p => p.trim())
          .filter(p => p.length > 0)
      : undefined

    // Handle source object - only include if at least one field has content
    const sourceObject =
      sourceName.trim() || sourceUrl.trim()
        ? {
            ...(sourceName.trim() && { name: sourceName.trim() }),
            ...(sourceUrl.trim() && { url: sourceUrl.trim() }),
          }
        : undefined

    const updatedTrait: Trait = {
      ...trait,
      trait: traitValue.trim(),
      definition: definition.trim(),
      ...(sourceObject && { source: sourceObject }),
      ...(morphologyArray && { morphology: morphologyArray }),
      ...(phenologyArray && { phenology: phenologyArray }),
      examples: selectedTaxa,
    }

    // Remove source, morphology, phenology if they're empty
    if (!sourceObject) {
      delete updatedTrait.source
    }
    if (!morphologyArray) {
      delete updatedTrait.morphology
    }
    if (!phenologyArray) {
      delete updatedTrait.phenology
    }

    if (collection) {
      updateCollectionItem(collection, updatedTrait)
    }
  }

  const handleDelete = () => {
    if (
      collection &&
      confirm(`Are you sure you want to delete the trait "${trait.trait}"?`)
    ) {
      deleteCollectionItem(collection, trait.id)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleSave()
    }
    if (e.key === 'Escape') {
      e.preventDefault()
    }
  }

  const isFormValid = traitValue.trim() && definition.trim()

  const handleSaveChanges = (taxaWithDistractors: Taxon[]) => {
    setSelectedTaxa(taxaWithDistractors)
    // Also save trait also when saving taxa
    handleSave()
  }

  return (
    <div id={trait.id} className="group-block">
      <section
        aria-labelledby={`${trait.id}-trait`}
        className="collection-field"
      >
        <h3 id={`${trait.id}-trait`}>
          <label htmlFor={`trait-input-${trait.id}`}>Trait *</label>
        </h3>
        <div className="form-row trait">
          <input
            id={`trait-input-${trait.id}`}
            type="text"
            value={traitValue}
            onChange={handleTraitChange}
            onKeyDown={handleKeyPress}
            placeholder="Enter the trait"
            required
          />
        </div>
      </section>
      <section
        aria-labelledby={`${trait.id}-definition`}
        className="collection-field"
      >
        <h3 id={`${trait.id}-definition`}>
          <label htmlFor={`definition-input-${trait.id}`}>Definition *</label>
        </h3>
        <div className="form-row trait">
          <textarea
            id={`definition-input-${trait.id}`}
            value={definition}
            onChange={handleDefinitionChange}
            onKeyDown={handleKeyPress}
            placeholder="Enter the definition"
            rows={4}
            required
          />
        </div>
      </section>
      <section
        aria-labelledby={`${trait.id}-source-name`}
        className="collection-field"
      >
        <h3 id={`${trait.id}-source-name`}>
          <label htmlFor={`source-name-input-${trait.id}`}>Source Name</label>
        </h3>
        <div className="form-row trait">
          <input
            id={`source-name-input-${trait.id}`}
            type="text"
            value={sourceName}
            onChange={handleSourceNameChange}
            onKeyDown={handleKeyPress}
            placeholder="e.g., Wikipedia (optional)"
          />
        </div>
      </section>
      <section
        aria-labelledby={`${trait.id}-source-url`}
        className="collection-field"
      >
        <h3 id={`${trait.id}-source-url`}>
          <label htmlFor={`source-url-input-${trait.id}`}>Source URL</label>
        </h3>
        <div className="form-row trait">
          <input
            id={`source-url-input-${trait.id}`}
            type="url"
            value={sourceUrl}
            onChange={handleSourceUrlChange}
            onKeyDown={handleKeyPress}
            placeholder="https://example.com (optional)"
          />
        </div>
      </section>
      <h2>Biological Aspects</h2>
      <section
        aria-labelledby={`${trait.id}-morphology`}
        className="collection-field"
      >
        <h3 id={`${trait.id}-morphology`}>
          <label htmlFor={`morphology-input-${trait.id}`}>Morphology</label>
        </h3>
        <div className="form-row trait">
          <textarea
            id={`morphology-input-${trait.id}`}
            value={morphology}
            onChange={handleMorphologyChange}
            onKeyDown={handleKeyPress}
            placeholder="Enter morphological aspects, separate paragraphs with double line breaks (optional)"
            rows={4}
          />
        </div>
      </section>
      <section
        aria-labelledby={`${trait.id}-phenology`}
        className="collection-field"
      >
        <h3 id={`${trait.id}-phenology`}>
          <label htmlFor={`phenology-input-${trait.id}`}>Phenology</label>
        </h3>
        <div className="form-row trait">
          <textarea
            id={`phenology-input-${trait.id}`}
            value={phenology}
            onChange={handlePhenologyChange}
            onKeyDown={handleKeyPress}
            placeholder="Enter phenological aspects, separate paragraphs with double line breaks (optional)"
            rows={4}
          />
        </div>
      </section>
      <section></section>
      {examples && (
        <TaxonAutocomplete
          selectedTaxa={selectedTaxa}
          onTaxonToggle={handleTaxonToggle}
          onSaveChanges={handleSaveChanges}
          apiResponse={apiResponse}
          sectionIndex={1}
        />
      )}
      <hr />
      <div className="form-row">
        <button
          type="button"
          onClick={handleSave}
          disabled={!isFormValid}
          className="save"
        >
          Save trait changes
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="delete"
          aria-label={`Delete trait: ${trait.trait}`}
        >
          Delete trait
        </button>
        <ApiResponseMessage apiResponse={apiResponse} />
      </div>
    </div>
  )
}
