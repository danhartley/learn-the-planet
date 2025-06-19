'use client'
import React, { useRef, Dispatch } from 'react'

import MultiSelectList from '@/components/common/MultiSelectList'
import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { ApiResponse } from '@/types'

type Props = {
  options: string[]
  selectedCollections: string[]
  setSelectedCollections: Dispatch<string[]>

  apiResponse: ApiResponse
}

export const CollectionSelector = ({
  options,
  selectedCollections,
  setSelectedCollections,
  apiResponse,
}: Props) => {
  const checkboxRefsRef = useRef<Record<string, HTMLInputElement | null>>({})

  const handleSelectionChange = (collectionNames: string[]) => {
    setSelectedCollections(collectionNames)
  }

  const handleRefsReady = (refs: Record<string, HTMLInputElement | null>) => {
    checkboxRefsRef.current = refs
  }

  return (
    <section className="group-block" aria-labelledby="referenced-collections">
      <h2 id="referenced-collections">Referenced collections</h2>
      <div className="block-container">
        <MultiSelectList
          options={options}
          selectedValues={selectedCollections}
          onSelectionChange={handleSelectionChange}
          onRefsReady={handleRefsReady}
          className="grid-md"
        />
      </div>
    </section>
  )
}
