import React, { Dispatch, SetStateAction } from 'react'
import { Operation, ContentType, ContentHandlerType } from '@/types'

type Props = {
  operation: Operation
  types?: ContentType[]
  type?: ContentHandlerType
  setType?: Dispatch<SetStateAction<ContentHandlerType>>
}

export function CollectionType({
  operation = 'read',
  types,
  type = 'topic',
  setType,
}: Props) {
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
      display = <ul>{rbTypes}</ul>
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
        <span>Select the type of collection you want to create</span>
        {display}
      </div>
    </section>
  )
}
