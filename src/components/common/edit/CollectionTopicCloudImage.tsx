'use client'
import { useState, useEffect } from 'react'

import { CldImage } from 'next-cloudinary'

import { useCollectionOperations } from '@/hooks/useCollectionOperations'

import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'
import { CollectionTextField } from '@/components/common/CollectionTextField'

import { Collection, Topic, NextCloudImage } from '@/types'

type Props = {
  collection: Collection<Topic>
  section: Topic
  image: NextCloudImage
}

export const CollectionTopicCloudImage = ({
  collection,
  section,
  image,
}: Props) => {
  const [captionValue, setCaption] = useState<string>(image.caption)
  const [altValue, setAlt] = useState(image.alt)
  const [changesToSave, setChangesToSave] = useState(false)

  const { apiResponse, updateCollectionItem } = useCollectionOperations()

  const sizes = `(max-width: 768px) 100vw,
           (max-width: 1200px) 50vw,
            33vw`
  const width = 250
  const height = 178

  useEffect(() => {
    setChangesToSave(true)
  }, [captionValue, altValue])

  const saveChanges = () => {
    section.images = section.images?.map(img =>
      img.src === image.src
        ? { ...img, caption: captionValue, alt: altValue }
        : img
    )

    updateCollectionItem(collection, section)
  }

  return (
    <div className="cloudinary update">
      <div className="group-block">
        <h2>Cloudinary Image</h2>
        <figure>
          <CldImage
            src={image.src}
            width={width}
            height={height}
            alt={image.alt}
            sizes={sizes}
          />
        </figure>

        <CollectionTextField
          operation="update"
          fieldValue={image.caption}
          setFieldValue={setCaption}
          fieldText="Image caption"
          type="topic"
        />

        <CollectionTextField
          operation="update"
          fieldValue={image.alt}
          setFieldValue={setAlt}
          fieldText="Image alt text"
          type="topic"
        />

        <div className="form-row">
          <button
            type="button"
            id="edit-section"
            disabled={!changesToSave}
            onClick={saveChanges}
          >
            Save changes
          </button>
          <button>Remove image</button>
          <ApiResponseMessage apiResponse={apiResponse} />
        </div>
        <div>
          Removing the image from the topic collection will not remove it from
          Cloudinary.
        </div>
      </div>
    </div>
  )
}
