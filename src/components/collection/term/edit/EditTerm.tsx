import React, { useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { Term } from '@/types'

interface EditTermProps {
  term: Term
  onCancel: () => void
  onSave: () => void
  onDelete: () => void
}

export const EditTerm: React.FC<EditTermProps> = ({
  term,
  onCancel,
  onSave,
  onDelete,
}) => {
  const { collection, updateCollectionItem, deleteItem, apiResponse } =
    useCollection()

  const [termValue, setTermValue] = useState(term.term)
  const [definition, setDefinition] = useState(term.definition)
  const [source, setSource] = useState(term.source || '')
  const [example, setExample] = useState(term.example || '')

  const handleTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermValue(e.target.value)
  }

  const handleDefinitionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDefinition(e.target.value)
  }

  const handleSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSource(e.target.value)
  }

  const handleExampleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setExample(e.target.value)
  }

  const handleSave = () => {
    if (!termValue.trim() || !definition.trim()) {
      return // Don't save if required fields are empty
    }

    const updatedTerm: Term = {
      ...term,
      term: termValue.trim(),
      definition: definition.trim(),
      ...(source.trim() ? { source: source.trim() } : { source: undefined }),
      ...(example.trim()
        ? { example: example.trim() }
        : { example: undefined }),
    }

    if (collection) {
      updateCollectionItem(collection, updatedTerm)
      onSave()
    }
  }

  const handleDelete = () => {
    if (
      collection &&
      confirm(`Are you sure you want to delete the term "${term.term}"?`)
    ) {
      deleteItem(collection, term.id)
      onDelete()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleSave()
    }
    if (e.key === 'Escape') {
      e.preventDefault()
      onCancel()
    }
  }

  const isFormValid = termValue.trim() && definition.trim()

  return (
    <div className="column-group">
      <section aria-labelledby={`${term.id}-term`} className="collection-field">
        <h3 id={`${term.id}-term`}>
          <label htmlFor={`term-input-${term.id}`}>Term *</label>
        </h3>
        <div className="form-row term">
          <input
            id={`term-input-${term.id}`}
            type="text"
            value={termValue}
            onChange={handleTermChange}
            onKeyDown={handleKeyPress}
            placeholder="Enter the term"
            required
          />
        </div>
      </section>

      <section
        aria-labelledby={`${term.id}-definition`}
        className="collection-field"
      >
        <h3 id={`${term.id}-definition`}>
          <label htmlFor={`definition-input-${term.id}`}>Definition *</label>
        </h3>
        <div className="form-row term">
          <textarea
            id={`definition-input-${term.id}`}
            value={definition}
            onChange={handleDefinitionChange}
            onKeyDown={handleKeyPress}
            placeholder="Enter the definition"
            rows={4}
            required
          />
        </div>
      </section>

      <section
        aria-labelledby={`${term.id}-source`}
        className="collection-field"
      >
        <h3 id={`${term.id}-source`}>
          <label htmlFor={`source-input-${term.id}`}>Source</label>
        </h3>
        <div className="form-row term">
          <input
            id={`source-input-${term.id}`}
            type="url"
            value={source}
            onChange={handleSourceChange}
            onKeyDown={handleKeyPress}
            placeholder="https://example.com (optional)"
          />
        </div>
      </section>

      <section
        aria-labelledby={`${term.id}-example`}
        className="collection-field"
      >
        <h3 id={`${term.id}-example`}>
          <label htmlFor={`example-input-${term.id}`}>Example</label>
        </h3>
        <div className="form-row term">
          <textarea
            id={`example-input-${term.id}`}
            value={example}
            onChange={handleExampleChange}
            onKeyDown={handleKeyPress}
            placeholder="Provide an example (optional)"
            rows={3}
          />
        </div>
      </section>

      <div className="form-row">
        <button type="button" onClick={handleSave} disabled={!isFormValid}>
          Save
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="delete-button"
          aria-label={`Delete term: ${term.term}`}
        >
          Delete
        </button>
        <ApiResponseMessage apiResponse={apiResponse} />
      </div>
    </div>
  )
}
