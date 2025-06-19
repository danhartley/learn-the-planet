import React, { Dispatch, SetStateAction, useState, useEffect } from 'react'

import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'
import { ImageUpload } from '@/components/image/ImageUpload'

import { ApiResponse, NextCloudImage } from '@/types'

type Props = {
  setItems: Dispatch<SetStateAction<unknown> | undefined>
  apiResponse: ApiResponse
}

export const AddImageSection = ({ setItems, apiResponse }: Props) => {
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
    setItems(images)
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
