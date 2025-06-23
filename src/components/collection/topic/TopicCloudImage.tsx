'use client'
import { useState, useEffect } from 'react'

import { CldImage } from 'next-cloudinary'

import { useCollection } from '@/contexts/CollectionContext'

import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'
import { CollectionTextField } from '@/components/common/CollectionTextField'
import { ImageUpload } from '@/components/image/ImageUpload'

import { Topic, NextCloudImage } from '@/types'

type Props = {
  section: Topic
  image: NextCloudImage
  sectionIndex: number
}

export const TopicCloudImage = ({ section, image, sectionIndex }: Props) => {
  const { collection, updateCollectionItem, deleteItem, apiResponse } =
    useCollection()
  const [captionValue, setCaption] = useState<string>(image.caption)
  const [altValue, setAlt] = useState(image.alt)
  const [changesToSave, setChangesToSave] = useState(false)
  const [cloudImage, setCloudImage] = useState<NextCloudImage | undefined>()

  const sizes = `(max-width: 768px) 100vw,
           (max-width: 1200px) 50vw,
            33vw`
  const width = 250
  const height = 178

  useEffect(() => {
    setChangesToSave(true)
  }, [captionValue, altValue])

  useEffect(() => {
    if (cloudImage) {
      section.images = [...(section?.images ?? []), cloudImage]
    }
  }, [cloudImage?.src])

  const saveChanges = async () => {
    section.images = section.images?.map(img =>
      img.src === image.src
        ? { ...img, caption: captionValue, alt: altValue }
        : img
    )
    if (cloudImage) {
      section.images = [...(section?.images ?? []), cloudImage]
      if (collection) await updateCollectionItem(collection, section)
    }
  }

  const removeImage = () => {
    if (collection) deleteItem(collection, section.id)
  }

  return (
    <div id={section.id} className="cloudinary update">
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
          fieldValue={image.caption}
          setFieldValue={setCaption}
          fieldText="Image caption"
          type="topic"
          sectionIndex={sectionIndex}
        />

        <CollectionTextField
          fieldValue={image.alt}
          setFieldValue={setAlt}
          fieldText="Image alt text"
          type="topic"
          sectionIndex={sectionIndex}
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
          <button onClick={removeImage}>Remove image</button>
          <ApiResponseMessage apiResponse={apiResponse} />
        </div>
        <div>
          Removing the image from the topic collection will not remove it from
          Cloudinary.
        </div>
        <ImageUpload setImage={setCloudImage} />
      </div>
    </div>
  )
}
