import Link from 'next/link'

import { auth } from '@/auth'

import { Collection, ContentHandlerType, CollectionSummary } from '@/types'
import { TaxonGallery } from '@/components/common/TaxonGallery'
import { TermGallery } from '@/components/common/TermGallery'
import { TopicGallery } from '@/components/common/TopicGallery'
import { TraitGallery } from '@/components/common/TraitGallery'
import { SignIn } from '@/components/oauth/SignIn'

type ComponentProps = {
  collection: Collection<unknown>
}

type GalleryProps<T> = {
  collection: Collection<T> | undefined
  collectionSummary: CollectionSummary | undefined
}

const PAGE_MAP = {
  term: TermGallery,
  taxon: TaxonGallery,
  topic: TopicGallery,
  trait: TraitGallery,
} as const

const getGalleryComponent = (
  type: ContentHandlerType
): React.ComponentType<ComponentProps> => {
  const Component = PAGE_MAP[type as unknown as keyof typeof PAGE_MAP]
  return (
    (Component as React.ComponentType<ComponentProps>) ||
    (() => <div>Component not found</div>)
  )
}

export async function Gallery<T>({ collection }: GalleryProps<T>) {
  if (!collection) {
    return <div>Collection not found</div>
  }

  const Component = getGalleryComponent(collection.type as ContentHandlerType)

  // Get session on server side
  const session = await auth()
  const canEdit = session?.user?.id === collection.ownerId

  return (
    <>
      <Component collection={collection} />
      {canEdit && (
        <>
          <hr />
          <Link
            href={`/collection/edit/${collection.slug}-${collection.shortId}`}
          >
            Edit {collection?.type.toString()}
          </Link>
        </>
      )}
      <SignIn signInText={'Sign in to edit collection'} />
    </>
  )
}
