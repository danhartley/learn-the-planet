'use client'
import React, { useState } from 'react'

import { IdentifierAutocomplete } from '@/components/inat/IdentifierAutocomplete'

import { InatIdentifierType, InatIdentifier } from '@/types'

type Props = {
  setIdentifierFilter: (identifierFilter: InatIdentifier | undefined) => void
  identifierFilter: InatIdentifier | undefined
}

export const IdentifierFilter = ({
  setIdentifierFilter,
  identifierFilter,
}: Props) => {
  const [selectedType, setSelectedType] = useState<InatIdentifierType>('users')

  const handleIdChange = (type: InatIdentifierType) => {
    setSelectedType(type)
  }

  const identifierTypes: InatIdentifierType[] = ['users', 'places', 'projects']

  const options = identifierTypes.map(option => {
    return (
      <li key={option}>
        <input
          name="rb-section-type"
          id={option}
          type="radio"
          value={option}
          checked={option === selectedType}
          onChange={() => handleIdChange(option)}
        />
        <label htmlFor={option}>{option}</label>
      </li>
    )
  })

  return (
    <section className="group-block">
      <fieldset id="inat-id-container">
        <div className="column-group">
          <legend>
            <h2>Filter your search by iNaturalist user, place or project</h2>
          </legend>
          <ul className="horizontal-group">{options}</ul>
          <IdentifierAutocomplete
            type={selectedType}
            setIdentifierFilter={setIdentifierFilter}
            identifierFilter={identifierFilter}
          />
        </div>
      </fieldset>
    </section>
  )
}
