import React, { useState, Dispatch, SetStateAction, useEffect } from 'react'

import { hyphenateText } from '@/utils/strings'

import { ContentHandlerType } from '@/types'

type Props = {
  fieldValue: string
  fieldText: string
  setFieldValue: Dispatch<SetStateAction<string>>
  type: ContentHandlerType
  information?: string
  required?: boolean
  sectionIndex?: number
}

export function CollectionTextField({
  fieldValue,
  fieldText,
  setFieldValue,
  type,
  information,
  required = false,
  sectionIndex,
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
    <section
      aria-labelledby={hyphenateText(`${fieldText}-${sectionIndex}-section`)}
      className="collection-field"
    >
      <div className="list-group">
        <h3 id={hyphenateText(`${fieldText}-${sectionIndex}-section`)}>
          <label
            htmlFor={hyphenateText(
              `${fieldText}-${sectionIndex}-${fieldValue}`
            )}
          >
            {fieldText}
          </label>
          <span>{required ? ' *' : ' (optional)'}</span>
        </h3>

        <div className={`form-row ${type}`}>
          <input
            type="text"
            id={hyphenateText(`${fieldText}-${sectionIndex}-${fieldValue}`)}
            value={inputValue}
            minLength={minLength}
            onChange={handleInputChange}
            onBlur={handleSubmit}
            placeholder={`Enter ${fieldText}`}
          />
        </div>
        <div className="information">{information && `[${information}]`}</div>
      </div>
    </section>
  )
}
