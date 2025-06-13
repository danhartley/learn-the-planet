import React, { useState, Dispatch, SetStateAction } from 'react'

import { ItemInput } from '@/components/common/item-input/ItemInput'
import { validateTraitJson } from '@/validation/trait-validation'
import { ValidationResult, Trait } from '@/types'

type Props = {
  setItems: Dispatch<SetStateAction<Trait[]> | undefined>
  items: string
}

export function CollectionItemTraitPicker({ setItems, items = '' }: Props) {
  const [jsonContent, setJsonValue] = useState(items)
  const [message, setMessage] = useState({
    success: false,
    message: '',
  })

  const isValidTrait = () => {
    const result: ValidationResult<Trait> = validateTraitJson(jsonContent)
    const msg = result.isValid
      ? 'Your trait data are valid'
      : 'Your trait data are invalid'
    setMessage({
      success: result.isValid,
      message: msg,
    })

    if (result.isValid && result.parsedData)
      setItems(result.parsedData as Trait[])
    else console.log(result.errors)
  }

  return (
    <section aria-labelledby="collection-traits" className="group-block">
      <h2 id="collection-traits">Collection traits</h2>
      <ItemInput
        jsonContent={jsonContent}
        onJsonContentChange={setJsonValue}
        onSubmit={isValidTrait}
        message={message}
        type="trait"
        setMessage={setMessage}
      />
    </section>
  )
}
