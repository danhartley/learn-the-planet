'use client'
import { useEffect } from 'react'
import { CollectionItemPicker } from '@/components/common/CollectionItemPicker'
import { CollectionExtensions } from '@/components/common/CollectionExtensions'
import { CollectionSelector } from '@/components/common/CollectionSelector'
import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'
import { CollectionName } from '@/components/common/CollectionName'

import { useCollectionOperations } from '@/hooks/useCollectionOperations'

import { Collection, ContentHandlerType, Operation } from '@/types'

type Props = {
  collection: Collection<unknown>
}
export const CollectionUpdate = ({ collection }: Props) => {
  const {
    setItems,
    setCollection,
    updateCollection,
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
  } = useCollectionOperations()

  useEffect(() => {
    setCollection(collection)
    setOperation('update' as Operation)
    setSelectedCollections(collection.collections?.map(c => c.name) || [])
    setType(collection.type as ContentHandlerType)
    setName(collection.name)
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

  return !!collection ? (
    <>
      <section>
        <h2>{collection.name}</h2>
      </section>
      <section aria-labelledby="edit-options">
        <h2 id="edit-options">Edit options</h2>
        <ul>{editOptions}</ul>
      </section>
      <CollectionName
        operation={operation}
        name={name}
        setName={setName}
        type={type}
      />
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
            <ApiResponseMessage apiResponse={apiResponse} />
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
      {needsCollectionItems && operation === ('update-items' as Operation) && (
        <CollectionExtensions
          onAddProperties={addInaturalistProperties}
          isItemsValid={isItemsValid}
          isValid={isItemsValid}
          message={inatMessage}
        />
      )}
      {(operation === 'update' || operation === 'update-items') && (
        <section aria-labelledby="edit-collection">
          <div>
            <h2 id="edit-collection">Edit {type} collection</h2>
            <div>{operationMessage}</div>
          </div>
          <div className="textarea-row">
            <button disabled={!isUpdateValid} onClick={updateCollection}>
              Update collection
            </button>
            <ApiResponseMessage apiResponse={apiResponse} />
          </div>
        </section>
      )}
    </>
  ) : null
}
