'use client'
import { useEffect } from 'react'
import { CollectionItemPicker } from '@/components/common/CollectionItemPicker'
import { CollectionExtensions } from '@/components/common/CollectionExtensions'

import { useCollectionOperations } from '@/hooks/useCollectionOperations'

import { Collection, ContentHandlerType, Operation } from '@/types'

type Props = {
  collection: Collection<unknown>
}
export const CollectionUpdate = ({ collection }: Props) => {
  const {
    items,
    setItems,
    setCollection,
    updateCollection,
    needsCollectionItems,
    addInaturalistProperties,
    isItemsValid,
    message,
    setType,
    type,
    isUpdateValid,
    operationMessage,
    operation,
    setOperation,
    deleteCollection,
  } = useCollectionOperations()

  useEffect(() => {
    setCollection(collection)
    setOperation('update' as Operation)
  }, [])

  useEffect(() => {
    setType(collection.type as ContentHandlerType)
    if (!items) return
  }, [items])

  const handleOnChangeOperation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOperation = (e.target as HTMLInputElement).value
    setOperation(selectedOperation as Operation)
  }

  const editOptions = ['update', 'delete'].map(option => {
    return (
      <li key={option}>
        <input
          id={option}
          type="radio"
          value={option}
          checked={option === operation}
          onChange={handleOnChangeOperation}
        />
        <label htmlFor={option}>
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </label>
      </li>
    )
  })

  return (
    <>
      <section>
        <h2>{collection.name}</h2>
        {operation}
        {type !== 'topic' && operation === ('update' as Operation) && (
          <CollectionItemPicker
            type={collection.type as ContentHandlerType}
            setItems={setItems}
          />
        )}
        {needsCollectionItems && operation === ('update' as Operation) && (
          <CollectionExtensions
            onAddProperties={addInaturalistProperties}
            isItemsValid={isItemsValid}
            isValid={isItemsValid}
            message={message}
          />
        )}
      </section>
      <section aria-labelledby="edit-options">
        <h2 id="edit-options">Edit options</h2>
        <ul>{editOptions}</ul>
      </section>
      {operation === ('update' as Operation) ? (
        <section aria-labelledby="edit-collection">
          <div>
            <h2 id="edit-collection">Edit {type} collection</h2>
            <div>{operationMessage}</div>
          </div>
          <button disabled={!isUpdateValid} onClick={updateCollection}>
            Update collection
          </button>
        </section>
      ) : (
        <section aria-labelledby="delete-collection">
          <div>
            <h2 id="delete-collection">Delete {type} collection</h2>
          </div>
          <button onClick={deleteCollection}>Delete collection</button>
        </section>
      )}
    </>
  )
}
