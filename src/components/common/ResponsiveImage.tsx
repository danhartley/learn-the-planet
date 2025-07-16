import Image from 'next/image'
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
  return (
    <Image
      id={id}
      src={formatURL(img?.url || '')}
      alt={alt}
      width={230}
      height={230}
      style={{ objectFit: objectFit }}
    />
  )
}
