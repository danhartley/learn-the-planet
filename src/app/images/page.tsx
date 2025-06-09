'use client'
import { CldImage } from 'next-cloudinary'

// By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
export default function Page() {
  return (
    <>
      <div className="cloudinary">
        <CldImage
          src="yiawjjajdnyb4r8rd5ai" // Use this sample image or upload your own via the Media Explorer
          width="500" // Transform the image: auto-crop to square aspect_ratio
          height="356"
          alt="test image"
          sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
        />
      </div>
      <div className="cloudinary">
        <CldImage
          src="osmcsgdepdfiaqncebvo" // Use this sample image or upload your own via the Media Explorer
          width="500" // Transform the image: auto-crop to square aspect_ratio
          height="356"
          alt="test image"
          sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
        />
      </div>
    </>
  )
}
