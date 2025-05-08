import { Collection, ContentHandlerType } from '@/types'
import { TaxonGallery } from '@/components/common/TaxonGallery'
import { TermGallery } from '@/components/common/TermGallery'
import { TopicGallery } from '@/components/common/TopicGallery'
import { TraitGallery } from '@/components/common/TraitGallery'

interface GalleryProps<T> {
  collection: Collection<T> | undefined
}

export function Gallery<T>({ collection }: GalleryProps<T>) {
  const pageMap: Record<ContentHandlerType, React.ComponentType<any>> = {
    taxon: TaxonGallery,
    term: TermGallery,
    trait: TraitGallery,
    topic: TopicGallery,
  }

  if (!collection) {
    return <div>Collection not found</div>
  }

  const Component =
    pageMap[collection.type as ContentHandlerType] ||
    (() => <div>Component not found</div>)

  return <Component collection={collection} />
}
