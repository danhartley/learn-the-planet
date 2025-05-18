import React, { useState, Dispatch, SetStateAction } from 'react'

import { JsonImportForm } from '@/components/common/form/JsonImportForm'
import { validateTraitJson } from '@/validation/trait-validation'
import { ValidationResult, Trait } from '@/types'

type Props = {
  setItems: Dispatch<SetStateAction<Trait[]> | undefined>
}

export function CollectionItemTraitPicker({ setItems }: Props) {
  const [jsonContent, setJsonValue] = useState('')
  const [isValid, setIsValid] = useState(true)
  const [message, setMessage] = useState('')

  const isValidTrait = () => {
    const result: ValidationResult<Trait> = validateTraitJson(jsonContent)
    setIsValid(result.isValid)
    setMessage(result.isValid ? 'Trait is valid' : 'Trait is invalid')

    if (result.isValid && result.parsedData)
      setItems(result.parsedData as Trait[])
    else console.log(result.errors)
  }

  return (
    <section aria-labelledby="trait-entry" className="group-block">
      <h2 id="trait-entry">Trait entry</h2>
      <JsonImportForm
        jsonContent={jsonContent}
        onJsonContentChange={setJsonValue}
        onSubmit={isValidTrait}
        isValid={isValid}
        message={message}
      />
    </section>
  )
}
