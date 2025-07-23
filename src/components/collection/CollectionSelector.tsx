'use client'
import React, { useRef, Dispatch } from 'react'

import MultiSelectList from '@/components/common/MultiSelectList'

type Props = {
  options: string[]
  selectedCollections: string[]
  setSelectedCollections: Dispatch<string[]>
}

export const CollectionSelector = ({
  options,
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
          options={options}
          selectedValues={selectedCollections}
          onSelectionChange={setSelectedCollections}
          onRefsReady={handleRefsReady}
          className="grid-md"
        />
      </div>
    </section>
  )
}
