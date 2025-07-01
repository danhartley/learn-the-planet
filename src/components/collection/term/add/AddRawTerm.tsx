import React, { useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { ItemInput } from '@/components/collection/item/ItemInput'
import { validateTermJson } from '@/validation/term-validation'
import { ValidationResult, Term } from '@/types'
import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { getShortId } from '@/utils/strings'

export function AddRawTerm() {
  const { collection, addCollectionItem, apiResponse } = useCollection()
  const [jsonContent, setJsonContent] = useState('')
  const [message, setMessage] = useState({
    success: false,
    message: '',
  })
  const [item, setItems] = useState<Term[] | undefined>()

  const isValidTerm = () => {
    const result: ValidationResult<Term> = validateTermJson(jsonContent)
    const msg = result.isValid
      ? 'Your term data are valid'
      : 'Your term data are invalid'
    setMessage({
      success: result.isValid,
      message: msg,
    })

    if (result.isValid && result.parsedData) {
      const parsedData = Array.isArray(result.parsedData)
        ? result.parsedData
        : [result.parsedData]
      setItems(parsedData)
    } else {
      console.log(result.errors)
    }
  }

  const saveTerm = () => {
    const term = {
      ...(item?.find(i => i) || {}),
      id: getShortId(),
    }
    if (collection) addCollectionItem(collection, term)
  }

  return (
    <section aria-labelledby="collection-terms" className="group-block">
      <h2 id="collection-terms">Collection terms</h2>
      <ItemInput
        jsonContent={jsonContent}
        onJsonContentChange={setJsonContent}
        onSubmit={isValidTerm}
        message={message}
        type="term"
        setMessage={setMessage}
      />
      <div className="form-row">
        <button
          type="button"
          className="save"
          disabled={!message.success}
          onClick={saveTerm}
        >
          Save
        </button>
        <ApiResponseMessage apiResponse={apiResponse} />
      </div>
    </section>
  )
}
