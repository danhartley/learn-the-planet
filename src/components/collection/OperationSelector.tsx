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
        'update-items',
        'linked-collections',
        'delete',
        'add-item',
      ]
      break
    case 'trait':
      operationTypes = ['update', 'update-items', 'delete', 'add-item']
      break
    default:
      operationTypes = ['update', 'update-items', 'delete']
  }

  const editOptions = operationTypes.map(option => {
    const operationTypeText = {
      create: 'Create collection',
      read: 'View collection',
      update: 'Edit collection properties',
      delete: 'Delete collection',
      'linked-collections': 'Edit linked collections',
      'update-items': 'Edit collection items',
      'add-item': 'Add item',
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

  return <ul>{editOptions}</ul>
}
