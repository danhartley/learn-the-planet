import { notFound } from 'next/navigation'

import { CollectionUpdate } from '@/components/archived/CollectionUpdate'

import { Collection } from '@/types'
import { getCollectionByShortId } from '@/api/database'
import { extractShortId } from '@/utils/strings'

export default async function Page({
  params,
}: {
  params: Promise<{ 'slug-shortId': string }>
}) {
  const { 'slug-shortId': slugShortId } = await params

  const shortId = extractShortId(slugShortId)

  if (!shortId) {
    notFound() // This will show the 404 page
  }

  const collection: Collection<unknown> | undefined =
    await getCollectionByShortId(shortId)

  return !!collection && <CollectionUpdate collection={collection} />
}
