import React, { Dispatch, SetStateAction } from 'react'

import { ContentHandlerType, Operation } from '@/types'

type Props = {
  type: ContentHandlerType
  operation: Operation
  setOperation: Dispatch<SetStateAction<Operation>>
}

export const OperationSelector = ({ type, operation, setOperation }: Props) => {
  const operationTypes =
    type === 'topic'
      ? ['update', 'update-items', 'linked-collections', 'delete']
      : ['update', 'update-items', 'delete']

  const editOptions = operationTypes.map(option => {
    const operationTypeText = {
      create: 'Create collection',
      read: 'View collection',
      update: 'Edit collection properties',
      delete: 'Delete collection',
      'linked-collections': 'Edit linked collections',
      'update-items': 'Edit collection items',
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
