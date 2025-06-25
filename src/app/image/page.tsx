'use client'
import { useState } from 'react'

import { CloudinaryUploadWidgetOptions } from 'next-cloudinary'

import { ImageUpload } from '@/components/image/ImageUpload'

import { NextCloudImage } from '@/types'

export default function Page() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [image, setImage] = useState<NextCloudImage | undefined>({
    src: '',
    caption: '',
    alt: '',
  })

  const options: CloudinaryUploadWidgetOptions = {
    maxFileSize: 1000000, // 1MB in bytes
    context: {
      title,
      description,
    },
  }

  return (
    <>
      <h1>Upload a new image</h1>
      <form action="">
        <label htmlFor="image-title">Title</label>
        <input
          id="image-title"
          type="text"
          value={title}
          placeholder="Enter image title"
          title="Image title input field"
          onChange={e => setTitle(e.target.value)}
        />
        <label htmlFor="image-description">Description</label>
        <input
          id="image-description"
          type="text"
          value={description}
          placeholder="Enter image description"
          title="Image description input field"
          onChange={e => setDescription(e.target.value)}
        />
      </form>
      <ImageUpload options={options} setImage={setImage} />
    </>
  )
}
