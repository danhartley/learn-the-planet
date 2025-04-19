import { Collection, ContentHandlerType } from '@/types'
import { getCollectionById } from '@/api/collections'

import { TaxonGallery } from '@/components/common/TaxonGallery'
import { DefinitionGallery } from '@/components/common/DefinitionGallery'

export default async function Page<T>({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const collection: Collection<T> | undefined = await getCollectionById(id)

  const pageMap: Record<ContentHandlerType, React.ComponentType<any>> = {
    taxonomy: TaxonGallery,
    definition: DefinitionGallery,
  }

  if (!collection) {
    return <div>Collection not found</div>
  }

  const Component =
    pageMap[collection.type as ContentHandlerType] ||
    (() => <div>Component not found</div>)

  return <Component collection={collection} />
}
