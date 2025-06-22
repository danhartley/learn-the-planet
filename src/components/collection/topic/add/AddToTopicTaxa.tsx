import React, { useState, useEffect } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { AddTaxa } from '@/components/collection/taxon/add/AddTaxa'

import { Topic, Taxon, Operation } from '@/types'
import { getShortId } from '@/utils/strings'

export const AddToTopicTaxa = () => {
  const { collection, addItem } = useCollection()
  const [items, setItems] = useState<Taxon[] | undefined>()

  useEffect(() => {
    if (collection && items) {
      const item = {
        id: getShortId(),
        examples: items,
      } as Topic

      addItem(collection, item)
    }
  }, [items])

  return (
    <section aria-labelledby="new-section">
      <h2 id="new-section">Add taxa</h2>
      <AddTaxa
        items={items}
        setItems={setItems}
        operation={'create' as Operation}
      />
    </section>
  )
}
