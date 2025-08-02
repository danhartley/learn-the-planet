'use client'
import React, { SetStateAction, Dispatch, useState } from 'react'

import { getCountries } from '@/api/inat/api'

import { Country, ExtendedContentHandlerType } from '@/types'

type Props = {
  country: Country
  setCountry: Dispatch<SetStateAction<Country>>
  className?: ExtendedContentHandlerType
}

export const CountrySelector = ({
  country,
  setCountry,
  className = 'taxon' as unknown as ExtendedContentHandlerType,
}: Props) => {
  const [countries] = useState(getCountries())
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = countries.find(
      country => country.code === e.target.value
    ) as unknown as Country
    setCountry(country)
  }

  return (
    <div className={`form-row ${className}`}>
      <label htmlFor="country-select">Country</label>
      <select id="country-select" value={country.code} onChange={handleChange}>
        {countries.map(country => {
          return (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export const FilterByCountry = ({ country, setCountry }: Props) => {
  return (
    <div className="group-block">
      <fieldset>
        <div className="list-group">
          <h2>Choose the country of species common names</h2>
          <CountrySelector country={country} setCountry={setCountry} />
        </div>
      </fieldset>
    </div>
  )
}
