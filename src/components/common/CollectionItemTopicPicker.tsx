import React, { useState, Dispatch, SetStateAction } from 'react'

import { JsonImportForm } from '@/components/common/term-input/JsonImportForm'
import { validateTopicJson } from '@/validation/topic-validation'
import { ValidationResult, Topic } from '@/types'

type Props = {
  setItems: Dispatch<SetStateAction<Topic[]> | undefined>
}

export function CollectionItemTopicPicker({ setItems }: Props) {
  const [jsonContent, setJsonValue] = useState('')
  const [isValid, setIsValid] = useState(true)
  const [message, setMessage] = useState('')

  const isValidTopic = () => {
    const result: ValidationResult<Topic> = validateTopicJson(jsonContent)
    setIsValid(result.isValid)
    setMessage(
      result.isValid
        ? 'Your topic data are valid'
        : 'Your topic data are invalid'
    )

    if (result.isValid && result.parsedData)
      setItems(result.parsedData as Topic[])
    else console.log(result.errors)
  }

  return (
    <section aria-labelledby="collection-text" className="group-block">
      <h2 id="collection-text">Collection text</h2>
      <JsonImportForm
        jsonContent={jsonContent}
        onJsonContentChange={setJsonValue}
        onSubmit={isValidTopic}
        isValid={isValid}
        message={message}
        type="topic"
      />
    </section>
  )
}
