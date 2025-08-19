import { notFound } from 'next/navigation'

import { CollectionProvider } from '@/contexts/CollectionContext'

import { Collection, CollectionSummary } from '@/types'
import {
  getCollectionByShortId,
  getCollectionSummaryByShortId,
} from '@/api/database'
import { extractShortId } from '@/utils/strings'

import { Gallery } from '@/components/common/Gallery'

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

  const collectionSummary: CollectionSummary | undefined =
    await getCollectionSummaryByShortId(shortId)

  return (
    <CollectionProvider>
      <Gallery collection={collection} collectionSummary={collectionSummary} />
    </CollectionProvider>
  )
}
