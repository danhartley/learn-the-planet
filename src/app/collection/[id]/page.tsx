import { Collection } from '@/types'
import { getCollectionById } from '@/api/collections'

import { Gallery } from '@/components/common/Gallery'

export default async function Page<T>({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const collection: Collection<T> | undefined = await getCollectionById(id)

  return <Gallery collection={collection} />
}
