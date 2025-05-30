import { CollectionUpdate } from '@/components/common/CollectionUpdate'
import { Collection } from '@/types'
import { getCollectionByShortId } from '@/api/database'

export default async function Page({
  params,
}: {
  params: Promise<{ 'slug-shortId': string }>
}) {
  const { 'slug-shortId': slugShortId } = await params

  const lastDashIndex = slugShortId.lastIndexOf('-')
  const shortId = slugShortId.substring(lastDashIndex + 1)

  const collection: Collection<unknown> | undefined =
    await getCollectionByShortId(shortId)

  return (
    <>
      <h1>Edit collection</h1>
      {collection! && <CollectionUpdate collection={collection} />}
    </>
  )
}
