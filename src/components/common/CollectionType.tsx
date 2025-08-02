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
  type = 'topic' as unknown as ContentHandlerType,
  setType,
}: Props) => {
  const types: ContentType[] = [
    {
      key: 'topic',
      value: 'topic' as unknown as ContentHandlerType,
      description: 'Create a guide, a lesson or a field notes entry',
    },
    {
      key: 'trait',
      value: 'trait' as unknown as ContentHandlerType,
      description: 'Create a collection of taxa traits with examples',
    },
    {
      key: 'taxon',
      value: 'taxon' as unknown as ContentHandlerType,
      description: 'Create a collection of iNaturalist taxa',
    },
    {
      key: 'term',
      value: 'term' as unknown as ContentHandlerType,
      description: 'Create a collection of terms and their definitions',
    },
  ]

  const getCurrentTypeDescription = () => {
    const currentType = types.find(t => t.value === type)
    return currentType?.description || ''
  }

  let display
  const handleSelectType = (e: React.FormEvent) => {
    const selectedType = (e.target as HTMLInputElement)
      .value as unknown as ContentHandlerType

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
              value={rbType.value.toString()}
              name="type"
              onChange={handleSelectType}
              checked={rbType.value === type}
            />
            <label htmlFor={rbType.key}>{rbType.value.toString()}</label>
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
          Collection type: <span>{type.toString()}</span>
        </div>
      )
      break
  }
  return (
    <>
      <section aria-labelledby="collection-type" className="group-block">
        <h2 id="collection-type">Collection type</h2>
        <div className="column-group">
          <span>Select the type of collection you want to create.</span>
          {display}
        </div>
      </section>
      {/* <div className="column-group">
        <div>
          Once you've created a collection, you will be taken to a new page with
          options specific to the type of collection you selected.
        </div>
        <div>
          By default, this collection is private. Only you can see it until you
          make it public.
        </div>
      </div> */}
    </>
  )
}
