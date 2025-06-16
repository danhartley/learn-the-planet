import React, { Dispatch, SetStateAction } from 'react'

import { CollectionTextField } from '@/components/common/CollectionTextField'
import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import {
  ContentHandlerType,
  Operation,
  UpdateCollectionFieldsOptions,
  ApiResponse,
} from '@/types'

type Props = {
  operation: Operation
  name: string
  type: ContentHandlerType
  setName: Dispatch<SetStateAction<string>>
  slug: string
  setSlug: Dispatch<SetStateAction<string>>
  imageUrl: string
  setImageUrl: Dispatch<SetStateAction<string>>
  apiResponse: ApiResponse
  setCollectionsFields: Dispatch<
    SetStateAction<UpdateCollectionFieldsOptions | undefined>
  >
  updateCollectionFields: (
    fields: UpdateCollectionFieldsOptions
  ) => Promise<void>
}

export const CollectionUpdateCollectionFields = ({
  operation,
  name,
  type,
  setName,
  slug,
  setSlug,
  imageUrl,
  setImageUrl,
  apiResponse,
  setCollectionsFields,
  updateCollectionFields,
}: Props) => {
  const handleUpdateFields = () => {
    const fields: UpdateCollectionFieldsOptions = {
      name,
      slug,
      imageUrl,
    }
    setName(name)
    setSlug(slug)
    setImageUrl(imageUrl)
    setCollectionsFields(fields)
    updateCollectionFields(fields)
  }

  return (
    operation === 'update' && (
      <>
        <div className="group-block">
          <CollectionTextField
            operation={operation}
            fieldValue={name}
            setFieldValue={setName}
            fieldText="Collection name"
            type={type}
          />
        </div>

        <div className="group-block">
          <CollectionTextField
            operation={operation}
            fieldValue={slug}
            setFieldValue={setSlug}
            fieldText="Collection slug"
            type={type}
          />
        </div>

        <div className="group-block">
          <CollectionTextField
            operation={operation}
            fieldValue={imageUrl}
            setFieldValue={setImageUrl}
            fieldText="Collection image url"
            type={type}
          />
        </div>

        <section aria-labelledby="edit-collection">
          <div>
            <h2 id="edit-collection">Edit {type} collection</h2>
          </div>
          <div className="form-row">
            <button onClick={handleUpdateFields}>
              Update collection fields
            </button>
            <ApiResponseMessage apiResponse={apiResponse} />
          </div>
        </section>
      </>
    )
  )
}
