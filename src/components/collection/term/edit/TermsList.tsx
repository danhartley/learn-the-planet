import React, { useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { Term } from '@/types'
import { EditTerm } from '@/components/collection/term/edit/EditTerm'

export const TermsList = () => {
  const { collection } = useCollection()
  const [editingTermId, setEditingTermId] = useState<string | null>(null)

  const terms = (collection?.items || []) as Term[]

  const handleTermClick = (termId: string) => {
    setEditingTermId(termId)
  }

  const handleCancelEdit = () => {
    setEditingTermId(null)
  }

  const handleSaveEdit = () => {
    setEditingTermId(null)
  }

  const handleDeleteTerm = () => {
    setEditingTermId(null)
  }

  if (!collection || terms.length === 0) {
    return (
      <section aria-labelledby="terms-list">
        <h2 id="terms-list">Terms</h2>
        <p>No terms available.</p>
      </section>
    )
  }

  return (
    <section aria-labelledby="terms-list" className="group-block">
      <div className="group">
        <h2 id="terms-list">Terms ({terms.length})</h2>
        <div>
          <em>Click to edit or delete a term.</em>
        </div>
      </div>
      <div className="column-group">
        {terms.map(term => (
          <div key={term.id} id={term.id}>
            {editingTermId === term.id ? (
              <EditTerm
                term={term}
                onCancel={handleCancelEdit}
                onSave={handleSaveEdit}
                onDelete={handleDeleteTerm}
              />
            ) : (
              <button
                type="button"
                onClick={() => handleTermClick(term.id)}
                aria-label={`Edit term: ${term.term}`}
              >
                {term.term}
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
