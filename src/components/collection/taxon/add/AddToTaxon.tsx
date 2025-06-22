import React, { useState, useEffect } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { AddTaxa } from '@/components/collection/taxon/add/AddTaxa'

import { Taxon, Collection } from '@/types'

export const AddToTaxon = () => {
  const { collection, updateCollectionItems } = useCollection()
  const [items, setItems] = useState<Taxon[] | undefined>(
    (collection as Collection<Taxon>)?.items
  )

  useEffect(() => {
    if (collection) updateCollectionItems(collection, items ?? [])
  }, [items])

  return <AddTaxa items={items} setItems={setItems} />
}
