import { Collection, Definition } from '@/types'
import React from 'react'

type Props = {
  collection: Collection<Definition>
}

export const DefinitionGallery = ({ collection }: Props) => {
  const definitions = collection.items.map(item => {
    return (
      <React.Fragment key={item.id}>
        <dt>{item.term}</dt>
        <dd>{item.definition}</dd>
      </React.Fragment>
    )
  })

  return (
    <section aria-labelledby="definitions">
      <h2 id="definitions">Definitions</h2>
      <dl>{definitions}</dl>
    </section>
  )
}
