import React, { Dispatch, SetStateAction } from 'react'

interface JsonImportFormProps {
  jsonContent: string
  onJsonContentChange: Dispatch<SetStateAction<string>>
  placeholder?: string
  message?: string
  isValid?: boolean
  onSubmit?: () => void
}

export const JsonImportForm: React.FC<JsonImportFormProps> = ({
  jsonContent,
  onJsonContentChange,
  placeholder = 'Paste your JSON here...',
  onSubmit,
  message,
  isValid,
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
          <label htmlFor="json-input">JSON input</label>
          <textarea
            id="json-input"
            value={jsonContent}
            onChange={handleChange}
            placeholder={placeholder}
            rows={20}
            cols={40}
          />
        </div>
        <button id="submit" type="submit">
          Import
        </button>
      </form>
      <div className={isValid ? 'correct' : 'incorrect'}>{message}</div>
    </>
  )
}
