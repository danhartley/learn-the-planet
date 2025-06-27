import React, { useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { EditTrait } from '@/components/collection/trait/edit/EditTrait'

import { Collection, Trait } from '@/types'

export const TraitItems = () => {
  const { collection } = useCollection()
  const traitCollection = collection as Collection<Trait>
  const [editingTraitId, setEditingTraitId] = useState<string | null>(null)

  if (!traitCollection.items) {
    return (
      <section aria-labelledby="traits-list">
        <h2 id="traits-list">Traits</h2>
        <p>Nothing to show yet!</p>
      </section>
    )
  }

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

  return (
    <section aria-labelledby="traits-list" className="group-block">
      <div className="group">
        <h2 id="traits-list">Traits ({traitCollection.items.length})</h2>
        <div>
          <em>Click to edit or delete a trait.</em>
        </div>
      </div>
      <div className="column-group">
        {traitCollection.items.map((trait, index) => (
          <div key={trait.id}>
            <EditTrait
              trait={trait}
              onCancel={handleCancelEdit}
              onSave={handleSaveEdit}
              onDelete={handleDeleteTrait}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
