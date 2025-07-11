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
  userId: string
  collectionId: string
  maxFileSize?: number
  allowedFormats?: Array<string>
  enableCropping?: boolean
  croppingAspectRatio?: number
  buttonText?: string
  buttonClass?: string
  theme?: 'default' | 'minimal' | 'white'
  singleUploadAutoClose?: boolean
}

export const UserImageUpload = ({
  options,
  userId,
  collectionId,
  maxFileSize = 1000000, // 1MB default
  allowedFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif'],
  enableCropping = true,
  croppingAspectRatio = 1.5, // 3:2 aspect ratio
  buttonText = 'Upload new collection image',
  buttonClass = '',
  theme = 'default',
  singleUploadAutoClose = true,
}: Props) => {
  const handleUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
    if (!result.info || typeof result.info === 'string') return
    const info: CloudinaryUploadWidgetInfo = result.info

    const image: NextCloudImage = {
      id: info.public_id,
      src: info.public_id,
      alt: info.display_name || '',
      caption: info.display_name || '',
    }
    console.log(image)
  }

  // Generate folder path based on userId and collectionId
  const generateFolder = () => {
    return `users/${userId}/collections/${collectionId}`
  }

  const defaultOptions: CloudinaryUploadWidgetOptions = {
    // File constraints
    maxFileSize,
    maxFiles: 1,
    multiple: false,
    clientAllowedFormats: allowedFormats,

    // Organization
    folder: generateFolder(),
    context: {
      title: '',
      description: '',
      collection_id: collectionId,
      user_id: userId,
      upload_type: 'collection_image',
    },
    tags: ['collection-image', `user-${userId}`, `collection-${collectionId}`],

    // Resource settings
    resourceType: 'image',

    // Upload sources - restrict to more relevant options
    sources: [
      'local',
      'camera',
      'url',
      'dropbox',
      'google_drive',
      'unsplash',
      'image_search',
    ],

    // Cropping settings
    cropping: enableCropping,
    croppingAspectRatio: enableCropping ? croppingAspectRatio : undefined,
    croppingShowBackButton: true,
    croppingShowDimensions: true,
    showSkipCropButton: true,
    croppingDefaultSelectionRatio: 0.8,
    croppingValidateDimensions: true,

    // UI/UX settings
    theme,
    singleUploadAutoClose,
    showAdvancedOptions: false,
    showCompletedButton: true,
    showPoweredBy: false,
    showUploadMoreButton: false,
    autoMinimize: false,

    // Button customization
    buttonCaption: buttonText,
    buttonClass,

    // Image validation
    maxImageWidth: 4000,
    maxImageHeight: 4000,
    minImageWidth: 100,
    minImageHeight: 100,
    validateMaxWidthHeight: true,

    // Thumbnails for immediate preview
    thumbnails: '.thumbnail',
    thumbnailTransformation: [
      { width: 150, height: 150, crop: 'thumb', gravity: 'face' },
      { width: 300, height: 200, crop: 'fill', gravity: 'auto' },
    ],

    // Search settings (for image_search and unsplash)
    searchByRights: true,

    // Localization
    language: 'en',

    // Custom text for better UX
    text: {
      'queue.title': 'Upload new collection image',
      'queue.title_uploading_with_counter': 'Uploading Image',
      'queue.title_processing_with_counter': 'Processing Image',
      'queue.done': 'Image uploaded successfully!',
      'local.browse': 'Browse Files',
      'local.dd_title_single': 'Drag & Drop your image here',
      'camera.capture': 'Take Photo',
      'camera.cancel': 'Cancel',
      'camera.take_pic': 'Take Picture',
      'camera.explanation':
        'Make sure your camera is connected and enabled, then click to take a picture.',
      'crop.title': 'Crop your image',
      'crop.crop_btn': 'Crop Image',
      'crop.skip_btn': 'Skip Cropping',
      'crop.reset_btn': 'Reset',
      'crop.close_btn': 'Close',
    },

    // Pre-processing callback
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    preBatch: (cb: Function, data: any) => {
      // You can add custom validation here
      console.log('Pre-batch processing:', data)
      cb(data)
    },

    // Upload parameters preparation
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepareUploadParams: (cb: Function, params: any) => {
      // Add any custom parameters before upload
      params.timestamp = Date.now()
      cb(params)
    },
  }

  const handleUploadError = (error: unknown) => {
    console.error('Upload failed:', error)
    // You could add toast notification here
  }

  return (
    <CldUploadWidget
      uploadPreset="collection-images"
      options={{ ...defaultOptions, ...options }}
      onSuccess={handleUploadSuccess}
      onError={handleUploadError}
    >
      {({ open }) => {
        return (
          <button onClick={() => open()} className={buttonClass} type="button">
            {buttonText}
          </button>
        )
      }}
    </CldUploadWidget>
  )
}

// Enhanced multiple image upload component
type MultipleImageUploadProps = {
  options?: CloudinaryUploadWidgetOptions
  setImages: Dispatch<SetStateAction<NextCloudImage[]>>
  userId: string
  collectionId: string
  maxFiles?: number
  maxFileSize?: number
  allowedFormats?: Array<string>
  enableCropping?: boolean
  buttonText?: string
  buttonClass?: string
  theme?: 'default' | 'minimal' | 'white'
}

export const MultipleImageUpload = ({
  options,
  setImages,
  userId,
  collectionId,
  maxFiles = 10,
  maxFileSize = 5000000, // 5MB default
  allowedFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif'],
  enableCropping = false, // Usually disabled for multiple uploads
  buttonText = 'Upload Multiple Images',
  buttonClass = '',
  theme = 'default',
}: MultipleImageUploadProps) => {
  const handleUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
    if (!result.info || typeof result.info === 'string') return
    const info: CloudinaryUploadWidgetInfo = result.info

    const image: NextCloudImage = {
      src: info.public_id,
      alt: info.display_name || '',
      caption: info.display_name || '',
    }

    setImages(prev => [...prev, image])
  }

  const generateFolder = () => {
    return `users/${userId}/collections/${collectionId}`
  }

  const defaultOptions: CloudinaryUploadWidgetOptions = {
    // File constraints
    maxFileSize,
    maxFiles,
    multiple: true,
    clientAllowedFormats: allowedFormats,

    // Organization
    folder: generateFolder(),
    context: {
      title: '',
      description: '',
      collection_id: collectionId,
      user_id: userId,
      upload_type: 'collection_images',
    },
    tags: ['collection-image', `user-${userId}`, `collection-${collectionId}`],

    // Resource settings
    resourceType: 'image',

    // Upload sources
    sources: [
      'local',
      'camera',
      'url',
      'dropbox',
      'google_drive',
      'unsplash',
      'image_search',
    ],

    // Cropping settings (usually disabled for multiple uploads)
    cropping: enableCropping,
    showSkipCropButton: true,

    // UI/UX settings
    theme,
    singleUploadAutoClose: false, // Keep open for multiple uploads
    showAdvancedOptions: false,
    showCompletedButton: true,
    showPoweredBy: false,
    showUploadMoreButton: true,
    autoMinimize: false,

    // Button customization
    buttonCaption: buttonText,
    buttonClass,

    // Image validation
    maxImageWidth: 4000,
    maxImageHeight: 4000,
    minImageWidth: 100,
    minImageHeight: 100,
    validateMaxWidthHeight: true,

    // Queue settings
    queueViewPosition: 'bottom',

    // Search settings
    searchByRights: true,

    // Localization
    language: 'en',

    // Custom text for multiple uploads
    text: {
      'queue.title': `Upload Images (Max ${maxFiles})`,
      'queue.title_uploading_with_counter': 'Uploading {{num}} of {{total}}',
      'queue.title_processing_with_counter': 'Processing {{num}} of {{total}}',
      'local.browse': 'Browse Files',
      'local.dd_title_multiple': `Drag & Drop up to ${maxFiles} images here`,
      'queue.mini_title': 'Upload Queue',
      'queue.show_completed': 'Show Completed',
      'queue.retry': 'Retry',
      'queue.abort': 'Cancel',
      'queue.done': 'All images uploaded successfully!',
    },
  }

  const handleUploadError = (error: unknown) => {
    console.error('Upload failed:', error)
  }

  return (
    <CldUploadWidget
      uploadPreset="collection-images"
      options={{ ...defaultOptions, ...options }}
      onSuccess={handleUploadSuccess}
      onError={handleUploadError}
    >
      {({ open }) => {
        return (
          <button onClick={() => open()} className={buttonClass} type="button">
            {buttonText}
          </button>
        )
      }}
    </CldUploadWidget>
  )
}
