import React, { useState, Dispatch, SetStateAction, useEffect } from 'react'
import { Operation, ContentHandlerType } from '@/types'

type Props = {
  name: string
  setName: Dispatch<SetStateAction<string>>
  operation: Operation
  type: ContentHandlerType
}

export function CollectionName({ operation, name, setName, type }: Props) {
  const [inputValue, setInputValue] = useState('')
  const [minLength] = useState(3)
  const [message, setMessage] = useState('')

  // Initialize inputValue with the existing name when component mounts or name changes
  useEffect(() => {
    if (name && (operation === 'update' || operation === 'create')) {
      setInputValue(name)
    }
  }, [name, operation])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setName(inputValue)
  }

  useEffect(() => {
    if (name.length > minLength) {
      setMessage('Saved')
    } else {
      setMessage('')
    }
  }, [name, minLength])

  let display
  switch (operation) {
    case 'read':
      display = (
        <div>
          Collection name: <span>{name}</span>
        </div>
      )
      break
    case 'create':
    case 'update':
      const isUpdate = operation === 'update'
      display = (
        <>
          <h2 id="collection-name">
            {isUpdate ? 'Update collection name' : 'Collection name'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className={`form-row ${type}`}>
              <label htmlFor="collection">Name</label>
              <input
                type="text"
                id="collection"
                value={inputValue}
                minLength={minLength}
                onChange={handleInputChange}
                placeholder={
                  isUpdate ? 'Enter new name' : 'Enter collection name'
                }
              />
            </div>
            <div className="form-row">
              <button
                type="submit"
                id="submit-name"
                disabled={inputValue.length < minLength}
              >
                {isUpdate ? 'Update Name' : 'Submit'}
              </button>
              <div className="correct">{message}</div>
            </div>
          </form>
        </>
      )
  }

  return (
    <section className="group-block" aria-labelledby="collection-name">
      {display}
    </section>
  )
}
