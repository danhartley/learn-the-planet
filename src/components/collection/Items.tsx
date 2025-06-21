import React, { Dispatch, SetStateAction } from 'react'

import { CollectionItemTermPicker } from '@/components/common/CollectionItemTermPicker'
import { CollectionItemTraitPicker } from '@/components/common/CollectionItemTraitPicker'
import { AddTaxa } from '@/components/taxon/AddTaxa'
import { AddToTopic } from '@/components/common/topic/AddToTopic'

import { ContentHandlerType, Operation, Collection, ApiResponse } from '@/types'

type ComponentProps = {
  setItems: Dispatch<SetStateAction<unknown[] | undefined>>
  items: string | unknown[] | undefined
  operation?: Operation
  collection?: Collection<unknown>
  apiResponse?: ApiResponse
}

type Props = {
  type: ContentHandlerType
  setItems: Dispatch<SetStateAction<unknown[] | undefined>>
  items: string | unknown[] | undefined
  operation: Operation
  apiResponse: ApiResponse
}

export function Items({
  type,
  setItems,
  items,
  operation,
  apiResponse,
}: Props) {
  const itemComponent: {
    [K in ContentHandlerType]: React.ComponentType<ComponentProps>
  } = {
    term: CollectionItemTermPicker as React.ComponentType<ComponentProps>,
    taxon: AddTaxa as React.ComponentType<ComponentProps>,
    topic: AddToTopic as React.ComponentType<ComponentProps>,
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
        apiResponse={apiResponse}
      />
    )
  )
}
