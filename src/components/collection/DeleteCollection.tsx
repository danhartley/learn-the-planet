import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useCollection } from '@/contexts/CollectionContext'
import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

export const DeleteCollection = () => {
  const { collection, deleteCollection, apiResponse } = useCollection()
  const router = useRouter()

  const handleDeleteCollection = () => {
    if (collection) {
      const confirmed = window.confirm(
        `Are you sure you want to delete the "${collection.type}" collection? This action cannot be undone.`
      )

      if (confirmed) {
        deleteCollection(collection)
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
        <h2 id="delete-collection">Delete {collection?.type} collection</h2>
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
