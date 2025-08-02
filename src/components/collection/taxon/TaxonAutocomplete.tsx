import React, { useState, useCallback, useEffect } from 'react'

import Image from 'next/image'

import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import {
  Taxon,
  ApiResponse,
  Topic,
  Trait,
  Term,
  UserLocale,
  ExtendedContentHandlerType,
} from '@/types'

import { debounce } from '@/api/inat/utils'
import { getTaxaByAutocomplete, getTaxaDistractors } from '@/api/inat/api'

import { LocaleSelector } from '@/components/inat/Locale'

interface TaxonAutocompleteProps {
  selectedTaxa: Taxon[]
  onTaxonToggle: (taxon: Taxon) => void
  onSaveChanges?: (taxaWithDistractors: Taxon[]) => void
  changesToSave?: boolean
  saveChanges?: () => void
  apiResponse: ApiResponse
  sectionIndex?: number
  deleteTaxa?: () => void
  section?: Topic | Taxon | Trait | Term
  saveText?: string
}

export const TaxonAutocomplete = ({
  selectedTaxa,
  onTaxonToggle,
  onSaveChanges,
  changesToSave: externalChangesToSave,
  saveChanges: externalSaveChanges,
  apiResponse,
  sectionIndex,
  section,
  saveText = 'Save',
  deleteTaxa,
}: TaxonAutocompleteProps) => {
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState<Taxon[]>([])
  const [internalChangesToSave, setInternalChangesToSave] = useState(false)
  const [locale, setLocale] = useState<UserLocale>({
    code: 'en',
    language: 'English',
  })

  // Use internal state if onSaveChanges is provided, otherwise use external props
  const changesToSave = onSaveChanges
    ? internalChangesToSave
    : externalChangesToSave

  useEffect(() => {
    if (onSaveChanges) {
      setInternalChangesToSave(true)
    }
  }, [selectedTaxa, onSaveChanges])

  // Create debounced search function
  const debouncedSearch = useCallback(
    debounce({
      func: async (...args: unknown[]) => {
        const searchTerm = args[0] as string
        const locale = args[1] as string
        if (searchTerm.trim().length < 2) {
          setSuggestions([])
          return
        }

        try {
          const response = await getTaxaByAutocomplete({
            by: 'taxa',
            toComplete: searchTerm.trim(),
            locale,
          })

          const species = response.results

          setSuggestions(species)
        } catch (error) {
          console.error('Error fetching autocomplete results:', error)
          setSuggestions([])
        }
      },
      wait: 350,
    }),
    []
  )

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    debouncedSearch(value, locale.code)
  }

  // Check if a taxon is already selected
  const isTaxonSelected = (taxon: Taxon) => {
    return selectedTaxa.some(selected => selected.id === taxon.id)
  }

  // Handle checkbox toggle
  const handleTaxonToggle = (taxon: Taxon) => {
    onTaxonToggle(taxon)
  }

  const clearSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setSuggestions([])
    setInputValue('')
  }

  const handleSaveChanges = async () => {
    if (onSaveChanges) {
      // Internal save logic with distractors
      const taxonWithDistractors = await getTaxaDistractors({
        species: selectedTaxa,
      })

      onSaveChanges(taxonWithDistractors)
      setInternalChangesToSave(false)
    } else if (externalSaveChanges) {
      // External save logic
      externalSaveChanges()
    }
  }

  return (
    <section aria-labelledby="inat-taxa-search">
      <div id={section?.id} className="column-group">
        <div className="group">
          <h2 id="inat-taxa-search">
            <label htmlFor={`${sectionIndex}-taxon-search`}>
              Search for Taxa
            </label>
          </h2>
          <div>Search by common or scientific name</div>
        </div>
        <LocaleSelector
          userLocale={locale}
          setUserLocale={setLocale}
          type={'taxon' as unknown as ExtendedContentHandlerType}
        />
        <div>
          You can search by scientific or common name in any language. The
          choice of language applies to the search results.
        </div>
        <form>
          <div className="form-row taxon">
            <input
              id={`${sectionIndex}-taxon-search`}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Start typing name..."
            />
          </div>
          <div className="form-row">
            <button onClick={clearSearch}>Clear search</button>
          </div>
        </form>
      </div>

      {suggestions.length > 0 && (
        <ul className="column-count">
          {suggestions.map(taxon => (
            <li key={taxon.id} className="form-row">
              <input
                type="checkbox"
                id={`taxon-${taxon.id}`}
                checked={isTaxonSelected(taxon)}
                onChange={() => handleTaxonToggle(taxon)}
              />

              <div className="form-row">
                {taxon.image?.squareUrl && (
                  <Image
                    id={taxon.id}
                    src={taxon.image.squareUrl}
                    alt={taxon.vernacularName || taxon.binomial}
                    width={75}
                    height={75}
                  />
                )}

                <label htmlFor={`taxon-${taxon.id}`}>
                  <div>{taxon.vernacularName || 'No common name'}</div>
                  <div>{taxon.binomial}</div>
                  {taxon.rank && <div>{taxon.rank}</div>}
                </label>
              </div>
            </li>
          ))}
        </ul>
      )}

      {selectedTaxa.length > 0 && (
        <section aria-labelledby="selected-taxa" className="column-group">
          <h2 id="selected-taxa">Selected Taxa</h2>
          <ul className="column-count">
            {selectedTaxa.map(taxon => (
              <li key={taxon.id} className="form-row">
                {taxon.image?.squareUrl && (
                  <figure className="inat">
                    <Image
                      id={taxon.id}
                      src={taxon.image.squareUrl}
                      alt={taxon.vernacularName || taxon.binomial}
                      width={75}
                      height={75}
                    />
                  </figure>
                )}
                <button
                  onClick={() => handleTaxonToggle(taxon)}
                  className="remove"
                  disabled={selectedTaxa.length < 2}
                >
                  Remove
                </button>
                <div>
                  <div>{taxon.vernacularName || 'No common name'}</div>
                  <div>{taxon.binomial}</div>
                </div>
              </li>
            ))}
          </ul>
          {
            <div className="form-row">
              <button
                type="button"
                id="edit-section"
                disabled={!changesToSave}
                onClick={handleSaveChanges}
                className="save"
              >
                {saveText}
              </button>
              <button
                type="button"
                id="delete-section"
                onClick={deleteTaxa}
                className="delete"
              >
                Delete taxa
              </button>
              <ApiResponseMessage apiResponse={apiResponse} />
            </div>
          }
        </section>
      )}
    </section>
  )
}
