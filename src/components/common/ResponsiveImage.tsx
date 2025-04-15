import Image from 'next/image'
import { createEOLUrl } from '@/utils/image'
import { Image as Img } from '@/types'

const ResponsiveImage = ({ id, img }: { id: string; img: Img }) => {
  return (
    <Image
      src={createEOLUrl(img?.url || '')}
      alt={id}
      width={230}
      height={230}
      style={{ objectFit: 'cover' }}
    />
  )
}

export default ResponsiveImage
