import React, { useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { ItemInput } from '@/components/collection/item/ItemInput'
import { validateTermJson } from '@/validation/term-validation'
import { ValidationResult, Term, ContentHandlerType } from '@/types'
import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { getShortId } from '@/utils/strings'

export function AddRawTerm() {
  const { collection, addCollectionItem, apiResponse } = useCollection()
  const [jsonContent, setJsonContent] = useState('')
  const [message, setMessage] = useState({
    success: false,
    message: '',
  })
  const [items, setItems] = useState<Term[]>()

  const isValidTerm = () => {
    const result: ValidationResult<Term> = validateTermJson(jsonContent)

    if (result.isValid && result.parsedData) {
      const parsedData = Array.isArray(result.parsedData)
        ? result.parsedData
        : [result.parsedData]

      const termCount = parsedData.length
      const msg =
        termCount === 1
          ? 'Your term data is valid'
          : `Your ${termCount} terms are valid`

      setMessage({
        success: true,
        message: msg,
      })
      setItems(parsedData)
    } else {
      const errorMsg = result.errors?.length
        ? `Invalid term data: ${result.errors.join(', ')}`
        : 'Your term data is invalid'

      setMessage({
        success: false,
        message: errorMsg,
      })
      setItems(undefined)
      console.log(result.errors)
    }
  }

  const saveTerms = async () => {
    if (!items || !collection) return

    try {
      // Save each term with a new ID
      for (const item of items) {
        const termToSave = {
          ...item,
          id: getShortId(),
        }
        await addCollectionItem(collection, termToSave)
      }

      // Clear the form after successful save
      setJsonContent('')
      setItems(undefined)
      setMessage({
        success: false,
        message: '',
      })
    } catch (error) {
      console.error('Error saving terms:', error)
      setMessage({
        success: false,
        message: 'Error saving terms. Please try again.',
      })
    }
  }

  const getButtonText = () => {
    if (!items) return 'Save'
    return items.length === 1 ? 'Save Term' : `Save ${items.length} Terms`
  }

  return (
    <section aria-labelledby="collection-terms" className="group-block">
      <h2 id="collection-terms">Collection terms</h2>
      <ItemInput
        jsonContent={jsonContent}
        onJsonContentChange={setJsonContent}
        onSubmit={isValidTerm}
        message={message}
        type={'term' as unknown as ContentHandlerType}
        setMessage={setMessage}
      />

      {/* Preview of terms to be saved */}
      {items && items.length > 0 && (
        <div className="terms-preview">
          <h3>Terms to be saved:</h3>
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <strong>{item.term}</strong>: {item.definition}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="form-row">
        <button
          type="button"
          className="save"
          disabled={!message.success || !items}
          onClick={saveTerms}
        >
          {getButtonText()}
        </button>
        <ApiResponseMessage apiResponse={apiResponse} />
      </div>
    </section>
  )
}
