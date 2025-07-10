import React, { useState, useEffect } from 'react'

import { useSession } from 'next-auth/react'

import { useCollection } from '@/contexts/CollectionContext'

import { UserImageUpload } from '@/components/image/UserImageUpload'
import { ImagesList } from '@/components/image/ImagesList'

import { NextCloudImage } from '@/types'

export const UploadImages = () => {
  const { data: session, status } = useSession()
  const { collection } = useCollection()
  const [images, setImages] = useState<NextCloudImage[] | undefined>()
  const [image, setImage] = useState<NextCloudImage | undefined>()

  useEffect(() => {
    if (image) {
      setImages(prevImages => (prevImages ? [...prevImages, image] : [image]))
    }
  }, [image])

  const userId = session?.user?.id

  return (
    <section aria-labelledby="new-section">
      <h2 id="new-section">Add images to collection</h2>
      <div className="group-block">
        <UserImageUpload
          setImage={setImage}
          collectionId={collection?.id || ''}
          userId={userId || ''}
        />
        <div className="form-row">
          <ImagesList />
        </div>
      </div>
    </section>
  )
}
