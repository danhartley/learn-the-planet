import React, { Dispatch, SetStateAction } from 'react'
import { ContentHandlerType } from '@/types'

interface JsonImportFormProps {
  jsonContent: string
  onJsonContentChange: Dispatch<SetStateAction<string>>
  placeholder?: string
  message?: string
  isValid?: boolean
  onSubmit?: () => void
  type: ContentHandlerType
}

export const JsonImportForm: React.FC<JsonImportFormProps> = ({
  jsonContent,
  onJsonContentChange,
  placeholder = 'Paste your JSON here...',
  onSubmit,
  message,
  isValid,
  type,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      <form onSubmit={handleSubmit} className="column-group">
        <div className="column-group">
          <label htmlFor="json-input">
            Please paste your {type} JSON object or array in the text area below
          </label>
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
            Import {type} data
          </button>
          <div className={isValid ? 'correct' : 'incorrect'}>{message}</div>
        </div>
      </form>
    </>
  )
}
