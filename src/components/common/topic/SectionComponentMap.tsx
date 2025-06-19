import React, { Dispatch, SetStateAction } from 'react'

import { AddImageSection } from '@/components/common/topic/AddImageSection'
import { AddTaxaSection } from '@/components/common/topic/AddTaxaSection'
import { AddTextSection } from '@/components/common/topic/AddTextSection'

import { SectionType, ApiResponse } from '@/types'

type ComponentProps = {
  setItems: Dispatch<SetStateAction<unknown[] | undefined>>
}

type Props = {
  sectionType: SectionType
  setItems: Dispatch<SetStateAction<unknown[] | undefined>>
  apiResponse?: ApiResponse
}

export const SectionComponentMap = ({
  sectionType,
  setItems,
  apiResponse,
}: Props) => {
  const sectionComponent: {
    [K in SectionType]: React.ComponentType<ComponentProps>
  } = {
    text: AddTextSection as React.ComponentType<ComponentProps>,
    image: AddImageSection as React.ComponentType<ComponentProps>,
    taxon: AddTaxaSection as React.ComponentType<ComponentProps>,
  }

  const Component = sectionComponent[sectionType]

  return <Component setItems={setItems} />
}
