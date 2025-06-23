import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useCollection } from '@/contexts/CollectionContext'
import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

export const DeleteCollection = () => {
  const { collection, deleteCollection, apiResponse } = useCollection()
  const router = useRouter()

  const handleDeleteCollection = () => {
    if (collection) deleteCollection(collection)
  }

  useEffect(() => {
    if (apiResponse.success) {
      // router.push('/collections')
    }
  }, [apiResponse.success, router])

  return (
    <section aria-labelledby="delete-collection">
      <div>
        <h2 id="delete-collection">Delete {collection?.type} collection</h2>
      </div>
      <div className="form-row">
        <button onClick={handleDeleteCollection}>Delete collection</button>
        <ApiResponseMessage apiResponse={apiResponse} />
      </div>
    </section>
  )
}
