import React, { useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { AddTaxa } from '@/components/collection/taxon/add/AddTaxa'

import { Taxon, Collection } from '@/types'

export const AddToTaxon = () => {
  const { collection, updateCollectionItems } = useCollection()
  const [items, setItems] = useState<Taxon[] | undefined>(
    (collection as Collection<Taxon>)?.items
  )

  const handleSaveItems = (newItems: Taxon[]) => {
    setItems(newItems)

    if (collection) {
      updateCollectionItems(collection, newItems)
    }
  }

  return <AddTaxa items={items} setItems={handleSaveItems} />
}
