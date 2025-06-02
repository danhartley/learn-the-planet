import React, { useState, Dispatch, SetStateAction } from 'react'

import { JsonImportForm } from '@/components/common/term-input/JsonImportForm'
import { validateTermJson } from '@/validation/term-validation'
import { ValidationResult, Term } from '@/types'

type Props = {
  setItems: Dispatch<SetStateAction<Term[]> | undefined>
}

export function CollectionItemTermPicker({ setItems }: Props) {
  const [jsonContent, setJsonValue] = useState('')
  const [isValid, setIsValid] = useState(true)
  const [message, setMessage] = useState('')

  const isValidTerm = () => {
    const result: ValidationResult<Term> = validateTermJson(jsonContent)
    setIsValid(result.isValid)
    setMessage(
      result.isValid ? 'Your term data are valid' : 'Your term data are invalid'
    )

    if (result.isValid && result.parsedData)
      setItems(result.parsedData as Term[])
    else console.log(result.errors)
  }

  return (
    <section aria-labelledby="collection-terms" className="group-block">
      <h2 id="collection-terms">Collection terms</h2>
      <JsonImportForm
        jsonContent={jsonContent}
        onJsonContentChange={setJsonValue}
        onSubmit={isValidTerm}
        isValid={isValid}
        message={message}
        type="term"
      />
    </section>
  )
}
