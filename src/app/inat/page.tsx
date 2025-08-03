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

export default function Page() {
  const router = useRouter()

  const { startTest } = useTestPlanner()

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
  const [locale, setLocale] = useState<UserLocale>({
    code: 'en',
    language: 'English',
  })

  const search = async () => {
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
        locale: locale.code,
      })

      setSearchSpecies(speciesWithDistractors)
    } catch (error) {
      console.error('Search failed:', error)
      setSearchSpecies([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleTaxonToggle = (taxon: Taxon) => {
    setSearchSpecies(prev => {
      return prev?.filter(selected => selected.id !== taxon.id)
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

  return (
    <CollectionProvider>
      <h1>search iNaturalist</h1>
      <IconicTaxaFilter setSelectedIconicTaxons={setSelectedIconicTaxons} />
      <IdentifierFilter setIdentifierFilter={setIdentifierFilter} />
      <ObservationDates onDateChange={onDateChange} />
      <SpeciesNumber setSpeciesNumber={setSpeciesNumber} />
      <Locale userLocale={locale} setUserLocale={setLocale} />
      <button onClick={search} disabled={isSearching}>
        {isSearching ? 'Searching…' : 'Search iNaturalist'}
      </button>
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
          Start test
        </button>
      </div>
    </CollectionProvider>
  )
}
