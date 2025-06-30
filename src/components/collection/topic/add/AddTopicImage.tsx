import React, { useState, useEffect } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'
import { ImageUpload } from '@/components/image/ImageUpload'

import { Topic, NextCloudImage } from '@/types'
import { getShortId } from '@/utils/strings'

export const AddTopicImage = () => {
  const { collection, addCollectionItem, apiResponse } = useCollection()
  const [images, setImages] = useState<NextCloudImage[] | undefined>()
  const [image, setImage] = useState<NextCloudImage | undefined>()

  useEffect(() => {
    if (image) {
      setImages(prevImages => (prevImages ? [...prevImages, image] : [image]))
    }
  }, [image])

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
      <div className="form-row">
        <ImageUpload setImage={setImage} />
        <div className="form-row">
          <button onClick={saveImage} className="save">
            Save image
          </button>
          <ApiResponseMessage apiResponse={apiResponse} />
        </div>
      </div>
    </section>
  )
}
