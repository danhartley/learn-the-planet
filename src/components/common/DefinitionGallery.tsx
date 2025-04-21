import React from 'react'
import { Collection, Definition } from '@/types'

type Props = {
  collection: Collection<Definition>
}

export const DefinitionGallery = ({ collection }: Props) => {
  const definitions = collection.items.map(item => {
    return (
      <React.Fragment key={item.id}>
        <dt>{item.term}</dt>
        <dd>
          <div>{item.definition}</div>
          <div>
            <em>{item.example}</em>
          </div>
          <div>
            <a href={item.source}>{item.source}</a>
          </div>
        </dd>
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
