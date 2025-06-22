import React, { useState, useEffect } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'
import { ImageUpload } from '@/components/image/ImageUpload'

import { Topic, NextCloudImage } from '@/types'
import { getShortId } from '@/utils/strings'

export const AddToTopicImage = () => {
  const { collection, addItem, apiResponse } = useCollection()
  const [images, setImages] = useState<NextCloudImage[] | undefined>()
  const [image, setImage] = useState<NextCloudImage | undefined>()

  useEffect(() => {
    if (image && images) {
      setImages([...images, image])
    } else if (image) {
      setImages([image])
    }
  }, [image])

  const saveImages = () => {
    const item = {
      id: getShortId(),
      images: images as NextCloudImage[],
    } as Topic

    if (collection) addItem(collection, item)
  }

  return (
    <section aria-labelledby="new-section">
      <h2 id="new-section">Add images</h2>
      <div className="form-row">
        <ImageUpload setImage={setImage} />
        <div className="form-row">
          <button onClick={saveImages}>Save images</button>
          <ApiResponseMessage apiResponse={apiResponse} />
        </div>
      </div>
    </section>
  )
}
