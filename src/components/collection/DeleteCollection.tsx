import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useSession } from 'next-auth/react'

import { useAuthenticatedAuthor } from '@/hooks/useAuthenticatedAuthor'

import { useCollection } from '@/contexts/CollectionContext'
import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { CollectionSummary, CollectionStatus, SessionState } from '@/types'

type Props = {
  collectionSummary: CollectionSummary
}

export const DeleteCollection = ({ collectionSummary }: Props) => {
  const { data: session } = useSession()
  const authenticatedAuthor = useAuthenticatedAuthor(
    session as unknown as SessionState
  )
  const { collection, deleteCollection, apiResponse, updateCollectionState } =
    useCollection()
  const router = useRouter()

  const handleDeleteCollection = () => {
    if (collection) {
      const confirmed = window.confirm(
        `Are you sure you want to delete the "${collection.type}" collection? This action cannot be undone.`
      )
      console.log('authenticatedAuthor', authenticatedAuthor)
      if (confirmed) {
        if (authenticatedAuthor?.role.toString() === 'admin') {
          deleteCollection(collection)
        } else {
          // soft delete
          const status: CollectionStatus = 'deleted'
          updateCollectionState(collectionSummary, status)
        }
      }
    }
  }

  useEffect(() => {
    if (apiResponse.success) {
      // router.push('/collections')
    }
  }, [apiResponse.success, router])

  return (
    <section aria-labelledby="delete-collection">
      <div className="group">
        <h2 id="delete-collection">Delete collection</h2>
        <div>
          When you delete a collection, you will no longer have access to it.
        </div>
      </div>
      <div className="form-row">
        <button onClick={handleDeleteCollection} className="delete">
          Delete collection
        </button>
        <ApiResponseMessage apiResponse={apiResponse} />
      </div>
      <div>
        If you wish to recover a collection, please contact the site owner at{' '}
        <a href="mailto:dbmhartley@protonmail.com?subject=rRecover%20deleted%20collection">
          recover deleted collection
        </a>
        .
      </div>
    </section>
  )
}
