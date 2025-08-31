import React, { useState, useEffect } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { Collection, Topic, Term, CollectionSummary } from '@/types'

interface TopicTermsProps {
  collection: Collection<Topic>
  section: Topic
}

export const TopicTerms: React.FC<TopicTermsProps> = ({
  collection,
  section,
}) => {
  const {
    updateCollectionItem,
    deleteCollectionItem,
    getManyCollectionsById,
    apiResponse,
  } = useCollection()
  const [selectedTerms, setSelectedTerms] = useState<Term[]>([])
  const [allAvailableTerms, setAllAvailableTerms] = useState<Term[]>([])
  const [linkedCollections, setLinkedCollections] =
    useState<CollectionSummary[]>()

  // Initialise selected terms with all current terms
  useEffect(() => {
    if (section.terms) {
      setSelectedTerms(section.terms)
    }
  }, [section.terms])

  // Get linked term collections
  useEffect(() => {
    setLinkedCollections(
      collection?.collections?.filter(c => c.type.toString() === 'term') || []
    )
  }, [collection?.collections])

  // Fetch all available terms from linked collections
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
      setAllAvailableTerms(allTerms)
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

  const handleSaveTerms = () => {
    const updatedSection = {
      ...section,
      terms: selectedTerms,
    }
    updateCollectionItem(collection, updatedSection)
  }

  const handleDeleteTermsSection = () => {
    deleteCollectionItem(collection, section.id)
  }

  // Separate terms into currently selected and available to add
  const currentTermIds = selectedTerms.map(t => t.id)
  const availableToAdd = allAvailableTerms.filter(
    term => !currentTermIds.includes(term.id)
  )

  return (
    <div className="group-block">
      {/* Currently selected terms */}
      {selectedTerms.length > 0 && (
        <div>
          <h4>Selected Terms</h4>
          <ul>
            {selectedTerms.map(term => (
              <li key={term.id} className="list-group">
                <div className="form-row">
                  <input
                    id={`selected-${term.id}`}
                    type="checkbox"
                    checked={true}
                    onChange={() => handleTermToggle(term)}
                  />
                  <div>
                    <label
                      htmlFor={`selected-${term.id}`}
                      className="font-weight-600"
                    >
                      {term.term}
                    </label>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Available terms to add */}
      {availableToAdd.length > 0 && (
        <div>
          <h4>Available Terms to Add</h4>
          <ul className="options grid-md">
            {availableToAdd.map(term => (
              <li key={term.id} className="row-group">
                <input
                  id={`available-${term.id}`}
                  type="checkbox"
                  checked={false}
                  onChange={() => handleTermToggle(term)}
                />
                <label htmlFor={`available-${term.id}`}>
                  <span>{term.term}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="column-group">
        <div className="form-row">
          <button onClick={handleSaveTerms} className="save">
            Save terms
          </button>
          <ApiResponseMessage apiResponse={apiResponse} />
        </div>
        <button onClick={handleDeleteTermsSection} className="delete">
          Delete terms
        </button>
      </div>
    </div>
  )
}
