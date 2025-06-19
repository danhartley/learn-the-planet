import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { ContentHandlerType, Collection } from '@/types'

type Props = {
  type: ContentHandlerType
  setCollectionName: Dispatch<SetStateAction<string | undefined>>
  collection: Collection<unknown> | undefined
}

const MIN_NAME_LENGTH = 5

export const CollectionNewNameField = ({
  type,
  setCollectionName,
  collection,
}: Props) => {
  const [inputValue, setInputValue] = useState('')
  const [minLength] = useState(MIN_NAME_LENGTH)
  const [message, setMessage] = useState('Name must be at least 5 letters long')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  useEffect(() => {
    if (collection) {
      setMessage('Collection created')
    }
  }, [collection])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.length >= minLength) {
      setCollectionName(inputValue)
    }
  }

  return (
    <section aria-labelledby="collection-field">
      <h2 id="collection-field">
        <label htmlFor="new-name">Collection name</label>
      </h2>
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
        <div>{message}</div>
      </form>
    </section>
  )
}
