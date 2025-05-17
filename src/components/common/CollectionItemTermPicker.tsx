import React, { useState, Dispatch, SetStateAction } from 'react'

import { JsonImportForm } from '@/components/common/form/JsonImportForm'
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
    setMessage(result.isValid ? 'Term is valid' : 'Term is invalid')

    if (result.isValid && result.parsedData)
      setItems(result.parsedData as Term[])
  }

  return (
    <section aria-labelledby="term-entry" className="group-block">
      <h2 id="term-entry">Term entry</h2>
      <JsonImportForm
        jsonContent={jsonContent}
        onJsonContentChange={setJsonValue}
        onSubmit={isValidTerm}
        isValid={isValid}
        message={message}
      />
    </section>
  )
}
