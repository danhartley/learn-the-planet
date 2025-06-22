import React, { useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { Topic } from '@/types'
import { textToArray, getShortId } from '@/utils/strings'

export const AddToTopicText = () => {
  const { collection, addItem, apiResponse } = useCollection()
  const [text, setText] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const item = {
      id: getShortId(),
      text: textToArray(text) as string[],
    } as Topic

    if (collection) addItem(collection, item)
  }

  return (
    <section aria-labelledby="new-section">
      <h2 id="new-section">Add text</h2>

      <form onSubmit={handleSubmit} className="column-group">
        <div className="column-group">
          <label htmlFor="json-input">Add text here</label>
          <textarea
            id="json-input"
            value={text}
            onChange={handleChange}
            placeholder=""
            rows={10}
          />
        </div>
        <div className="form-row">
          <button id="submit" type="submit">
            Add text
          </button>
          <ApiResponseMessage apiResponse={apiResponse} />
        </div>
      </form>
    </section>
  )
}
