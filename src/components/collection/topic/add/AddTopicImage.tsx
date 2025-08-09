import React, { useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'
import { ImageSelector } from '@/components/image/ImageSelector'

import { Topic, NextCloudImage } from '@/types'
import { getShortId } from '@/utils/strings'

export const AddTopicImage = () => {
  const { collection, addCollectionItem, apiResponse } = useCollection()
  const [selectedImages, setSelectedImages] = useState<
    NextCloudImage[] | undefined
  >()

  const saveImage = () => {
    console.log('selectedImages', selectedImages)
    const item = {
      id: getShortId(),
      images: selectedImages as NextCloudImage[],
    } as Topic

    if (collection) addCollectionItem(collection, item)
  }

  return (
    <>
      <div className="group-block">
        <ImageSelector
          selectionMode="multiple"
          setSelectedImages={setSelectedImages}
        />
        <div className="form-row">
          <button onClick={saveImage} className="save">
            Save selection
          </button>
          <ApiResponseMessage apiResponse={apiResponse} />
        </div>
      </div>
    </>
  )
}
