import React, { useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { Trait } from '@/types'
import { EditTrait } from '@/components/collection/trait/EditTrait'

export const TraitItems = () => {
  const { collection } = useCollection()
  const [editingTraitId, setEditingTraitId] = useState<string | null>(null)

  const traits = (collection?.items || []) as Trait[]

  const handleTraitClick = (traitId: string) => {
    setEditingTraitId(traitId)
  }

  const handleCancelEdit = () => {
    setEditingTraitId(null)
  }

  const handleSaveEdit = () => {
    setEditingTraitId(null)
  }

  const handleDeleteTrait = () => {
    setEditingTraitId(null)
  }

  if (!collection || traits.length === 0) {
    return (
      <section aria-labelledby="traits-list">
        <h2 id="traits-list">Traits</h2>
        <p>No traits available.</p>
      </section>
    )
  }

  return (
    <section aria-labelledby="traits-list" className="group-block">
      <div className="group">
        <h2 id="traits-list">Traits ({traits.length})</h2>
        <div>
          <em>Click to edit or delete a trait.</em>
        </div>
      </div>
      <div className="column-group">
        {traits.map(trait => (
          <div key={trait.id}>
            {editingTraitId === trait.id ? (
              <EditTrait
                trait={trait}
                onCancel={handleCancelEdit}
                onSave={handleSaveEdit}
                onDelete={handleDeleteTrait}
              />
            ) : (
              <button
                id={trait.id}
                type="button"
                className="trait-button"
                onClick={() => handleTraitClick(trait.id)}
                aria-label={`Edit trait: ${trait.trait}`}
              >
                {trait.trait}
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
