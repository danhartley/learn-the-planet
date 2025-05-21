import React, { Dispatch, SetStateAction } from 'react'
import { ContentHandlerType } from '@/types'
import { CollectionItemTermPicker } from './CollectionItemTermPicker'
import { CollectionItemTaxonPicker } from './CollectionItemTaxonPicker'
import { CollectionItemTraitPicker } from './CollectionItemTraitPicker'
import { CollectionItemTopicPicker } from './CollectionItemTopicPicker'

// Create a generic props type for component props
type ComponentProps = {
  setItems: Dispatch<SetStateAction<unknown[] | undefined>>
}

// Main props type for the CollectionItemPicker
type Props = {
  type: ContentHandlerType
  setItems: Dispatch<SetStateAction<unknown[] | undefined>>
}

export function CollectionItemPicker({ type, setItems }: Props) {
  // Create a type-safe component map
  const itemComponent: {
    [K in ContentHandlerType]: React.ComponentType<ComponentProps>
  } = {
    term: CollectionItemTermPicker as React.ComponentType<ComponentProps>,
    taxon: CollectionItemTaxonPicker as React.ComponentType<ComponentProps>,
    topic: CollectionItemTopicPicker as React.ComponentType<ComponentProps>,
    trait: CollectionItemTraitPicker as React.ComponentType<ComponentProps>,
  }

  const Component = itemComponent[type]

  return <Component setItems={setItems} />
}
