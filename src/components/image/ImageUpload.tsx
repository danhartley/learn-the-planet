import { CldUploadWidget } from 'next-cloudinary'

export const ImageUpload = () => {
  const handleUploadSuccess = (result: any) => {
    console.log('Upload successful:', result)
    console.log('Public ID:', result.info.public_id)
    // You can access other useful properties like:
    // result.info.secure_url - the full Cloudinary URL
    // result.info.width, result.info.height - image dimensions
    // result.info.format - file format
    // result.info.resource_type - usually 'image'
  }

  const handleUploadError = (error: any) => {
    console.error('Upload failed:', error)
  }
  return (
    <CldUploadWidget
      uploadPreset="LTP Collection Context Images"
      options={{
        maxFileSize: 1000000, // 1MB in bytes
      }}
      onSuccess={handleUploadSuccess}
      onError={handleUploadError}
    >
      {({ open }) => {
        return <button onClick={() => open()}>Upload an Image</button>
      }}
    </CldUploadWidget>
  )
}
