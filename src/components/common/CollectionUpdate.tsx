'use client'
import { useEffect } from 'react'
import { CollectionItemPicker } from '@/components/common/CollectionItemPicker'
import { CollectionExtensions } from '@/components/common/CollectionExtensions'
import { CollectionSelector } from '@/components/common/CollectionSelector'
import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'
import { CollectionTextField } from '@/components/common/CollectionTextField'

import { useCollectionOperations } from '@/hooks/useCollectionOperations'

import {
  Collection,
  ContentHandlerType,
  Operation,
  UpdateCollectionFieldsOptions,
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
    isUpdateValid,
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
  } = useCollectionOperations()

  useEffect(() => {
    setCollection(collection)
    setOperation('update' as Operation)
    setSelectedCollections(collection.collections?.map(c => c.name) || [])
    setType(collection.type as ContentHandlerType)
    setName(collection.name)
    setSlug(collection.slug)
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection.id])

  const handleOnChangeOperation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOperation = (e.target as HTMLInputElement).value
    setOperation(selectedOperation as Operation)
  }

  const operationTypes =
    type === 'topic'
      ? ['update', 'delete', 'update-collections']
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
    }
    setName(name)
    setSlug(slug)
    setCollectionsFields(fields)
    updateCollectionFields(fields)
  }

  return (
    !!collection && (
      <>
        <section aria-labelledby="edit-options">
          <h2 id="edit-options">{collection.name}</h2>
          <ul>{editOptions}</ul>
        </section>
        {operation === 'update' && (
          <>
            <CollectionTextField
              operation={operation}
              fieldValue={name}
              setFieldValue={setName}
              fieldText="name"
              type={type}
            />
            <CollectionTextField
              operation={operation}
              fieldValue={slug}
              setFieldValue={setSlug}
              fieldText="slug"
              type={type}
            />
          </>
        )}
        {operation === ('update-collections' as Operation) && (
          <>
            <CollectionSelector
              options={collectionSummaries.map(c => c.name)}
              selectedCollections={selectedCollections}
              setSelectedCollections={setSelectedCollections}
            />
            <div className="textarea-row">
              <button
                onClick={() => {
                  updateCollections()
                }}
              >
                Update collections
              </button>
              <div>
                <ApiResponseMessage apiResponse={apiResponse} />
              </div>
            </div>
          </>
        )}
        {operation === ('delete' as Operation) && (
          <section aria-labelledby="delete-collection">
            <div>
              <h2 id="delete-collection">Delete {type} collection</h2>
            </div>
            <div className="textarea-row">
              <button onClick={deleteCollection}>Delete collection</button>
            </div>
            <div>
              <ApiResponseMessage apiResponse={apiResponse} />
            </div>
          </section>
        )}
        {operation === ('update-items' as Operation) && (
          <CollectionItemPicker
            type={collection.type as ContentHandlerType}
            setItems={setItems}
            items={JSON.stringify(collection.items, null, 2)}
          />
        )}
        {needsCollectionItems &&
          operation === ('update-items' as Operation) && (
            <CollectionExtensions
              onAddProperties={addInaturalistProperties}
              isItemsValid={isItemsValid}
              isValid={isItemsValid}
              message={inatMessage}
            />
          )}
        {operation === 'update-items' && (
          <section aria-labelledby="edit-collection">
            <div>
              <h2 id="edit-collection">Edit {type} collection</h2>
              <div>{operationMessage}</div>
            </div>
            <div className="textarea-row">
              <button disabled={!isUpdateValid} onClick={updateCollectionItems}>
                Update collection items
              </button>
              <div>
                <ApiResponseMessage apiResponse={apiResponse} />
              </div>
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
              <div>
                <ApiResponseMessage apiResponse={apiResponse} />
              </div>
            </div>
          </section>
        )}
      </>
    )
  )
}
