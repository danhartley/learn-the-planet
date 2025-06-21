import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { SectionTypeSelector } from '@/components/common/topic/SectionTypeSelector'
import { SectionComponentMap } from '@/components/common/topic/SectionComponentMap'

import { getShortId } from '@/utils/strings'

import { SectionType, ApiResponse, Topic, Taxon, NextCloudImage } from '@/types'

type Props = {
  setItems: Dispatch<SetStateAction<unknown[] | undefined>>
  apiResponse: ApiResponse
}

export const CreateTopicCollection = ({ setItems, apiResponse }: Props) => {
  const [selectedOption, setSelectedOption] = useState<SectionType>('text')
  const [childItems, setChildItems] = useState<unknown[]>()

  useEffect(() => {
    if (!childItems) return

    const item = {
      id: getShortId(),
    } as Topic

    switch (selectedOption) {
      case 'text':
        item.text = childItems as string[]
        break
      case 'taxon':
        item.examples = childItems as Taxon[]
        break
      case 'image':
        item.images = childItems as NextCloudImage[]
        break
    }

    setItems([item])
  }, [childItems])

  return (
    <>
      <SectionTypeSelector
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />

      <SectionComponentMap
        sectionType={selectedOption}
        setItems={setChildItems}
        apiResponse={apiResponse}
      />
    </>
  )
}
