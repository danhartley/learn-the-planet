import React, { Dispatch, SetStateAction } from 'react'

import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { ApiResponse } from '@/types'

type Props = {
  onAddProperties: () => void
  isItemsValid: boolean
  isValid: boolean
  message: ApiResponse
  setMessage: Dispatch<SetStateAction<ApiResponse>>
}

export const CollectionExtensions = ({
  onAddProperties,
  isItemsValid,
  isValid,
  message,
  setMessage,
}: Props) => {
  const handleOnClick = () => {
    onAddProperties()
  }

  return (
    <section aria-labelledby="inaturalist" className="group-block">
      <h2 id="inaturalist">iNaturalist taxa extensions</h2>
      <div className="column-group">
        <div>Add iNaturalist properties to your species, including images</div>
        <div className="form-row">
          <button
            id="add-inat-props"
            onClick={handleOnClick}
            disabled={!isItemsValid}
          >
            Add iNaturalist properties
          </button>
          <ApiResponseMessage apiResponse={message} />
        </div>
      </div>
    </section>
  )
}
