import React, { useState, useEffect } from 'react'

import { useSession } from 'next-auth/react'

import { useCollection } from '@/contexts/CollectionContext'

import { ImageListItem } from '@/components/image/common/ImageListItem'
import { ImageListItemRadio } from '@/components/image/common/ImageListItemRadio'

import { NextCloudImage, NextCloudImageTagType, CloudImage } from '@/types'

type SingleSelectionProps = {
  selectionMode: 'single'
  setSelectedImage: (image: NextCloudImage | undefined) => void
  imageUrl: string
}

type MultipleSelectionProps = {
  selectionMode?: 'multiple'
  setSelectedImages: React.Dispatch<
    React.SetStateAction<NextCloudImage[] | undefined>
  >
}

type Props = SingleSelectionProps | MultipleSelectionProps

export const ImageSelector = (props: Props) => {
  const { data: session } = useSession()
  const { collection, getImages } = useCollection()
  const [tagType, setTagType] = useState<NextCloudImageTagType>('collection')
  const [images, setImages] = useState<NextCloudImage[] | undefined>()

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const cloudImages =
          tagType === 'user'
            ? await getImages({ userId: session?.user?.id })
            : await getImages({ collectionId: collection?.id })

        setImages(
          (cloudImages as CloudImage[]).map(
            (cloudImage: CloudImage): NextCloudImage => {
              return {
                id: cloudImage.asset_id,
                src: cloudImage.public_id,
                url: cloudImage.secure_url,
                alt: cloudImage.display_name || '',
                caption: cloudImage.display_name || '',
              } as NextCloudImage
            }
          )
        )
      } catch (error) {
        console.error('Error fetching images:', error)
      }
    }

    fetchImages()
  }, [getImages, tagType, collection?.id, session?.user?.id])

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tagType = event.target.value as NextCloudImageTagType
    setTagType(tagType)
  }

  const handleImageToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageId = (e.target as HTMLInputElement).id
    const cloudImage = images?.find(image => image.id === imageId)

    if (props.selectionMode === 'single') {
      // Single selection mode - radio button behavior
      const newSelectedImage = cloudImage || undefined
      // setSelectedImage(newSelectedImage)
      props.setSelectedImage(newSelectedImage)
    } else {
      // Multiple selection mode - checkbox behavior (default)
      props.setSelectedImages(prev => {
        const isSelected = prev?.some(
          selected => selected.id === cloudImage?.id
        )

        if (isSelected) {
          // Remove cloudImage
          return prev?.filter(selected => selected.id !== cloudImage?.id)
        } else if (cloudImage) {
          // Add cloudImage only if it's defined
          return [...(prev ?? []), cloudImage]
        } else {
          // If cloudImage is undefined, return prev unchanged
          return prev
        }
      })
    }
  }

  return (
    <div className="column-group">
      {
        <ul className="list-group">
          <li>
            <input
              id="rbCollection"
              name="tagType"
              type="radio"
              value="collection"
              checked={tagType === 'collection'}
              onChange={handleStatusChange}
            />
            <label htmlFor="rbCollection">
              Show images from current collection
            </label>
          </li>
          <li>
            <input
              id="rbUser"
              name="tagType"
              type="radio"
              value="user"
              checked={tagType === 'user'}
              onChange={handleStatusChange}
            />
            <label htmlFor="rbUser">Show all images</label>
          </li>
        </ul>
      }
      {(images?.length ?? 0) > 0 ? (
        <ul>
          {!!images &&
            images.map(image => (
              <React.Fragment key={image.id}>
                {props.selectionMode === 'multiple' && (
                  <ImageListItem
                    image={image}
                    handleImageToggle={handleImageToggle}
                  />
                )}
                {props.selectionMode === 'single' && (
                  <ImageListItemRadio
                    image={image}
                    handleImageToggle={handleImageToggle}
                    imageUrl={props.imageUrl}
                  />
                )}
              </React.Fragment>
            ))}
        </ul>
      ) : (
        <div className="form-row">
          <em>You've no images saved.</em>
        </div>
      )}
    </div>
  )
}
