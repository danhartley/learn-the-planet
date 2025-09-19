'use client'
import React, { useRef, Dispatch } from 'react'

import MultiSelectList from '@/components/common/MultiSelectList'

import { CollectionSummary } from '@/types'

type Props = {
  collections: CollectionSummary[]
  selectedCollections: string[]
  setSelectedCollections: Dispatch<string[]>
}

export const CollectionSelector = ({
  collections,
  selectedCollections,
  setSelectedCollections,
}: Props) => {
  const checkboxRefsRef = useRef<Record<string, HTMLInputElement | null>>({})

  const handleRefsReady = (refs: Record<string, HTMLInputElement | null>) => {
    checkboxRefsRef.current = refs
  }

  return (
    <section aria-labelledby="linked-collections" className="list-group">
      <h2 id="linked-collections">Link to other collections</h2>
      <div className="group-block">
        <MultiSelectList
          options={collections.map(collection => collection.name)}
          selectedValues={selectedCollections}
          onSelectionChange={setSelectedCollections}
          onRefsReady={handleRefsReady}
          className="grid-md"
        />
      </div>
    </section>
  )
}
