import React, { Dispatch, SetStateAction } from 'react'

import { CollectionInatTaxonPicker } from '@/components/common/taxon/CollectionInatTaxonPicker'

import { Operation, ApiResponse } from '@/types'

type Props = {
  setItems: Dispatch<SetStateAction<unknown[] | undefined>>
  apiResponse: ApiResponse
}

export const AddTaxaSection = ({ setItems, apiResponse }: Props) => {
  return (
    <section aria-labelledby="new-section">
      <h2 id="new-section">Add taxa</h2>
      <CollectionInatTaxonPicker
        setItems={setItems}
        operation={'create' as Operation}
        apiResponse={apiResponse}
      />
    </section>
  )
}
