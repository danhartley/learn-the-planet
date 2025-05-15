import { ContentHandlerType } from '@/types'
import { CollectionItemTermPicker } from './CollectionItemTermPicker'
import { CollectionItemTaxonPicker } from './CollectionItemTaxonPicker'
import { Component } from 'react'

type Props = {
  type: ContentHandlerType
}

export function CollectionItemPicker({ type }: Props) {
  type ComponentMap = {
    [key in ContentHandlerType]: React.ComponentType<any>
  }

  const itenComponent: ComponentMap = {
    term: CollectionItemTermPicker,
    taxon: CollectionItemTaxonPicker,
    topic: CollectionItemTaxonPicker,
    trait: CollectionItemTaxonPicker,
  }

  const Component = itenComponent[type]

  return (
    <div>
      <Component />
    </div>
  )
}
