import React, { Dispatch, SetStateAction } from 'react'

import { ContentHandlerType, Operation } from '@/types'

type Props = {
  type: ContentHandlerType
  operation: Operation
  setOperation: Dispatch<SetStateAction<Operation>>
}

const OPERATION_TEXTS = {
  taxon: {
    create: 'Create collection',
    read: 'View collection',
    update: 'Edit collection properties',
    'update-items': 'Add or remove taxa',
    'edit-state': 'Edit collection availability',
  },
  term: {
    create: 'Create collection',
    read: 'View collection',
    update: 'Edit collection properties',
    'update-items': 'Edit terms',
    'add-item': 'Add term',
    'add-raw-data': 'Add raw term data',
    'edit-state': 'Edit collection availability',
  },
  topic: {
    create: 'Create collection',
    read: 'View collection',
    update: 'Edit collection properties',
    'linked-collections': 'Edit linked collections',
    'update-items': 'Edit text, taxa, terms, credits, and images',
    'add-item': 'Add text, taxa, terms, credits, and images',
    'edit-state': 'Edit collection availability',
    'upload-images': 'Upload images',
  },
  trait: {
    create: 'Create collection',
    read: 'View collection',
    update: 'Edit collection properties',
    'linked-collections': 'Edit linked collections',
    'update-items': 'Edit traits',
    'add-item': 'Add trait',
    'add-raw-data': 'Add raw trait data',
    'edit-state': 'Edit collection availability',
  },
} as const

const getOperationText = (
  contentType: ContentHandlerType,
  operation: string
): string => {
  const typeTexts =
    OPERATION_TEXTS[contentType as unknown as keyof typeof OPERATION_TEXTS]
  return (
    (typeTexts as Record<string, string>)?.[operation] || 'Unknown operation'
  )
}

export const OperationSelector = ({ type, operation, setOperation }: Props) => {
  let operationTypes

  switch (type.toString()) {
    case 'topic':
      operationTypes = [
        'add-item',
        'upload-images',
        'update-items',
        'update',
        'linked-collections',
        'edit-state',
      ]
      break
    case 'trait':
    case 'term':
      operationTypes = [
        'add-item',
        'add-raw-data',
        'update-items',
        'update',
        'edit-state',
      ]
      break
    case 'taxon':
      operationTypes = ['update', 'edit-state', 'update-items']
      break
    default:
      operationTypes = ['update', 'edit-state', 'update-items']
  }

  const editOptions = operationTypes.map(option => {
    const operationTypeText = getOperationText(type, option)

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
    <div className="list-group">
      <ul className="list-group">{editOptions}</ul>
      <hr />
    </div>
  )
}
