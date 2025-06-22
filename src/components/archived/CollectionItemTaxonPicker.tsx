import React, { useState, Dispatch, SetStateAction } from 'react'

import { ItemInput } from '@/components/collection/item/ItemInput'
import { validateTaxonJson } from '@/validation/taxon-validation'
import { ValidationResult, Taxon, ApiResponse } from '@/types'

type Props = {
  setItems: Dispatch<SetStateAction<Taxon[]> | undefined>
  items: string
}

export function CollectionItemTaxonPicker({ setItems, items = '' }: Props) {
  const [jsonContent, setJsonContent] = useState(items)
  const [message, setMessage] = useState({
    success: false,
    message: '',
  } as ApiResponse)

  const isValidTaxon = () => {
    const result: ValidationResult<Taxon> = validateTaxonJson(jsonContent)
    const msg = result.isValid
      ? 'Your taxon data are valid'
      : 'Your taxon data are invalid'
    setMessage({ success: result.isValid, message: msg })

    if (result.isValid && result.parsedData)
      setItems(result.parsedData as Taxon[])
    else console.log(result.errors)
  }

  return (
    <section aria-labelledby="collection-taxa" className="group-block">
      <h2 id="collection-taxa">Collection taxa</h2>
      <ItemInput
        jsonContent={jsonContent}
        onJsonContentChange={setJsonContent}
        onSubmit={isValidTaxon}
        message={message}
        type="taxon"
        setMessage={setMessage}
      />
    </section>
  )
}
