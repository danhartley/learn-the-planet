'use client'

import { useState, useEffect } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { useCollection } from '@/contexts/CollectionContext'

import { FilterByContentType } from '@/components/collection/search/FilterByContentType'
import { FilterByOwnerId } from '@/components/collection/search/FilterByOwnerId'
import { LocaleSelector } from '@/components/inat/Locale'
import { CountrySelector } from '@/components/collection/search/FilterByCountry'
import { FilterByDate } from '@/components/collection/search/FilterByDate'

import {
  CollectionFilters,
  CollectionSummary,
  UserLocale,
  Country,
  ContentHandlerType,
} from '@/types'

import { CountryDefault, LocaleDefault } from '@/config'

export const Filters = () => {
  const { getFilteredCollectionSummaries } = useCollection()
  const [type, setType] = useState<ContentHandlerType>(
    'topic' as unknown as ContentHandlerType
  )
  const [ownerId, setOwnerId] = useState<string | undefined>()
  const [showOnlyByOwner, setShowOnlyByOwner] = useState(false)
  const [locale, setLocale] = useState<UserLocale>(LocaleDefault)
  const [country, setCountry] = useState<Country>(CountryDefault)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [summaries, setSummaries] = useState<CollectionSummary[]>()

  useEffect(() => {
    console.log(type)
  }, [type])

  const search = async () => {
    setIsSearching(true)
    try {
      const filters: CollectionFilters = {
        type,
        status: 'public',
        locale: locale.code,
        country: country.code,
      }

      if (showOnlyByOwner) {
        filters.ownerId = ownerId
      }

      if (startDate) {
        filters.updatedAt = {
          start: new Date(startDate + 'T00:00:00.000Z'),
          end: endDate ? new Date(endDate + 'T23:59:59.999Z') : new Date(),
        }
      }

      const collections = await getFilteredCollectionSummaries(filters)
      if (collections) {
        setSummaries(collections)
      }
    } finally {
      setIsSearching(false)
    }
  }

  const summaryList = summaries?.map(summary => (
    <div key={summary.shortId} className="collection-summary">
      <div className="form-row">
        {summary.imageUrl && (
          <Link href={`/collection/${summary.slug}-${summary.shortId}`}>
            <Image
              src={summary.imageUrl || ''}
              alt={summary.name}
              width={75}
              height={75}
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'cover',
              }}
            />
          </Link>
        )}
        <div>
          <div>{summary.name}</div>
          <div>Items: {summary.itemCount}</div>
        </div>
      </div>
    </div>
  ))

  return (
    <>
      <h1>Collection search</h1>
      <FilterByContentType type={type} setType={setType} />
      <FilterByOwnerId
        ownerId={ownerId}
        setOwnerId={setOwnerId}
        setShowOnlyByOwner={setShowOnlyByOwner}
      />
      <LocaleSelector
        userLocale={locale}
        setUserLocale={setLocale}
        type={type}
      />
      <CountrySelector country={country} setCountry={setCountry} type={type} />
      <FilterByDate
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        type={type}
      />
      <button onClick={search} disabled={isSearching}>
        {isSearching ? 'Searching…' : 'Search collections'}
      </button>
      <hr />
      {summaryList && summaryList?.length > 0 ? (
        <ul>{summaryList}</ul>
      ) : (
        <div className="group-block bg-incorrect-light">
          <div>Your filters matched no collections.</div>
        </div>
      )}
    </>
  )
}
