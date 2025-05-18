import React, { Dispatch, SetStateAction } from 'react'
import { ContentHandlerType, LearningItem } from '@/types'
import { CollectionItemTermPicker } from './CollectionItemTermPicker'
import { CollectionItemTaxonPicker } from './CollectionItemTaxonPicker'
import { CollectionItemTraitPicker } from './CollectionItemTraitPicker'

type Props = {
  type: ContentHandlerType
  setItems: Dispatch<SetStateAction<LearningItem[] | undefined>>
}

export function CollectionItemPicker({ type, setItems }: Props) {
  type ComponentMap = {
    [key in ContentHandlerType]: React.ComponentType<any>
  }

  const itemComponent: ComponentMap = {
    term: CollectionItemTermPicker,
    taxon: CollectionItemTaxonPicker,
    topic: CollectionItemTaxonPicker,
    trait: CollectionItemTraitPicker,
  }

  const Component = itemComponent[type]

  return <Component setItems={setItems} />
}
