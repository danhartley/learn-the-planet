import React from 'react'

import { useSession } from 'next-auth/react'

import { useCollection } from '@/contexts/CollectionContext'

import { UserImageUpload } from '@/components/image/UserImageUpload'
import { ImageList } from '@/components/image/ImageList'

export const UploadImages = () => {
  const { data: session } = useSession()
  const { collection } = useCollection()

  const userId = session?.user?.id

  return (
    <section aria-labelledby="upload-images">
      <h2 id="upload-images">Add images to collection</h2>
      <UserImageUpload
        collectionId={collection?.id || ''}
        userId={userId || ''}
      />
      <ImageList />
    </section>
  )
}
