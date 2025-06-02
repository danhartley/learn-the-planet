'use client'
import { CldImage } from 'next-cloudinary'

// By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
export default function Page() {
  return (
    <>
      <CldImage
        src="yiawjjajdnyb4r8rd5ai" // Use this sample image or upload your own via the Media Explorer
        width="500" // Transform the image: auto-crop to square aspect_ratio
        height="356"
        alt="test image"
      />
      <CldImage
        src="osmcsgdepdfiaqncebvo" // Use this sample image or upload your own via the Media Explorer
        width="500" // Transform the image: auto-crop to square aspect_ratio
        height="356"
        alt="test image"
      />
    </>
  )
}
