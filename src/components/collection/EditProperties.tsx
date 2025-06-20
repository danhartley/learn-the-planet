import React, { useState } from 'react'

import { CollectionTextField } from '@/components/common/CollectionTextField'
import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { Collection, UpdateCollectionFieldsOptions, ApiResponse } from '@/types'

type Props = {
  collection: Collection<unknown>

  handleFieldsChange: (newFields: UpdateCollectionFieldsOptions) => void
  apiResponse: ApiResponse
}

export const EditProperties = ({
  collection,
  handleFieldsChange,
  apiResponse,
}: Props) => {
  const [name, setName] = useState<string>(collection.name)
  const [slug, setSlug] = useState<string>(collection.slug)
  const [imageUrl, setImageUrl] = useState<string>(collection?.imageUrl || '')

  return (
    <>
      <div className="group-block">
        <CollectionTextField
          fieldValue={name}
          setFieldValue={setName}
          fieldText="Collection name"
          type={collection.type}
        />
      </div>

      <div className="group-block">
        <CollectionTextField
          fieldValue={slug}
          setFieldValue={setSlug}
          fieldText="Collection slug"
          type={collection.type}
        />
      </div>

      <div className="group-block">
        <CollectionTextField
          fieldValue={imageUrl}
          setFieldValue={setImageUrl}
          fieldText="Collection image url"
          type={collection.type}
        />
      </div>

      <section aria-labelledby="edit-collection">
        <div>
          <h2 id="edit-collection">Edit {collection.type} collection</h2>
        </div>
        <div className="form-row">
          <button onClick={() => handleFieldsChange({ name, slug, imageUrl })}>
            Update collection fields
          </button>
          <ApiResponseMessage apiResponse={apiResponse} />
        </div>
      </section>
    </>
  )
}
