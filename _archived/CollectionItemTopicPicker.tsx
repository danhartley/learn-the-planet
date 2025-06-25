import React, { useState, Dispatch, SetStateAction } from 'react'

import { ItemInput } from '@/components/collection/item/ItemInput'
import { validateTopicJson } from '@/validation/topic-validation'
import { ValidationResult, Topic, ApiResponse } from '@/types'

type Props = {
  setItems: Dispatch<SetStateAction<Topic[]> | undefined>
  items: string
}

export function CollectionItemTopicPicker({ setItems, items = '' }: Props) {
  const [jsonContent, setJsonContent] = useState(items)
  const [message, setMessage] = useState({
    success: false,
    message: '',
  } as ApiResponse)

  const isValidTopic = () => {
    const result: ValidationResult<Topic> = validateTopicJson(jsonContent)
    const msg = result.isValid
      ? 'Your topic data are valid'
      : 'Your topic data are invalid'
    setMessage({ success: result.isValid, message: msg })

    if (result.isValid && result.parsedData)
      setItems(result.parsedData as Topic[])
    else console.log(result.errors)
  }

  return (
    <section aria-labelledby="collection-text" className="group-block">
      <h2 id="collection-text">Collection text</h2>
      <ItemInput
        jsonContent={jsonContent}
        onJsonContentChange={setJsonContent}
        onSubmit={isValidTopic}
        message={message}
        type="topic"
        setMessage={setMessage}
      />
    </section>
  )
}
