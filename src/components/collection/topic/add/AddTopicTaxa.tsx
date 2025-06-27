import React, { useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { AddTaxa } from '@/components/collection/taxon/AddTaxa'

import { Topic, Taxon, Operation } from '@/types'
import { getShortId } from '@/utils/strings'

export const AddTopicTaxa = () => {
  const { collection, addCollectionItem } = useCollection()
  const [items, setItems] = useState<Taxon[] | undefined>()

  const handleSaveItems = (newItems: Taxon[]) => {
    setItems(newItems)

    if (collection && newItems.length > 0) {
      const item = {
        id: getShortId(),
        examples: newItems,
      } as Topic

      addCollectionItem(collection, item)
    }
  }

  return (
    <section aria-labelledby="new-section">
      <h2 id="new-section">Add taxa</h2>
      <AddTaxa
        items={items}
        setItems={handleSaveItems}
        operation={'create' as Operation}
      />
    </section>
  )
}
