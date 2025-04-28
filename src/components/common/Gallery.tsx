import { Collection, ContentHandlerType } from '@/types'
import { TaxonGallery } from '@/components/common/TaxonGallery'
import { DefinitionGallery } from '@/components/common/DefinitionGallery'

interface GalleryProps<T> {
  collection: Collection<T> | undefined
}

export function Gallery<T>({ collection }: GalleryProps<T>) {
  const pageMap: Record<ContentHandlerType, React.ComponentType<any>> = {
    taxon: TaxonGallery,
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
