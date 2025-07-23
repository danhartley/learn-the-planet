import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'

import { CollectionTextField } from '@/components/common/CollectionTextField'

type Props = {
  id: string
  text: string[] | undefined
  topic: string | undefined
  setSectionText: Dispatch<SetStateAction<string[] | undefined>>
  setTopic: Dispatch<SetStateAction<string>>
}

export const TopicText = ({
  id,
  text,
  topic,
  setSectionText,
  setTopic,
}: Props) => {
  const [paras, setParas] = useState<string>('')

  function textToArray(text: string): string[] {
    return text
      .split(/\n\s*\n/) // Split on one or more newlines with optional whitespace
      .map(paragraph => paragraph.replace(/^\s+|\s+$/g, '')) // Only trim leading/trailing whitespace, preserve internal spaces
      .filter(paragraph => paragraph.length > 0 || paragraph.trim() === '') // Keep paragraphs that are either non-empty or contain only whitespace
  }

  useEffect(() => {
    setParas(text?.join('\n\n') || '')
  }, [text])

  // Handle real-time textarea changes
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedText = e.target.value
    setParas(updatedText)
  }

  // Handle when user finishes editing (blur event)
  const handleTextareaBlur = () => {
    // Only apply textToArray logic when user finishes editing
    setSectionText(textToArray(paras))
  }

  return (
    !!text && (
      <form key={id}>
        <h2>
          <label htmlFor={`text-${id}`}>Edit Text</label>
        </h2>
        <div className="group-block">
          <CollectionTextField
            fieldValue={topic || ''}
            setFieldValue={setTopic}
            fieldText="Text header"
            type={'topic'}
            sectionIndex={1}
            required={false}
          />
        </div>
        <div className="group-block">
          <div className="list-group">
            <h3>Text</h3>
            <div className="form-row topic">
              <textarea
                id={`text-${id}`}
                value={paras}
                onChange={handleTextareaChange}
                onBlur={handleTextareaBlur}
                cols={40}
                rows={10}
              />
            </div>
          </div>
        </div>
      </form>
    )
  )
}
