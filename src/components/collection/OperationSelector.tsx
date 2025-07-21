import React, { Dispatch, SetStateAction } from 'react'

import { ContentHandlerType, Operation } from '@/types'

type Props = {
  type: ContentHandlerType
  operation: Operation
  setOperation: Dispatch<SetStateAction<Operation>>
}

export const OperationSelector = ({ type, operation, setOperation }: Props) => {
  let operationTypes

  switch (type) {
    case 'topic':
      operationTypes = [
        'update',
        'edit-state',
        'update-items',
        'linked-collections',
        'add-item',
        'upload-images',
      ]
      break
    case 'trait':
    case 'taxon':
    case 'term':
      operationTypes = [
        'update',
        'edit-state',
        'update-items',
        'add-item',
        'add-raw-data',
      ]
      break
    default:
      operationTypes = ['update', 'edit-state', 'update-items']
  }

  const editOptions = operationTypes.map(option => {
    const operationTypeText = {
      create: 'Create collection',
      read: 'View collection',
      update: 'Edit collection properties',
      'linked-collections': 'Edit linked collections',
      'update-items': 'Edit collection items',
      'add-item': 'Add text, taxa, credits, and images',
      'add-raw-data': 'Add raw data',
      'edit-state': 'Edit collection availability',
      'upload-images': 'Upload images',
    }[option as Operation]

    const handleOnChangeOperation = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const selectedOperation = (e.target as HTMLInputElement).value
      setOperation(selectedOperation as Operation)
    }

    return (
      <li key={option}>
        <input
          id={option}
          type="radio"
          value={option}
          checked={option === operation}
          onChange={handleOnChangeOperation}
        />
        <label htmlFor={option}>{operationTypeText}</label>
      </li>
    )
  })

  return (
    <>
      <ul className="list-group">{editOptions}</ul>
      <hr />
    </>
  )
}
