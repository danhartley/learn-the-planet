import { useState } from 'react'

import { JsonImportForm } from '@/components/common/form/JsonImportForm'
import { validateTermJson } from '@/validation/term-validation'
import { ValidationResult } from '@/types'

export function CollectionItemTermPicker() {
  const [jsonContent, setJsonValue] = useState('')
  const [isValid, setIsValid] = useState(true)
  const [message, setMessage] = useState('')

  const isValidTerm = () => {
    const result: ValidationResult = validateTermJson(jsonContent)
    setIsValid(result.isValid)
    setMessage(result.isValid ? 'Term is valid' : 'Term is invalid')
    console.log(result.parsedData)
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
