import { useState } from 'react'

import React, { Dispatch, SetStateAction } from 'react'

import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { ApiResponse } from '@/types'
import { textToArray } from '@/utils/strings'

type Props = {
  setItems: Dispatch<SetStateAction<unknown[] | undefined>>
  apiResponse: ApiResponse
}

export const AddTextSection = ({ setItems, apiResponse }: Props) => {
  const [text, setText] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setItems(textToArray(text))
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
