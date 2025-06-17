import React, { Dispatch, SetStateAction } from 'react'

import { CldUploadWidget } from 'next-cloudinary'

import {
  CloudinaryUploadWidgetResults,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetOptions,
} from 'next-cloudinary'

import { NextCloudImage } from '@/types'

type Props = {
  options?: CloudinaryUploadWidgetOptions
  setImage: Dispatch<SetStateAction<NextCloudImage | undefined>>
}

export const ImageUpload = ({ options, setImage }: Props) => {
  const handleUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
    if (!result.info || typeof result.info === 'string') return
    const info: CloudinaryUploadWidgetInfo = result.info

    const image: NextCloudImage = {
      src: info.public_id,
      alt: info.display_name || '',
      caption: info.display_name || '',
    }

    setImage(image)
  }

  const defaultOptions: CloudinaryUploadWidgetOptions = {
    maxFileSize: 1000000, // 1MB in bytes
    context: {
      title: '',
      description: '',
    },
  }

  const handleUploadError = (error: unknown) => {
    console.error('Upload failed:', error)
  }
  return (
    <CldUploadWidget
      uploadPreset="LTP Collection Context Images"
      options={options || defaultOptions}
      onSuccess={handleUploadSuccess}
      onError={handleUploadError}
    >
      {({ open }) => {
        return <button onClick={() => open()}>Upload a new image</button>
      }}
    </CldUploadWidget>
  )
}
