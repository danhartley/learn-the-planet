import React, { useState } from 'react'

import { SectionTypeSelector } from '@/components/collection/topic/add/SectionTypeSelector'
import { SectionTypeSelectionToTopicMap } from '@/components/collection/topic/add/SectionTypeSelectionToTopicMap'

import { SectionType } from '@/types'

export const AddTopic = () => {
  const [selectedOption, setSelectedOption] = useState<SectionType>('text')

  return (
    <>
      <SectionTypeSelector
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />

      <SectionTypeSelectionToTopicMap sectionType={selectedOption} />
    </>
  )
}
