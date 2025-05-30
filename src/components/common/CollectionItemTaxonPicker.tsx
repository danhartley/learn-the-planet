import React, { useState, Dispatch, SetStateAction } from 'react'

import { JsonImportForm } from '@/components/common/form/JsonImportForm'
import { validateTaxonJson } from '@/validation/taxon-validation'
import { ValidationResult, Taxon } from '@/types'

type Props = {
  setItems: Dispatch<SetStateAction<Taxon[]> | undefined>
}

export function CollectionItemTaxonPicker({ setItems }: Props) {
  const [jsonContent, setJsonValue] = useState('')
  const [isValid, setIsValid] = useState(true)
  const [message, setMessage] = useState('')

  const isValidTaxon = () => {
    const result: ValidationResult<Taxon> = validateTaxonJson(jsonContent)
    setIsValid(result.isValid)
    setMessage(
      result.isValid
        ? 'Your taxon data are valid'
        : 'Your taxon data are invalid'
    )

    if (result.isValid && result.parsedData)
      setItems(result.parsedData as Taxon[])
    else console.log(result.errors)
  }

  return (
    <section aria-labelledby="collection-taxa" className="group-block">
      <h2 id="collection-taxa">Collection taxa</h2>
      <JsonImportForm
        jsonContent={jsonContent}
        onJsonContentChange={setJsonValue}
        onSubmit={isValidTaxon}
        isValid={isValid}
        message={message}
        type="taxon"
      />
    </section>
  )
}
