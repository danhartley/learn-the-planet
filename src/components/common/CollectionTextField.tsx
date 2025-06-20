import React, { useState, Dispatch, SetStateAction, useEffect } from 'react'
import { Operation, ContentHandlerType } from '@/types'

type Props = {
  fieldValue: string
  fieldText: string
  setFieldValue: Dispatch<SetStateAction<string>>
  type: ContentHandlerType
  notification?: string
}

export function CollectionTextField({
  fieldValue,
  fieldText,
  setFieldValue,
  type,
  notification,
}: Props) {
  const [inputValue, setInputValue] = useState('')
  const [minLength] = useState(3)

  useEffect(() => {
    // Show existing value in input
    setInputValue(fieldValue)
  }, [fieldValue])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Track state locally
    setInputValue(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    // Notify parent of current state
    e.preventDefault()
    setFieldValue(inputValue)
  }

  return (
    <section aria-labelledby="collection-field">
      <div>
        <h3 id="collection-field">
          <label htmlFor={fieldText}>{`${fieldText}`}</label>
        </h3>
        <form>
          <div className={`form-row ${type}`}>
            <input
              type="text"
              id={fieldText}
              value={inputValue}
              minLength={minLength}
              onChange={handleInputChange}
              onBlur={handleSubmit}
              placeholder={`Enter ${fieldText}`}
            />
          </div>
          {notification && <div>{notification}</div>}
        </form>
      </div>
    </section>
  )
}
