import React, { Dispatch, SetStateAction } from 'react'

import { CollectionItemTermPicker } from './CollectionItemTermPicker'
import { CollectionItemTraitPicker } from './CollectionItemTraitPicker'
import { CollectionInatTaxonPicker } from '@/components/common/taxon/CollectionInatTaxonPicker'
import { CreateTopicCollection } from '@/components/common/topic/CreateTopicCollection'

import { ContentHandlerType, Operation, Taxon, Collection } from '@/types'

type ComponentProps = {
  setItems: Dispatch<SetStateAction<unknown[] | undefined>>
  items: string | Taxon[]
  operation?: Operation
  collection?: Collection<unknown>
}

type Props = {
  type: ContentHandlerType
  setItems: Dispatch<SetStateAction<unknown[] | undefined>>
  items: string
  operation: Operation
  collection?: Collection<unknown> | undefined
}

export function CollectionItemPicker({
  type,
  setItems,
  items,
  operation,
  collection,
}: Props) {
  const itemComponent: {
    [K in ContentHandlerType]: React.ComponentType<ComponentProps>
  } = {
    term: CollectionItemTermPicker as React.ComponentType<ComponentProps>,
    taxon: CollectionInatTaxonPicker as React.ComponentType<ComponentProps>,
    topic: CreateTopicCollection as React.ComponentType<ComponentProps>,
    trait: CollectionItemTraitPicker as React.ComponentType<ComponentProps>,
  }

  const Component = itemComponent[type]

  const showComponent =
    operation === 'create' || (operation === 'update-items' && type !== 'topic')

  return (
    showComponent && (
      <Component
        setItems={setItems}
        items={items}
        operation={operation}
        collection={collection}
      />
    )
  )
}
