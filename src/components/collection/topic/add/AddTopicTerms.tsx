import React, { useState, useEffect } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { CollectionSummary, Term, Topic } from '@/types'

import { getShortId } from '@/utils/strings'

export const AddTopicTerms = () => {
  const { collection, getManyCollectionsById, addCollectionItem, apiResponse } =
    useCollection()
  const [linkedCollections, setLinkedCollections] =
    useState<CollectionSummary[]>()
  const [selectedTerms, setSelectedTerms] = useState<Term[]>([])
  const [terms, setTerms] = useState<Term[]>([])

  useEffect(() => {
    setLinkedCollections(
      collection?.collections?.filter(c => c.type.toString() === 'term') || []
    )
  }, [collection?.collections])

  useEffect(() => {
    const fetchCollections = async () => {
      const collectionsToFetch = linkedCollections?.map(c => ({
        slug: c.slug,
        shortId: c.shortId || '',
      }))

      if (!collectionsToFetch) return

      const collections = await getManyCollectionsById(collectionsToFetch)

      const allTerms: Term[] = []
      collections.forEach(collection => {
        if (collection && collection.items) {
          allTerms.push(...(collection.items as Term[]))
        }
      })
      setTerms(allTerms)
    }

    fetchCollections()
  }, [linkedCollections])

  const handleTermToggle = (term: Term) => {
    setSelectedTerms(prev => {
      const isSelected = prev.some(t => t.id === term.id)
      if (isSelected) {
        return prev.filter(t => t.id !== term.id)
      } else {
        return [...prev, term]
      }
    })
  }

  const handleAddToCollection = () => {
    const item = {
      id: getShortId(),
      terms: selectedTerms,
    } as Topic
    if (collection && selectedTerms) {
      addCollectionItem(collection, item)
    }
  }

  return (
    terms && (
      <div className="group-block">
        <ul className="options grid-md">
          {terms.map(term => (
            <li key={term.id} className="row-group">
              <input
                id={term.id}
                type="checkbox"
                checked={selectedTerms.some(t => t.id === term.id)}
                onChange={() => handleTermToggle(term)}
              />
              <label htmlFor={term.id}>
                <span>{term.term}</span>
              </label>
            </li>
          ))}
        </ul>

        <div className="horizontal-group">
          <button onClick={handleAddToCollection}>
            Add Selected Terms to Collection
          </button>
          <ApiResponseMessage apiResponse={apiResponse} />
        </div>
      </div>
    )
  )
}
