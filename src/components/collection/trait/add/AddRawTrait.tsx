import React, { useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { ItemInput } from '@/components/collection/item/ItemInput'
import { validateTraitJson } from '@/validation/trait-validation'
import { ValidationResult, Trait, ContentHandlerType } from '@/types'
import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { getShortId } from '@/utils/strings'

export function AddRawTrait() {
  const { collection, addCollectionItem, apiResponse } = useCollection()
  const [jsonContent, setJsonContent] = useState('')
  const [message, setMessage] = useState({
    success: false,
    message: '',
  })
  const [items, setItems] = useState<Trait[] | undefined>()

  const isValidTrait = () => {
    const result: ValidationResult<Trait> = validateTraitJson(jsonContent)
    const msg = result.isValid
      ? 'Your trait data are valid'
      : 'Your trait data are invalid'
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

  const saveTrait = async () => {
    if (!items || !collection) return

    // Save each term with a new ID
    for (const item of items) {
      const traitToSave = {
        ...item,
        id: getShortId(),
      }
      await addCollectionItem(collection, traitToSave)
    }
  }

  return (
    <section aria-labelledby="collection-traits" className="group-block">
      <h2 id="collection-traits">Collection traits</h2>
      <ItemInput
        jsonContent={jsonContent}
        onJsonContentChange={setJsonContent}
        onSubmit={isValidTrait}
        message={message}
        type={'trait' as unknown as ContentHandlerType}
        setMessage={setMessage}
      />
      <div className="form-row">
        <button
          type="button"
          className="save"
          disabled={!message.success}
          onClick={saveTrait}
        >
          Save
        </button>
        <ApiResponseMessage apiResponse={apiResponse} />
      </div>
    </section>
  )
}
