import React, { Dispatch, SetStateAction } from 'react'

import { CollectionItemTermPicker } from './CollectionItemTermPicker'
import { CollectionItemTaxonPicker } from './CollectionItemTaxonPicker'
import { CollectionItemTraitPicker } from './CollectionItemTraitPicker'
import { CollectionItemTopicPicker } from './CollectionItemTopicPicker'

import { ContentHandlerType, Operation } from '@/types'

type ComponentProps = {
  setItems: Dispatch<SetStateAction<unknown[] | undefined>>
  items: string
}

type Props = {
  type: ContentHandlerType
  setItems: Dispatch<SetStateAction<unknown[] | undefined>>
  items: string
  operation: Operation
}

export function CollectionItemPicker({
  type,
  setItems,
  items,
  operation,
}: Props) {
  const itemComponent: {
    [K in ContentHandlerType]: React.ComponentType<ComponentProps>
  } = {
    term: CollectionItemTermPicker as React.ComponentType<ComponentProps>,
    taxon: CollectionItemTaxonPicker as React.ComponentType<ComponentProps>,
    topic: CollectionItemTopicPicker as React.ComponentType<ComponentProps>,
    trait: CollectionItemTraitPicker as React.ComponentType<ComponentProps>,
  }

  const Component = itemComponent[type]

  return (
    ['update-items', 'create'].includes(operation) &&
    type !== ('topic' as ContentHandlerType) && (
      <Component setItems={setItems} items={items} />
    )
  )
}
