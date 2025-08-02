'use client'
import { useState, useEffect } from 'react'

import { CldImage } from 'next-cloudinary'

import { useCollection } from '@/contexts/CollectionContext'

import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'
import { CollectionTextField } from '@/components/common/CollectionTextField'

import { Topic, NextCloudImage, ContentHandlerType } from '@/types'

type Props = {
  section: Topic
  image: NextCloudImage
  sectionIndex: number
}

export const TopicCloudImage = ({ section, image, sectionIndex }: Props) => {
  const {
    collection,
    updateCollectionItem,
    deleteCollectionItem,
    apiResponse,
  } = useCollection()
  const [captionValue, setCaption] = useState<string>(image.caption)
  const [altValue, setAlt] = useState(image.alt || image.caption)
  const [isUpdating, setIsUpdating] = useState(false)
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cloudImage, setCloudImage] = useState<NextCloudImage | undefined>()

  const sizes = `(max-width: 768px) 100vw,
           (max-width: 1200px) 50vw,
            33vw`
  const width = 250
  const height = 178

  useEffect(() => {
    if (cloudImage) {
      // should not be directly mutating value…
      section.images = [...(section?.images ?? []), cloudImage]
    }
  }, [cloudImage, section])

  const saveChanges = async () => {
    setIsUpdating(true)
    section.images = section.images?.map(img =>
      img.src === image.src
        ? { ...img, caption: captionValue, alt: altValue }
        : img
    )
    if (cloudImage) {
      section.images = [...(section?.images ?? []), cloudImage]
    }
    if (collection)
      await updateCollectionItem(collection, section).then(() => {
        setIsUpdating(false)
      })
  }

  const removeImage = () => {
    if (collection) deleteCollectionItem(collection, section.id)
  }

  return (
    <>
      <h2>Cloudinary Image</h2>
      <figure>
        <CldImage
          src={image.src}
          width={width}
          height={height}
          alt={image.alt || image.caption}
          sizes={sizes}
        />
      </figure>

      <CollectionTextField
        fieldValue={image.caption}
        setFieldValue={setCaption}
        fieldText="Image caption"
        type={'topic' as unknown as ContentHandlerType}
        sectionIndex={sectionIndex}
      />

      <CollectionTextField
        fieldValue={image.alt || image.caption}
        setFieldValue={setAlt}
        fieldText="Image alt text"
        type={'topic' as unknown as ContentHandlerType}
        sectionIndex={sectionIndex}
      />

      <div className="form-row">
        <button
          type="button"
          id="edit-section"
          disabled={isUpdating}
          onClick={saveChanges}
          className="save"
        >
          Save
        </button>
        <button onClick={removeImage} className="delete">
          Delete image
        </button>
        <ApiResponseMessage apiResponse={apiResponse} />
      </div>
      <div>
        Deleting the image from the topic collection will not remove it from
        Cloudinary.
      </div>
    </>
  )
}
