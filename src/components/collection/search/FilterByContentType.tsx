import { Dispatch, SetStateAction } from 'react'

import { ContentHandlerType } from '@/types'

type Props = {
  type: ContentHandlerType
  setType?: Dispatch<SetStateAction<ContentHandlerType>>
}

export const FilterByContentType = ({ type, setType }: Props) => {
  const types = ['topic', 'trait', 'taxon', 'term']

  const handleSelectType = (e: React.FormEvent) => {
    const selectedType = (e.target as HTMLInputElement)
      .value as unknown as ContentHandlerType

    if (setType) setType(selectedType)
  }

  const rbTypes = types?.map(rbType => {
    return (
      <li key={rbType}>
        <input
          type="radio"
          id={rbType}
          value={rbType}
          name="type"
          checked={rbType === type.toString()}
          onChange={handleSelectType}
        />
        <label htmlFor={rbType}>{rbType}</label>
      </li>
    )
  })

  return (
    <div className="group-block">
      <div className="group">
        <div>Select collection type</div>
        <div className="form-row">
          <ul>{rbTypes}</ul>
        </div>
      </div>
    </div>
  )
}
