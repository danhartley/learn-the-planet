import React, { useState, useCallback } from 'react'

import { Taxon } from '@/types'

import { debounce } from '@/api/inat/utils'
import { getIdByAutocomplete } from '@/api/inat/api'

// Component props
interface TaxonAutocompleteProps {
  selectedTaxa: Taxon[]
  onTaxonToggle: (taxon: Taxon) => void
}

export const TaxonAutocomplete = ({
  selectedTaxa,
  onTaxonToggle,
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
            response.results?.map((item: any) => ({
              id: item.id,
              name: item.name,
              binomial: item.name,
              vernacularName:
                item.preferred_common_name || item.english_common_name || '',
              image: item.default_photo
                ? {
                    id: item.default_photo.id,
                    url: item.default_photo.url,
                    squareUrl: item.default_photo.square_url,
                    mediumUrl: item.default_photo.medium_url,
                    attribution: item.default_photo.attribution,
                    attributionName: item.default_photo.attribution_name,
                  }
                : undefined,
              rank: item.rank,
              iconicTaxon: item.iconic_taxon_name,
            })) || []

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
        <h2 id="inat-taxa-search">
          <label htmlFor="taxon-search">Search for Taxa</label>
        </h2>
        <form action="">
          <div className="form-row taxon">
            <input
              id="taxon-search"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Start typing taxon name..."
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
                  <img
                    src={taxon.image.squareUrl}
                    alt={taxon.vernacularName || taxon.binomial}
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
        <div>
          <h3>Selected Taxa ({selectedTaxa.length})</h3>
          <div>
            {selectedTaxa.map(taxon => (
              <div key={taxon.id}>
                {taxon.image?.squareUrl && (
                  <img
                    src={taxon.image.squareUrl}
                    alt={taxon.vernacularName || taxon.binomial}
                  />
                )}
                <div>
                  <div>{taxon.vernacularName || 'No common name'}</div>
                  <div>{taxon.binomial}</div>
                </div>
                <button onClick={() => handleTaxonToggle(taxon)}>×</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
