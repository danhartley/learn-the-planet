'use client'
import React, { useState } from 'react'

import { IdentifierAutocomplete } from '@/components/inat/IdentifierAutocomplete'

import { InatIdentifierType, InatIdentifier } from '@/types'

type Props = {
  setIdentifierFilter: (identifierFilter: InatIdentifier | undefined) => void
}

export const IdentifierFilter = ({ setIdentifierFilter }: Props) => {
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
        <legend>
          Filter your search by iNaturalist user, place or project.
        </legend>
        <ul className="list-group">{options}</ul>
      </fieldset>
      <IdentifierAutocomplete
        type={selectedType}
        setIdentifierFilter={setIdentifierFilter}
      />
    </section>
  )
}
