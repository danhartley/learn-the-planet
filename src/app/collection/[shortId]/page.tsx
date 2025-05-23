import { Collection } from '@/types'
import { getCollectionByShortId } from '@/api/database'

import { Gallery } from '@/components/common/Gallery'

export default async function Page({
  params,
}: {
  params: Promise<{ shortId: string }>
}) {
  const { shortId } = await params

  const collection: Collection<unknown> | undefined =
    await getCollectionByShortId(shortId)
  return <Gallery collection={collection} />
}
