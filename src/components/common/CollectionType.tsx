import React, { Dispatch, SetStateAction } from 'react'
import { Operation, ContentType, ContentHandlerType } from '@/types'

type Props = {
  operation: Operation
  types?: ContentType[]
  type?: ContentHandlerType
  setType?: Dispatch<SetStateAction<ContentHandlerType>>
}

export const CollectionType = ({
  operation = 'read',
  type = 'topic',
  setType,
}: Props) => {
  const types: ContentType[] = [
    {
      key: 'topic',
      value: 'topic',
      description: 'Create a guide, lesson or overview',
    },
    {
      key: 'trait',
      value: 'trait',
      description: 'Create a collection of traits with examples',
    },
    {
      key: 'taxon',
      value: 'taxon',
      description: 'Create a collection of iNaturalist taxa',
    },
    {
      key: 'term',
      value: 'term',
      description: 'Create a collection of terms and their definitions',
    },
  ]

  // Get the description for the currently selected type
  const getCurrentTypeDescription = () => {
    const currentType = types.find(t => t.value === type)
    return currentType?.description || ''
  }

  let display
  const handleSelectType = (e: React.FormEvent) => {
    const selectedType = (e.target as HTMLInputElement)
      .value as ContentHandlerType

    if (setType) setType(selectedType)
  }

  switch (operation) {
    case 'create':
      const rbTypes = types?.map(rbType => {
        return (
          <li key={rbType.key}>
            <input
              type="radio"
              id={rbType.key}
              value={rbType.value}
              name="type"
              onChange={handleSelectType}
              checked={rbType.value === type}
            />
            <label htmlFor={rbType.key}>{rbType.value}</label>
          </li>
        )
      })
      display = (
        <>
          <div>
            <ul>{rbTypes}</ul>
          </div>
          <div>
            <em>{getCurrentTypeDescription()}</em>
          </div>
        </>
      )
      break
    default:
      display = (
        <div>
          Collection type: <span>{type}</span>
        </div>
      )
      break
  }
  return (
    <section aria-labelledby="collection-type" className="group-block">
      <h2 id="collection-type">Collection type</h2>
      <div className="column-group">
        <span>Select the type of collection you want to create.</span>
        {display}
      </div>
    </section>
  )
}
