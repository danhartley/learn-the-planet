import React, { useEffect, useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { Term } from '@/types'
import { getShortId } from '@/utils/strings'

export const AddTerm = () => {
  const { collection, addCollectionItem, apiResponse } = useCollection()
  const [term, setTerm] = useState('')
  const [definition, setDefinition] = useState('')
  const [source, setSource] = useState('')
  const [example, setExample] = useState('')
  const [lastTermId, setLastTermId] = useState(
    collection?.items?.findLast(item => (item as Term).id)
  )

  const handleTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value)
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

  const saveTerm = () => {
    if (!term.trim() || !definition.trim()) {
      return // Don't save if required fields are empty
    }

    const item: Term = {
      id: getShortId(),
      term: term.trim(),
      definition: definition.trim(),
      ...(source.trim() && { source: source.trim() }),
      ...(example.trim() && { example: example.trim() }),
    }

    if (collection) {
      addCollectionItem(collection, item)
      // Clear form after successful save
      setTerm('')
      setDefinition('')
      setSource('')
      setExample('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      saveTerm()
    }
  }

  useEffect(() => {
    setLastTermId(collection?.items?.findLast(item => (item as Term).id))
  }, [collection?.items])

  useEffect(() => {
    if (!collection) return
    const item = collection.items
      ? collection.items[collection.itemCount - 1]
      : undefined
    if (item) {
      const itemId = (item as Term)?.id || undefined
      if (itemId)
        document.getElementById(itemId)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        })
    }
  }, [collection, lastTermId])

  const isFormValid = term.trim() && definition.trim()

  return (
    <div className="column-group">
      <h2 id="new-term">Add Term</h2>

      <section aria-labelledby="term" className="collection-field">
        <h3 id="term">
          <label htmlFor="term-input">Term *</label>
        </h3>
        <div className="form-row term">
          <input
            id="term-input"
            type="text"
            value={term}
            onChange={handleTermChange}
            onKeyDown={handleKeyPress}
            placeholder="Enter the term"
            required
          />
        </div>
      </section>

      <section aria-labelledby="definition" className="collection-field">
        <h3 id="definition">
          <label htmlFor="definition-input">Definition *</label>
        </h3>
        <div className="form-row term">
          <textarea
            id="definition-input"
            value={definition}
            onChange={handleDefinitionChange}
            onKeyDown={handleKeyPress}
            placeholder="Enter the definition"
            rows={2}
            required
          />
        </div>
      </section>

      <section aria-labelledby="source" className="collection-field">
        <h3 id="source">
          <label htmlFor="source-input">Source</label>
        </h3>
        <div className="form-row term">
          <input
            id="source-input"
            type="url"
            value={source}
            onChange={handleSourceChange}
            onKeyDown={handleKeyPress}
            placeholder="https://example.com (optional)"
          />
        </div>
      </section>

      <section aria-labelledby="example" className="collection-field">
        <h3 id="example">
          <label htmlFor="example-input">Example</label>
        </h3>
        <div className="form-row term">
          <textarea
            id="example-input"
            value={example}
            onChange={handleExampleChange}
            onKeyDown={handleKeyPress}
            placeholder="Provide an example (optional)"
            rows={2}
          />
        </div>
      </section>

      <div className="form-row">
        <button
          id="submit"
          type="submit"
          onClick={saveTerm}
          disabled={!isFormValid}
          className="add"
        >
          Add Term
        </button>
        <ApiResponseMessage apiResponse={apiResponse} />
      </div>
    </div>
  )
}
