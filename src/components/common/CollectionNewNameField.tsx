import React, { Dispatch, SetStateAction, useState } from 'react'

import { ContentHandlerType } from '@/types'

type Props = {
  type: ContentHandlerType
  setCollectionName: Dispatch<SetStateAction<string | undefined>>
}

const MIN_NAME_LENGTH = 5

export const CollectionNewNameField = ({ type, setCollectionName }: Props) => {
  const [inputValue, setInputValue] = useState('')
  const [minLength] = useState(MIN_NAME_LENGTH)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.length >= minLength) {
      setCollectionName(inputValue)
    }
  }

  return (
    <section aria-labelledby="collection-field">
      <div>
        <h3 id="collection-field">
          <label htmlFor="new-name">Collection name</label>
        </h3>
        <form>
          <div className={`form-row ${type}`}>
            <input
              type="text"
              id="new-name"
              value={inputValue}
              minLength={minLength}
              onChange={handleInputChange}
              onBlur={handleSubmit}
              placeholder="Enter new collection name"
            />
          </div>
        </form>
      </div>
    </section>
  )
}
