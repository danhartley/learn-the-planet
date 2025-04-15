import { getCollections } from '@/api/collections'

import { Collection } from '@/types'

import { TaxonCard } from '@/components/common/TaxonCard'

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
    console.log(item)
    return <TaxonCard key={item.id + crypto.randomUUID()} taxon={item} />
  })

  return (
    <>
      <div>Collection: {id}</div>
      <div className="block">{images}</div>
    </>
  )
}
