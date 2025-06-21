import React, { useState, useEffect } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { AddTaxa } from '@/components/taxon/AddTaxa'

import { Topic, Operation } from '@/types'
import { getShortId } from '@/utils/strings'

export const AddToTopicTaxa = () => {
  const { collection, addItem, apiResponse } = useCollection()
  const [items, setItems] = useState<unknown[] | undefined>()

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
        setItems={setItems}
        operation={'create' as Operation}
        apiResponse={apiResponse}
      />
    </section>
  )
}
