import { notFound } from 'next/navigation'

import { Metadata, ResolvingMetadata } from 'next'

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

type Props = {
  params: Promise<{ 'slug-shortId': string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { 'slug-shortId': slugShortId } = await params
  const shortId = extractShortId(slugShortId)

  if (!shortId) {
    return {
      title: 'Collection not found',
    }
  }

  const collection: Collection<unknown> | undefined =
    await getCollectionByShortId(shortId)

  if (!collection) {
    return {
      title: 'Collection not found',
    }
  }

  return {
    title: collection.name,
  }
}

// export const metadata: Metadata = {
//   title: 'Collection article',
// }
