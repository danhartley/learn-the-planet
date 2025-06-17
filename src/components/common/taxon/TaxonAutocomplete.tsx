import React, { useState, useCallback } from 'react'

import Image from 'next/image'

import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { Taxon, ApiResponse } from '@/types'

import { debounce } from '@/api/inat/utils'
import { getIdByAutocomplete } from '@/api/inat/api'

// Component props
interface TaxonAutocompleteProps {
  selectedTaxa: Taxon[]
  onTaxonToggle: (taxon: Taxon) => void
  changesToSave: boolean
  saveChanges: () => void
  apiResponse: ApiResponse
}

export const TaxonAutocomplete = ({
  selectedTaxa,
  onTaxonToggle,
  changesToSave,
  saveChanges,
  apiResponse,
}: TaxonAutocompleteProps) => {
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState<Taxon[]>([])

  // Create debounced search function
  const debouncedSearch = useCallback(
    debounce({
      func: async (...args: unknown[]) => {
        const searchTerm = args[0] as string
        if (searchTerm.trim().length < 2) {
          setSuggestions([])
          return
        }

        try {
          const response = await getIdByAutocomplete({
            by: 'taxa',
            toComplete: searchTerm.trim(),
          })

          // Transform API response to match our Taxon interface
          const transformedSuggestions =
            response.results?.map(
              //eslint-disable-next-line @typescript-eslint/no-explicit-any
              (item: any) =>
                ({
                  id: item.id.toString(),
                  binomial: item.name,
                  vernacularName:
                    item.preferred_common_name ||
                    item.english_common_name ||
                    '',
                  image: item.default_photo
                    ? {
                        id: item.default_photo.id.toString(),
                        url: item.default_photo.url,
                        squareUrl: item.default_photo.square_url,
                        mediumUrl: item.default_photo.medium_url,
                        attribution: item.default_photo.attribution,
                        attributionName: item.default_photo.attribution_name,
                      }
                    : undefined,
                  rank: item.rank,
                  iconicTaxon: item.iconic_taxon_name,
                }) as Taxon
            ) || []

          setSuggestions(transformedSuggestions)
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
    debouncedSearch(value)
  }

  // Check if a taxon is already selected
  const isTaxonSelected = (taxon: Taxon) => {
    return selectedTaxa.some(selected => selected.id === taxon.id)
  }

  // Handle checkbox toggle
  const handleTaxonToggle = (taxon: Taxon) => {
    onTaxonToggle(taxon)
  }

  return (
    <section aria-labelledby="inat-taxa-search">
      <div className="group-block">
        <div className="group">
          <h2 id="inat-taxa-search">
            <label htmlFor="taxon-search">Search for Taxa</label>
          </h2>
          <div>Search by common or scientific name</div>
        </div>
        <form action="">
          <div className="form-row taxon">
            <input
              id="taxon-search"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Start typing name..."
            />
          </div>
        </form>
      </div>

      {suggestions.length > 0 && (
        <ul className="column-group">
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
        <section aria-labelledby="selected-taxa" className="group-block">
          <h2 id="selected-taxa">Selected Taxa ({selectedTaxa.length})</h2>
          <form>
            {selectedTaxa.map(taxon => (
              <div key={taxon.id} className="form-row">
                {taxon.image?.squareUrl && (
                  <Image
                    id={taxon.id}
                    src={taxon.image.squareUrl}
                    alt={taxon.vernacularName || taxon.binomial}
                    width={75}
                    height={75}
                  />
                )}
                <div>
                  <div>{taxon.vernacularName || 'No common name'}</div>
                  <div>{taxon.binomial}</div>
                </div>
                <button onClick={() => handleTaxonToggle(taxon)}>Remove</button>
              </div>
            ))}
          </form>
          <div className="form-row">
            <button
              type="button"
              id="edit-section"
              disabled={!changesToSave}
              onClick={saveChanges}
            >
              Save changes
            </button>
            <ApiResponseMessage apiResponse={apiResponse} />
          </div>
        </section>
      )}
    </section>
  )
}
