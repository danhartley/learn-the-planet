import Link from 'next/link'

import { auth } from '@/auth'

import { Collection } from '@/types'

import { SignIn } from '@/components/oauth/SignIn'
import { CollectionOwnerExportButton } from '@/components/common/CollectionOwnerExportButton'

type Props = {
  collection: Collection<unknown>
}

export const CollectionOwnerOptions = async ({ collection }: Props) => {
  const session = await auth()
  const canEdit = session?.user?.id === collection.ownerId

  return (
    <>
      {canEdit && (
        <>
          <hr />
          <Link
            href={`/collection/edit/${collection.slug}-${collection.shortId}`}
          >
            Edit {collection?.type.toString()}
          </Link>
          <CollectionOwnerExportButton collection={collection} />
        </>
      )}
      <SignIn signInText={'Sign in to edit collection'} />
    </>
  )
}
