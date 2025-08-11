import React, { useState, useEffect } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { Collection, Topic, Term } from '@/types'

interface TopicTermsProps {
  collection: Collection<Topic>
  section: Topic
}

export const TopicTerms: React.FC<TopicTermsProps> = ({
  collection,
  section,
}) => {
  const { updateCollectionItem, deleteCollectionItem } = useCollection()
  const [selectedTerms, setSelectedTerms] = useState<Term[]>([])

  // Initialize selected terms with all current terms
  useEffect(() => {
    if (section.terms) {
      setSelectedTerms(section.terms)
    }
  }, [section.terms])

  if (!section.terms || section.terms.length === 0) {
    return null
  }

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

  return (
    <div className="group-block">
      <ul>
        {section.terms.map(term => (
          <li key={term.id} className="list-group">
            <div className="form-row">
              <input
                id={term.id}
                type="checkbox"
                checked={selectedTerms.some(t => t.id === term.id)}
                onChange={() => handleTermToggle(term)}
              />
              <div>
                <label htmlFor={term.id} className="font-weight-600">
                  {term.term}
                </label>
              </div>
              <div>{term.definition}</div>
            </div>
          </li>
        ))}
      </ul>
      <div className="horizontal-group">
        <button onClick={handleSaveTerms}>Save terms</button>
        <button onClick={handleDeleteTermsSection}>Delete terms</button>
      </div>
    </div>
  )
}
