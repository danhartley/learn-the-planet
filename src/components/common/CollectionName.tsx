import React, { Dispatch, SetStateAction } from 'react'
import { Operation, ContentHandlerType } from '@/types'

type Props = {
  name: string
  setName: Dispatch<SetStateAction<string>>
  operation: Operation
  type: ContentHandlerType
}

export function CollectionName({ operation, name, setName, type }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Get the input element from the form and extract its value
    const form = e.target as HTMLFormElement
    const inputElement = form.querySelector(
      '#collection-name'
    ) as HTMLInputElement
    const collectionName = inputElement.value
    setName(collectionName)
  }

  let display
  switch (operation) {
    case 'read':
      display = (
        <div>
          Collection name: <span>{name}</span>
        </div>
      )
      break
    case 'create':
      display = (
        <form onSubmit={handleSubmit}>
          <div className={`form-row ${type}`}>
            <label htmlFor="collection-name">Name</label>
            <input type="text" id="collection-name" />
          </div>
          <button type="submit" id="submit-name">
            Submit
          </button>
        </form>
      )
  }

  return <section className="group-block">{display}</section>
}
