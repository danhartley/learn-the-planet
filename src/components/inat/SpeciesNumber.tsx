'use client'
import React, { SetStateAction, Dispatch } from 'react'

type Props = {
  setSpeciesNumber: Dispatch<SetStateAction<number>>
}

export const SpeciesNumber = ({ setSpeciesNumber }: Props) => {
  return (
    <div className="group-block">
      <fieldset>
        <div className="list-group">
          <h2>Choose how many species you want to review.</h2>
          <div>
            You can select up to 200 but we recommend between 10 and 20.
          </div>
          <div className="form-row inat">
            <label htmlFor="species-input">Number of species</label>
            <input
              id="species-input"
              type="number"
              defaultValue={12}
              onChange={e => setSpeciesNumber(Number(e.target.value))}
            />
          </div>
        </div>
      </fieldset>
    </div>
  )
}
