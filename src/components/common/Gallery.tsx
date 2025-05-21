import { Collection, ContentHandlerType } from '@/types'
import { TaxonGallery } from '@/components/common/TaxonGallery'
import { TermGallery } from '@/components/common/TermGallery'
import { TopicGallery } from '@/components/common/TopicGallery'
import { TraitGallery } from '@/components/common/TraitGallery'

type ComponentProps = {
  collection: Collection<unknown>
}

type GalleryProps<T> = {
  collection: Collection<T> | undefined
}

export function Gallery<T>({ collection }: GalleryProps<T>) {
  const pageMap: {
    [K in ContentHandlerType]: React.ComponentType<ComponentProps>
  } = {
    term: TermGallery as React.ComponentType<ComponentProps>,
    taxon: TaxonGallery as React.ComponentType<ComponentProps>,
    topic: TopicGallery as React.ComponentType<ComponentProps>,
    trait: TraitGallery as React.ComponentType<ComponentProps>,
  }

  if (!collection) {
    return <div>Collection not found</div>
  }

  const Component =
    pageMap[collection.type as ContentHandlerType] ||
    (() => <div>Component not found</div>)

  return <Component collection={collection} />
}
