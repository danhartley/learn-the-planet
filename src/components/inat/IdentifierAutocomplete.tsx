import { useState, useEffect, useCallback } from 'react'
import { getIdByAutocomplete } from '@/api/inat/api'
import {
  InatIdentifier,
  InatIdentifierType,
  InatIdentifierDetails,
} from '@/types'

type Props = {
  type: InatIdentifierType
  setIdentifierFilter: (identifierFilter: InatIdentifier | undefined) => void
  identifierFilter: InatIdentifier | undefined
}

export const IdentifierAutocomplete = ({
  type,
  setIdentifierFilter,
  identifierFilter,
}: Props) => {
  const [query, setQuery] = useState(identifierFilter?.value || '')
  const [results, setResults] = useState<InatIdentifierDetails[]>([])
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    const newValue = identifierFilter?.value || ''
    if (newValue !== query) {
      setQuery(newValue)
    }
  }, [identifierFilter, query])

  // Debounced search function
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout
      return (searchQuery: string) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(async () => {
          if (searchQuery.trim()) {
            try {
              const searchResults = await getIdByAutocomplete({
                by: type,
                toComplete: searchQuery,
              })
              setResults(searchResults || [])
              setShowResults(true)
            } catch (error) {
              console.error('Search failed:', error)
              setResults([])
              setShowResults(false)
            }
          } else {
            setResults([])
            setShowResults(false)
          }
        }, 350)
      }
    })(),
    [type]
  )

  useEffect(() => {
    debouncedSearch(query)
  }, [query, debouncedSearch])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleResultClick = (result: InatIdentifierDetails) => {
    setQuery(result.login || result.name || result.title || '') // user, place or project
    setShowResults(false)
    setIdentifierFilter({
      id: type,
      value: result.id,
    })
  }

  const handleClear = () => {
    setQuery('')
    setResults([])
    setShowResults(false)
    setIdentifierFilter(undefined)
  }

  return (
    <>
      <div className="list-group">
        <h3>
          <label htmlFor="inat-identifier-search">Search</label>
        </h3>
        <div className="form-row inat">
          <input
            id="inat-identifier-search"
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={`Search for ${type}...`}
          />
        </div>
      </div>
      <button onClick={handleClear}>Clear</button>

      {showResults && results.length > 0 && (
        <ul className="column-count">
          {results.map(result => (
            <li key={result.id} className="form-row">
              <button
                onClick={() => handleResultClick(result)}
                className="option"
              >
                {result.login || result.name || result.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
