'use client'
import React from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { Collection, Taxon } from '@/types'

export const TaxonItems = () => {
  const { collection } = useCollection()
  const TaxonCollection = collection as Collection<Taxon>

  return (
    <>
      {TaxonCollection?.items &&
        TaxonCollection.items.map(section => {
          return <React.Fragment key={section.id}></React.Fragment>
        })}
    </>
  )
}
