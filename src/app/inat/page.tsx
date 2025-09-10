'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import Image from 'next/image'

import { CollectionProvider } from '@/contexts/CollectionContext'

import { getInatObservations, getTaxaDistractors } from '@/api/inat/api'

import { useTestPlanner } from '@/hooks/useTestPlanner'

import { IconicTaxaFilter } from '@/components/inat/IconicTaxonFilter'
import { IdentifierFilter } from '@/components/inat/IdentifierFilter'
import { ObservationDates } from '@/components/inat/ObservationDates'
import { SpeciesNumber } from '@/components/inat/SpeciesNumber'
import { Locale } from '@/components/inat/Locale'
import { TaxonAutocomplete } from '@/components/collection/taxon/TaxonAutocomplete'
import { Authentication } from '@/components/inat/Authentication'

import { getShortId } from '@/utils/strings'
import { processCollectionTaxa } from '@/utils/taxa'

import {
  IconicTaxon,
  InatIdentifier,
  Taxon,
  InatObservationFilters,
  Collection,
  ContentHandlerType,
  UserLocale,
} from '@/types'

import { LocaleDefault } from '@/config'

type ActiveGroup = 'search' | 'autocomplete'

export default function Page() {
  const router = useRouter()

  const { startTest } = useTestPlanner()

  // Add state for controlling which group is active
  const [activeGroup, setActiveGroup] = useState<ActiveGroup>('search')

  const [selectedIconicTaxons, setSelectedIconicTaxons] =
    useState<IconicTaxon[]>()
  const [identifierFilter, setIdentifierFilter] = useState<
    InatIdentifier | undefined
  >()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [searchSpecies, setSearchSpecies] = useState<Taxon[]>([])
  const [speciesNumber, setSpeciesNumber] = useState<number>(12)
  const [isSearching, setIsSearching] = useState(false)

  interface DateChangeParams {
    startDate: string | undefined
    endDate: string | undefined
  }

  const onDateChange = (
    startDate: DateChangeParams['startDate'],
    endDate: DateChangeParams['endDate']
  ) => {
    if (startDate) setStartDate(startDate)
    if (endDate) setEndDate(endDate)
  }
  const [locale, setLocale] = useState<UserLocale>(LocaleDefault)
  const [selectedTaxa, setSelectedTaxa] = useState<Taxon[]>([])

  const search = async () => {
    setSearchSpecies([]) // reset selected species
    setIsSearching(true)
    try {
      // Build the filters object
      const filters: InatObservationFilters = {
        iconic_taxa: selectedIconicTaxons,
        d1: startDate || undefined,
        d2: endDate || undefined,
        per_page: speciesNumber,
        locale: locale.code,
      }

      // Add identifier filter based on type
      if (identifierFilter) {
        switch (identifierFilter.id) {
          case 'users':
            filters.user_id = identifierFilter.value
            break
          case 'places':
            filters.place_id = identifierFilter.value
            break
          case 'projects':
            filters.project_id = identifierFilter.value
            break
        }
      }

      const species = await getInatObservations(filters)

      const speciesWithDistractors = await getTaxaDistractors({
        species,
      })

      // Add to existing array (which may already contain manually added taxa)
      setSearchSpecies(prev => {
        const existingIds = new Set(prev.map(taxon => taxon.id))
        const newTaxa = speciesWithDistractors.filter(
          taxon => !existingIds.has(taxon.id)
        )
        return [...prev, ...newTaxa]
      })
    } catch (error) {
      console.error('Search failed:', error)
      setSearchSpecies(selectedTaxa)
    } finally {
      setIsSearching(false)
    }
  }

  const handleTaxonToggle = (taxon: Taxon) => {
    setSearchSpecies(prev => {
      return prev?.filter(selected => selected.id !== taxon.id)
    })
  }

  const handleAutocompleteTaxonToggle = (taxon: Taxon) => {
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

  const handleStartTest = async () => {
    const processed =
      processCollectionTaxa(
        'taxon' as unknown as ContentHandlerType,
        searchSpecies
      ) || []
    const items: Taxon[] = processed.filter(
      (item): item is Taxon =>
        (item as Taxon).id !== undefined &&
        (item as Taxon).binomial !== undefined
    )
    try {
      const collection: Collection<Taxon> = {
        shortId: getShortId(),
        type: 'taxon' as unknown as ContentHandlerType,
        name: 'inaturalist species',
        slug: 'inat-taxa',
        items,
        itemCount: searchSpecies.length,
        sectionOrder: [],
        ownerId: '',
      }
      startTest({ collection })
      router.push('/test')
    } catch (error) {
      console.error('Failed to fetch collection:', error)
    }
  }

  const addTaxaToList = async (species: Taxon[]) => {
    // Only add taxa to searchSpecies if they are not already in the array
    setSearchSpecies(prev => {
      const existingIds = new Set(prev.map(taxon => taxon.id))
      const newTaxa = species.filter(taxon => !existingIds.has(taxon.id))
      return [...prev, ...newTaxa]
    })
  }

  const removeTaxaFromList = () => {
    // Remove any taxa from searchSpecies that are in selectedTaxa
    setSearchSpecies(prev => {
      const selectedIds = new Set(selectedTaxa.map(taxon => taxon.id))
      return prev.filter(taxon => !selectedIds.has(taxon.id))
    })
    // Clear selectedTaxa after removing them from searchSpecies
    setSelectedTaxa([])
  }

  return (
    <CollectionProvider>
      <h1>Search iNaturalist</h1>

      {/* Toggle  */}
      <ul className="horizontal-group">
        <li>
          <input
            id="search"
            type="radio"
            onChange={() => setActiveGroup('search')}
            checked={activeGroup === 'search'}
            name="inat-searches"
          />
          <label htmlFor="search">Search by filters</label>
        </li>
        <li>
          <input
            id="autocomplete"
            type="radio"
            onChange={() => setActiveGroup('autocomplete')}
            checked={activeGroup === 'autocomplete'}
            name="inat-searches"
          />
          <label htmlFor="autocomplete">Add Taxa Manually</label>
        </li>
      </ul>

      {/* Group 1 - Search Filters */}
      {activeGroup === 'search' && (
        <div className="group-block">
          <IconicTaxaFilter setSelectedIconicTaxons={setSelectedIconicTaxons} />
          <IdentifierFilter setIdentifierFilter={setIdentifierFilter} />
          <ObservationDates onDateChange={onDateChange} />
          <SpeciesNumber setSpeciesNumber={setSpeciesNumber} />
          <Locale userLocale={locale} setUserLocale={setLocale} />
          <button onClick={search} disabled={isSearching}>
            {isSearching ? 'Searching…' : 'Search iNaturalist'}
          </button>
        </div>
      )}

      {/* Group 2 - Taxon Autocomplete */}
      {activeGroup === 'autocomplete' && (
        <div className="group-block">
          <TaxonAutocomplete
            selectedTaxa={selectedTaxa}
            onTaxonToggle={handleAutocompleteTaxonToggle}
            sectionIndex={0}
            saveText="Add to list"
            deleteText="Remove from list"
            onSaveChanges={addTaxaToList}
            deleteTaxa={removeTaxaFromList}
          />
        </div>
      )}

      {/* Search results remain visible regardless of active group */}
      {searchSpecies.length > 0 && (
        <section
          aria-labelledby="search-species"
          className="group-block column-group"
        >
          <h2 id="search-species">Selected species</h2>
          <ul className="column-count">
            {searchSpecies.map(taxon => (
              <li key={taxon.id} className="form-row">
                {taxon.image?.squareUrl && (
                  <figure className="inat">
                    <Image
                      id={taxon.id}
                      src={taxon.image.mediumUrl || taxon.image.squareUrl}
                      alt={taxon.vernacularName || taxon.binomial}
                      width={150}
                      height={150}
                      style={{
                        objectFit: 'cover',
                      }}
                    />
                  </figure>
                )}
                <button
                  onClick={() => handleTaxonToggle(taxon)}
                  className="remove"
                  disabled={searchSpecies.length < 2}
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
        </section>
      )}

      <div className="collection-actions">
        <button
          id="start-test"
          onClick={handleStartTest}
          disabled={searchSpecies.length === 0}
        >
          Learn to remember and recognise taxa
        </button>
      </div>

      {/* <Authentication /> */}
    </CollectionProvider>
  )
}
