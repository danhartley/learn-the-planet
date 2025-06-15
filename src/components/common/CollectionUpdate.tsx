'use client'
import { useEffect } from 'react'

import Link from 'next/link'

import { CollectionItemPicker } from '@/components/common/CollectionItemPicker'
import { CollectionExtensions } from '@/components/common/CollectionExtensions'
import { CollectionSelector } from '@/components/common/CollectionSelector'
import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'
import { CollectionTextField } from '@/components/common/CollectionTextField'
import { CollectionTopicUpdate } from '@/components/common/edit/CollectionTopicUpdate'

import { useCollectionOperations } from '@/hooks/useCollectionOperations'

import {
  Collection,
  ContentHandlerType,
  Operation,
  UpdateCollectionFieldsOptions,
  Topic,
} from '@/types'

type Props = {
  collection: Collection<unknown>
}
export const CollectionUpdate = ({ collection }: Props) => {
  const {
    setItems,
    setCollection,
    updateCollectionItems,
    needsCollectionItems,
    addInaturalistProperties,
    isItemsValid,
    inatMessage,
    setType,
    type,
    operationMessage,
    operation,
    setOperation,
    deleteCollection,
    collectionSummaries,
    selectedCollections,
    setSelectedCollections,
    updateCollections,
    apiResponse,
    setName,
    name,
    slug,
    setSlug,
    setCollectionsFields,
    updateCollectionFields,
    imageUrl,
    setImageUrl,
    setInatMessage,
    isTopic,
  } = useCollectionOperations()

  useEffect(() => {
    setCollection(collection)
    setOperation('update' as Operation)
    setSelectedCollections(collection.collections?.map(c => c.name) || [])
    setType(collection.type as ContentHandlerType)
    setName(collection.name)
    setSlug(collection.slug)
    setImageUrl(collection.imageUrl || '')
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection.id])

  const handleOnChangeOperation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOperation = (e.target as HTMLInputElement).value
    setOperation(selectedOperation as Operation)
  }

  const operationTypes =
    type === 'topic'
      ? ['update', 'delete', 'update-items', 'update-collections']
      : ['update', 'delete', 'update-items']

  const editOptions = operationTypes.map(option => {
    return (
      <li key={option}>
        <input
          id={option}
          type="radio"
          value={option}
          checked={option === operation}
          onChange={handleOnChangeOperation}
        />
        <label htmlFor={option}>{option.replace('-', ' ')}</label>
      </li>
    )
  })

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
    !!collection && (
      <>
        <section aria-labelledby="edit-options">
          <h2 id="edit-options">
            <Link href={`/collection/${collection.slug}-${collection.shortId}`}>
              {collection.name}
            </Link>
          </h2>
          <ul>{editOptions}</ul>
        </section>
        {operation === 'update' && (
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
          </>
        )}
        {operation === ('update-collections' as Operation) && (
          <>
            <CollectionSelector
              options={collectionSummaries.map(c => c.name)}
              selectedCollections={selectedCollections}
              setSelectedCollections={setSelectedCollections}
            />
            <div className="form-row">
              <button
                onClick={() => {
                  updateCollections()
                }}
              >
                Update collections
              </button>
              <ApiResponseMessage apiResponse={apiResponse} />
            </div>
          </>
        )}
        {operation === ('delete' as Operation) && (
          <section aria-labelledby="delete-collection">
            <div>
              <h2 id="delete-collection">Delete {type} collection</h2>
            </div>
            <div className="form-row">
              <button onClick={deleteCollection}>Delete collection</button>
              <ApiResponseMessage apiResponse={apiResponse} />
            </div>
          </section>
        )}
        {operation === ('update-items' as Operation) && !isTopic && (
          <CollectionItemPicker
            type={collection.type as ContentHandlerType}
            setItems={setItems}
            items={JSON.stringify(collection.items, null, 2)}
          />
        )}
        {operation === ('update-items' as Operation) && isTopic && (
          <CollectionTopicUpdate collection={collection as Collection<Topic>} />
        )}
        {needsCollectionItems &&
          operation === ('update-items' as Operation) && (
            <CollectionExtensions
              onAddProperties={addInaturalistProperties}
              isItemsValid={isItemsValid}
              isValid={isItemsValid}
              message={inatMessage}
              setMessage={setInatMessage}
            />
          )}
        {operation === 'update-items' && !isTopic && (
          <section aria-labelledby="edit-collection">
            <div>
              <h2 id="edit-collection">Edit {type} collection</h2>
              <ApiResponseMessage apiResponse={operationMessage} />
            </div>
            <div className="form-row">
              <button disabled={!isItemsValid} onClick={updateCollectionItems}>
                Update collection items
              </button>
              <ApiResponseMessage apiResponse={apiResponse} />
            </div>
          </section>
        )}
        {operation === 'update' && (
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
        )}
      </>
    )
  )
}
