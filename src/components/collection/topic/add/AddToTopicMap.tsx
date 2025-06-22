import React, { Dispatch, SetStateAction } from 'react'

import { AddToTopicImage } from '@/components/collection/topic/add/AddToTopicImage'
import { AddToTopicTaxa } from '@/components/collection/topic/add/AddToTopicTaxa'
import { AddToTopicText } from '@/components/collection/topic/add/AddToTopicText'

import { SectionType, ApiResponse } from '@/types'

type Props = {
  sectionType: SectionType
  setItems: Dispatch<SetStateAction<unknown[] | undefined>>
  apiResponse: ApiResponse
}

export const AddToTopicMap = ({ sectionType }: Props) => {
  const sectionComponent: {
    [K in SectionType]: React.ComponentType
  } = {
    text: AddToTopicText,
    image: AddToTopicImage,
    taxon: AddToTopicTaxa,
  }

  const Component = sectionComponent[sectionType]

  return <Component />
}
