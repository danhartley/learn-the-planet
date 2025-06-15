import React, { useState, Dispatch, SetStateAction, useEffect } from 'react'
import { Operation, ContentHandlerType } from '@/types'

type Props = {
  fieldValue: string
  fieldText: string
  setFieldValue: Dispatch<SetStateAction<string>>
  operation: Operation
  type: ContentHandlerType
}

export function CollectionTextField({
  operation,
  fieldValue,
  fieldText,
  setFieldValue,
  type,
}: Props) {
  const [inputValue, setInputValue] = useState('')
  const [minLength] = useState(3)
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [message, setMessage] = useState({
    success: false,
    message: '',
  })

  useEffect(() => {
    if (fieldValue && (operation === 'update' || operation === 'create')) {
      setInputValue(fieldValue)
    }
  }, [fieldValue, operation])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFieldValue(inputValue)
  }

  useEffect(() => {
    const msg = fieldValue.length > minLength ? 'Saved' : ''
    setMessage({
      success: false,
      message: msg,
    })
  }, [fieldValue, minLength])

  let display
  switch (operation) {
    case 'read':
      display = (
        <div>
          Collection name: <span>{fieldValue}</span>
        </div>
      )
      break
    case 'create':
    case 'update':
      const isUpdate = operation === 'update'
      display = (
        <>
          <h2 id="collection-field">
            <label htmlFor={fieldText}>{`${fieldText}`}</label>
          </h2>
          <form onBlur={handleSubmit}>
            <div className={`form-row ${type}`}>
              <input
                type="text"
                id={fieldText}
                value={inputValue}
                minLength={minLength}
                onChange={handleInputChange}
                placeholder={
                  isUpdate
                    ? `Enter new ${fieldText}`
                    : `Enter collection ${fieldText}`
                }
              />
            </div>
          </form>
        </>
      )
  }

  return <section aria-labelledby="collection-field">{display}</section>
}
