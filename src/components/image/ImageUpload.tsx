import { CldUploadWidget } from 'next-cloudinary'

import {
  CloudinaryUploadWidgetResults,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetOptions,
} from 'next-cloudinary'

export const ImageUpload = ({
  options,
}: {
  options: CloudinaryUploadWidgetOptions
}) => {
  const handleUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
    if (!result.info || typeof result.info === 'string') return
    const info: CloudinaryUploadWidgetInfo = result.info
    console.log('Upload successful:', result)
    console.log('Public ID:', info.public_id)
    console.log('info:', info)
  }

  const handleUploadError = (error: unknown) => {
    console.error('Upload failed:', error)
  }
  return (
    <CldUploadWidget
      uploadPreset="LTP Collection Context Images"
      options={options}
      onSuccess={handleUploadSuccess}
      onError={handleUploadError}
    >
      {({ open }) => {
        return <button onClick={() => open()}>Upload an Image</button>
      }}
    </CldUploadWidget>
  )
}
