import React, { useState } from 'react'

import { SectionTypeSelector } from '@/components/collection/topic/add/SectionTypeSelector'
import { AddToTopicMap } from '@/components/collection/topic/add/AddToTopicMap'

import { SectionType } from '@/types'

export const AddToTopic = () => {
  const [selectedOption, setSelectedOption] = useState<SectionType>('text')

  return (
    <>
      <SectionTypeSelector
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />

      <AddToTopicMap sectionType={selectedOption} />
    </>
  )
}
