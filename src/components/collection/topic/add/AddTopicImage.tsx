import React, { useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'
import { InteractiveImagesList } from '@/components/image/InteractiveImagesList'

import { Topic, NextCloudImage } from '@/types'
import { getShortId } from '@/utils/strings'

export const AddTopicImage = () => {
  const { collection, addCollectionItem, apiResponse } = useCollection()
  const [images, setImages] = useState<NextCloudImage[] | undefined>()

  const saveImage = () => {
    const item = {
      id: getShortId(),
      images: images as NextCloudImage[],
    } as Topic

    if (collection) addCollectionItem(collection, item)
  }

  return (
    <section aria-labelledby="new-section">
      <h2 id="new-section">Add image</h2>
      <div className="group-block">
        <InteractiveImagesList images={images} setImages={setImages} />
        <div className="form-row">
          <button onClick={saveImage} className="save">
            Save selection
          </button>
          <ApiResponseMessage apiResponse={apiResponse} />
        </div>
      </div>
    </section>
  )
}
