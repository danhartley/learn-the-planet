import { Collection } from '@/types'
import { getCollectionByShortId } from '@/api/database'

import { Gallery } from '@/components/common/Gallery'

export default async function Page({
  params,
}: {
  params: Promise<{ 'slug-shortId': string }>
}) {
  const { 'slug-shortId': slugShortId } = await params

  // Parse the combined slug-shortId to extract the shortId
  const lastDashIndex = slugShortId.lastIndexOf('-')
  const shortId = slugShortId.substring(lastDashIndex + 1)

  const collection: Collection<unknown> | undefined =
    await getCollectionByShortId(shortId)

  return <Gallery collection={collection} />
}
