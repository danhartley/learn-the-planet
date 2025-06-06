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

  // Initialise inputValue with the existing name when component mounts or name changes
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
            <label htmlFor={name}>Collection name</label>
          </h2>
          <form onBlur={handleSubmit}>
            <div className={`form-row ${type}`}>
              <input
                type="text"
                id={name}
                value={inputValue}
                minLength={minLength}
                onChange={handleInputChange}
                placeholder={
                  isUpdate ? 'Enter new name' : 'Enter collection name'
                }
              />
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
