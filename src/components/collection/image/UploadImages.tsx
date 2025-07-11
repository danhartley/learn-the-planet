import React, { useState, useEffect } from 'react'

import { useSession } from 'next-auth/react'

import { useCollection } from '@/contexts/CollectionContext'

import { UserImageUpload } from '@/components/image/UserImageUpload'
import { ImageList } from '@/components/image/ImageList'

import { NextCloudImage } from '@/types'

export const UploadImages = () => {
  const { data: session } = useSession()
  const { collection } = useCollection()

  const userId = session?.user?.id

  return (
    <section aria-labelledby="new-section">
      <h2 id="new-section">Add images to collection</h2>
      <div className="group-block">
        <UserImageUpload
          collectionId={collection?.id || ''}
          userId={userId || ''}
        />
        <div className="form-row">
          <ImageList />
        </div>
      </div>
    </section>
  )
}
