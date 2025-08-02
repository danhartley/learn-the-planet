import React, { Dispatch, SetStateAction } from 'react'

import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { ContentHandlerType, ApiResponse } from '@/types'

interface ItemInputProps {
  jsonContent: string | undefined
  onJsonContentChange: Dispatch<SetStateAction<string>>
  setMessage: Dispatch<SetStateAction<ApiResponse>>
  placeholder?: string
  message: ApiResponse
  onSubmit?: () => void
  type: ContentHandlerType
}

export const ItemInput: React.FC<ItemInputProps> = ({
  jsonContent,
  onJsonContentChange,
  placeholder = 'Paste your JSON here...',
  onSubmit,
  message,
  type,
  setMessage,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage({ success: false, message: '' })
    onJsonContentChange(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit()
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="json-input">
          Please paste your {type.toString()} JSON object or array in the text
          area below.
        </label>
        <div className="form-row">
          <textarea
            id="json-input"
            value={jsonContent}
            onChange={handleChange}
            placeholder={placeholder}
            rows={20}
            cols={40}
          />
        </div>

        <div className="form-row">
          <button id="submit" type="submit">
            Validate {type.toString()} data
          </button>
          <ApiResponseMessage apiResponse={message} />
        </div>
      </form>
    </>
  )
}
