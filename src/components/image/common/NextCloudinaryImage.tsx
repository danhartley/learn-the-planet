'use client'
import { CldImage } from 'next-cloudinary'

import { NextCloudImage } from '@/types'

export const NextCloudinaryImage = ({
  id,
  src,
  width = 500,
  height = 356,
  alt,
  sizes = `(max-width: 768px) 100vw,
           (max-width: 1200px) 50vw,
            33vw,
            height: "auto"`,
  caption,
}: NextCloudImage) => {
  return (
    <div className="cloudinary">
      <figure>
        <CldImage
          id={id}
          src={src}
          width={width}
          height={height}
          alt={alt || caption}
          sizes={sizes}
        />
        <figcaption>
          <div>
            <div>{caption}</div>
          </div>
        </figcaption>
      </figure>
    </div>
  )
}
