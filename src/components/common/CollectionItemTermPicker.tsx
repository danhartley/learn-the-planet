import React, { useState, Dispatch, SetStateAction } from 'react'

import { ItemInput } from '@/components/common/item-input/ItemInput'
import { validateTermJson } from '@/validation/term-validation'
import { ValidationResult, Term } from '@/types'

type Props = {
  setItems: Dispatch<SetStateAction<Term[]> | undefined>
  items: string
}

export function CollectionItemTermPicker({ setItems, items = '' }: Props) {
  const [jsonContent, setJsonContent] = useState(items)
  const [message, setMessage] = useState({
    success: false,
    message: '',
  })

  const isValidTerm = () => {
    const result: ValidationResult<Term> = validateTermJson(jsonContent)
    const msg = result.isValid
      ? 'Your term data are valid'
      : 'Your term data are invalid'
    setMessage({ success: result.isValid, message: msg })

    if (result.isValid && result.parsedData)
      setItems(result.parsedData as Term[])
    else console.log(result.errors)
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
    </section>
  )
}
