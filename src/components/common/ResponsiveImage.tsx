import Image from 'next/image'
import { formatURL } from '@/utils/image'
import { Image as Img } from '@/types'

type Props = {
  id: string
  img: Img
  alt: string
}

export const ResponsiveImage = ({ id, img, alt }: Props) => {
  return (
    <Image
      id={id}
      src={formatURL(img?.url || '')}
      alt={alt}
      width={230}
      height={230}
      style={{ objectFit: 'contain' }}
    />
  )
}
