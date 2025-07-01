import React, { useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { EditTrait } from '@/components/collection/trait/edit/EditTrait'

import { Collection, Trait } from '@/types'

export const TraitItems = () => {
  const { collection } = useCollection()
  const traitCollection = collection as Collection<Trait>
  const [selectedTraitId, setSelectedTraitId] = useState<string | null>(null)

  if (!traitCollection.items) {
    return (
      <section aria-labelledby="traits-list">
        <h2 id="traits-list">Traits</h2>
        <p>Nothing to show yet!</p>
      </section>
    )
  }

  const handleTraitToggle = (traitId: string) => {
    setSelectedTraitId(selectedTraitId === traitId ? null : traitId)
  }

  return (
    <section aria-labelledby="traits-list">
      <div className="group">
        <h2 id="traits-list">Traits</h2>
        <div>
          <em>Click to edit or delete a trait.</em>
        </div>
      </div>
      <ul>
        {traitCollection.items.map((trait, index) => (
          <li key={trait.id} className="column-group">
            <div className="horizontal-group">
              <button onClick={() => handleTraitToggle(trait.id)}>
                <div className="index">{index + 1}</div>
              </button>
              <span>{trait.trait}</span>
            </div>
            {selectedTraitId === trait.id && <EditTrait trait={trait} />}
          </li>
        ))}
      </ul>
    </section>
  )
}
