'use client'

import { useState } from 'react'

import Image from 'next/image'

import { CollectionProvider } from '@/contexts/CollectionContext'

import { getInatObservations } from '@/api/inat/api'

import { IconicTaxaFilter } from '@/components/inat/IconicTaxonFilter'
import { IdentifierFilter } from '@/components/inat/IdentifierFilter'
import { ObservationDates } from '@/components/inat/ObservationDates'

import { IconicTaxon, InatIdentifier, Taxon } from '@/types'

export default function Page() {
  const [selectedIconicTaxons, setSelectedIconicTaxons] =
    useState<IconicTaxon[]>()
  const [identifierFilter, setIdentifierFilter] = useState<
    InatIdentifier | undefined
  >()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [searchSpecies, setSearchSpecies] = useState<Taxon[]>([])

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

  const search = async () => {
    try {
      // Build the filters object
      const filters: any = {
        iconic_taxa: selectedIconicTaxons,
        d1: startDate || undefined,
        d2: endDate || undefined,
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
      console.log('filters', filters)
      // Call the API
      const species = await getInatObservations(filters)

      setSearchSpecies(species)
      console.log(species)
    } catch (error) {
      console.error('Search failed:', error)
      setSearchSpecies([])
    }
  }

  const handleTaxonToggle = (taxon: Taxon) => {
    console.log(taxon)
  }

  return (
    <CollectionProvider>
      <h2>search iNaturalist</h2>
      <IconicTaxaFilter setSelectedIconicTaxons={setSelectedIconicTaxons} />
      <IdentifierFilter setIdentifierFilter={setIdentifierFilter} />
      <ObservationDates onDateChange={onDateChange} />
      <button onClick={search}>Search</button>
      {searchSpecies.length > 0 && (
        <section aria-labelledby="search-species" className="column-group">
          <h2 id="search-species">Selected Taxa</h2>
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
    </CollectionProvider>
  )
}
