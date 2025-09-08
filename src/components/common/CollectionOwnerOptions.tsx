'use client'

import Link from 'next/link'

import { useSession } from 'next-auth/react'

import { useAuthenticatedAuthor } from '@/hooks/useAuthenticatedAuthor'
import { SignIn } from '@/components/oauth/SignIn'
import { CollectionOwnerExportButton } from '@/components/common/CollectionOwnerExportButton'

import { Collection, SessionState } from '@/types'

type Props = {
  collection: Collection<unknown>
}

export const CollectionOwnerOptions = ({ collection }: Props) => {
  const { data: session } = useSession()
  const authenticatedAuthor = useAuthenticatedAuthor(
    session as unknown as SessionState
  )

  const canEdit =
    session?.user?.id === collection.ownerId ||
    authenticatedAuthor?.role === 'admin'

  return (
    <div className="column-group">
      <hr />
      <SignIn
        signInText={'Sign in to edit collection'}
        className="wide login"
      />
      {canEdit && (
        <>
          <Link
            href={`/collection/edit/${collection.slug}-${collection.shortId}`}
          >
            Edit {collection?.type.toString()}
          </Link>
          <CollectionOwnerExportButton collection={collection} />
        </>
      )}
    </div>
  )
}
