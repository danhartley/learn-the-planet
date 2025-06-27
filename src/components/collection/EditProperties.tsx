import React, { useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { CollectionTextField } from '@/components/common/CollectionTextField'
import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { UpdateCollectionFieldsOptions } from '@/types'

export const EditProperties = () => {
  const { collection, updateCollectionFields, apiResponse } = useCollection()
  const [name, setName] = useState<string>(collection?.name || '')
  const [slug, setSlug] = useState<string>(collection?.slug || '')
  const [imageUrl, setImageUrl] = useState<string>(collection?.imageUrl || '')

  const handleFieldsChange = () => {
    const newFields = {
      name,
      slug,
      imageUrl,
    } as UpdateCollectionFieldsOptions
    if (collection) updateCollectionFields(collection, newFields)
  }

  return (
    <>
      <div className="group-block">
        <CollectionTextField
          fieldValue={name}
          setFieldValue={setName}
          fieldText="Collection name"
          type={collection?.type || 'topic'}
        />
      </div>

      <div className="group-block">
        <CollectionTextField
          fieldValue={slug}
          setFieldValue={setSlug}
          fieldText="Collection slug"
          type={collection?.type || 'topic'}
        />
      </div>

      <div className="group-block">
        <CollectionTextField
          fieldValue={imageUrl}
          setFieldValue={setImageUrl}
          fieldText="Collection image url"
          type={collection?.type || 'topic'}
        />
      </div>

      <section aria-labelledby="edit-collection">
        <div>
          <h2 id="edit-collection">Edit {collection?.type} collection</h2>
        </div>
        <div className="form-row">
          <button onClick={handleFieldsChange} className="save">
            Update collection fields
          </button>
          <ApiResponseMessage apiResponse={apiResponse} />
        </div>
      </section>
    </>
  )
}
