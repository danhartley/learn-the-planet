'use client'
import { useState } from 'react'
import { CldImage } from 'next-cloudinary'

import { NextCloudImage } from '@/types'

type Props = {
  images: NextCloudImage[] | undefined
}

export const NextCloudinaryImageList = ({ images }: Props) => {
  const [selectedImages, setSelectedImages] = useState([])

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const img = (e.target as HTMLInputElement).value
    console.log('img', img)
  }

  return (
    <ul>
      {!!images &&
        images.map(img => {
          return (
            <li key={img.src} className="form-row">
              <input
                type="checkbox"
                name={img.src}
                id={img.src}
                value={img.src}
                onChange={addImage}
              />
              <CldImage
                key={img.src}
                src={img.src}
                width={75}
                height={75}
                alt={img.alt || ''}
                onClick={() => {
                  const checkbox = document.getElementById(
                    img.src
                  ) as HTMLInputElement | null
                  if (checkbox) {
                    checkbox.checked = !checkbox.checked
                    // Create a synthetic event object and call addImage directly
                    const syntheticEvent = {
                      target: checkbox,
                      currentTarget: checkbox,
                    } as React.ChangeEvent<HTMLInputElement>
                    addImage(syntheticEvent)
                  }
                }}
                style={{ cursor: 'pointer' }}
              />
              <label htmlFor={img.src}>{img.caption}</label>
            </li>
          )
        })}
    </ul>
  )
}
