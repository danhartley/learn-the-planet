import React from 'react'

import { useCollection } from '@/contexts/CollectionContext'

// import { TermItems } from '@/components/collection/TermItems'
import { TermJson } from '@/components/collection/term/TermJson'
import { AddToTaxon } from '@/components/collection/taxon/add/AddToTaxon'
import { AddToTopic } from '@/components/collection/topic/add/AddToTopic'

import { ContentHandlerType } from '@/types'

export function AddToItems() {
  const { collection } = useCollection()
  const itemComponent: {
    [K in ContentHandlerType]: React.ComponentType
  } = {
    term: TermJson,
    taxon: AddToTaxon,
    topic: AddToTopic,
    trait: () => {
      return <div>traits</div>
    },
  }

  const Component = itemComponent[collection?.type || 'topic']

  return <Component />
}
