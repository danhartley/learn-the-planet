/* eslint-disable react/forbid-dom-props */
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { formatURL } from '@/utils/image'
import { Image as Img } from '@/types'

type Props = {
  id: string
  img: Img
  alt: string
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
}

export const ResponsiveImage = ({
  id,
  img,
  alt,
  objectFit = 'contain',
}: Props) => {
  const [showDetails, setShowDetails] = useState(false)
  const [imageWidth, setImageWidth] = useState<number>(230)
  const [imageHeight, setImageHeight] = useState<number>(230)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (imageRef.current && imageRef.current.parentElement) {
      setImageWidth(imageRef.current.parentElement.offsetWidth - 2)
      setImageHeight(imageRef.current.parentElement.offsetHeight - 1)
    }
  }, [])

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const hasDetails =
    img?.licenceCode || img?.attribution || img?.attributionName

  return (
    <div onClick={hasDetails ? toggleDetails : undefined}>
      {!showDetails ? (
        <Image
          ref={imageRef}
          id={id}
          src={formatURL(img?.url || '')}
          alt={alt}
          width={230}
          height={230}
          style={{ objectFit: objectFit }}
        />
      ) : (
        <>
          <div
            className="img-reverse"
            style={{ width: imageWidth, height: imageHeight }}
          >
            {img?.licenceCode && (
              <div>
                <span>
                  <em>License</em>
                </span>{' '}
                {img.licenceCode}
              </div>
            )}
            {img?.attribution && (
              <div>
                <span>
                  <em>Attribution</em>
                </span>{' '}
                {img.attribution}
              </div>
            )}
            {/* {img?.attributionName && (
              <div>
                <span>Attribution Name:</span> {img.attributionName}
              </div>
            )} */}
          </div>
        </>
      )}
    </div>
  )
}
