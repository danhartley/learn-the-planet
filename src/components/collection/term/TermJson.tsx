import React, { useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { ItemInput } from '@/components/collection/item/ItemInput'
import { validateTermJson } from '@/validation/term-validation'
import { ValidationResult, Term } from '@/types'

export function TermJson() {
  const { collection, updateCollectionItems } = useCollection()
  const [jsonContent, setJsonContent] = useState<string>('')
  const [message, setMessage] = useState({
    success: false,
    message: '',
  })

  const isValidTerm = () => {
    const result: ValidationResult<Term> = validateTermJson(jsonContent || '')
    const msg = result.isValid
      ? 'Your term data are valid'
      : 'Your term data are invalid'
    setMessage({ success: result.isValid, message: msg })

    if (result.isValid && result.parsedData) {
      if (collection)
        updateCollectionItems(collection, result.parsedData as Term[])
    } else console.log(result.errors)
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
