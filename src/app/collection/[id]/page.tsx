import { getCollections } from '@/api/collections'

import { Collection } from '@/types'

import ResponsiveImage from '@/components/common/ResponsiveImage'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const collections: Collection[] = await getCollections()
  const collection = collections.find(c => c.id === id)

  if (!collection?.items?.[0]?.images?.[0]) return // Ensure items and images are properly accessed

  const images = collection?.items.map(item => {
    const image = item?.images ? item.images[0] : null
    if (!image) return
    return (
      <div key={item.id + crypto.randomUUID()}>
        <ResponsiveImage id={item.id.toString()} img={image} />
      </div>
    )
  })

  return (
    <>
      <div>Collection: {id}</div>
      <div className="block">{images}</div>
    </>
  )
}
