import React, { useEffect, useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { Trait } from '@/types'
import { getShortId } from '@/utils/strings'

export const AddTrait = () => {
  const { collection, addCollectionItem, apiResponse } = useCollection()
  const [Trait, setTrait] = useState('')
  const [definition, setDefinition] = useState('')
  // const [source, setSource] = useState()
  const [lastTraitId, setLastTraitId] = useState(
    collection?.items?.findLast(item => (item as Trait).id)
  )

  const handleTraitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrait(e.target.value)
  }

  const handleDefinitionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDefinition(e.target.value)
  }

  // const handleSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSource(e.target.value)
  // }

  const saveTrait = () => {
    if (!Trait.trim() || !definition.trim()) {
      return // Don't save if required fields are empty
    }

    const item: Trait = {
      id: getShortId(),
      trait: Trait.trim(),
      definition: definition.trim(),
      // ...(source.trim() && { source: source.trim() }),
    }

    if (collection) {
      addCollectionItem(collection, item)
      // Clear form after successful save
      setTrait('')
      setDefinition('')
      // setSource()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      saveTrait()
    }
  }

  useEffect(() => {
    setLastTraitId(collection?.items?.findLast(item => (item as Trait).id))
  }, [collection?.items])

  useEffect(() => {
    if (!collection) return
    const item = collection.items
      ? collection.items[collection.itemCount - 1]
      : undefined
    if (item) {
      const itemId = (item as Trait)?.id || undefined
      if (itemId)
        document.getElementById(itemId)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        })
    }
  }, [collection, lastTraitId])

  const isFormValid = Trait.trim() && definition.trim()

  return (
    <div className="column-group">
      <h2 id="new-Trait">Add Trait</h2>

      <section aria-labelledby="Trait" className="collection-field">
        <h3 id="Trait">
          <label htmlFor="Trait-input">Trait *</label>
        </h3>
        <div className="form-row Trait">
          <input
            id="Trait-input"
            type="text"
            value={Trait}
            onChange={handleTraitChange}
            onKeyDown={handleKeyPress}
            placeholder="Enter the Trait"
            required
          />
        </div>
      </section>

      <section aria-labelledby="definition" className="collection-field">
        <h3 id="definition">
          <label htmlFor="definition-input">Definition *</label>
        </h3>
        <div className="form-row Trait">
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

      {/* <section aria-labelledby="source" className="collection-field">
        <h3 id="source">
          <label htmlFor="source-input">Source</label>
        </h3>
        <div className="form-row Trait">
          <input
            id="source-input"
            type="url"
            value={source}
            onChange={handleSourceChange}
            onKeyDown={handleKeyPress}
            placeholder="https://example.com (optional)"
          />
        </div>
      </section> */}

      <div className="form-row">
        <button
          id="submit"
          type="submit"
          onClick={saveTrait}
          disabled={!isFormValid}
          className="add"
        >
          Add Trait
        </button>
        <ApiResponseMessage apiResponse={apiResponse} />
      </div>
    </div>
  )
}
