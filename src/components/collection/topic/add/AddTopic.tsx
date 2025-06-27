import React, { useState } from 'react'

import { SectionTypeSelector } from '@/components/collection/topic/add/SectionTypeSelector'
import { AddTopicMap } from '@/components/collection/topic/add/AddTopicMap'

import { SectionType } from '@/types'

export const AddTopic = () => {
  const [selectedOption, setSelectedOption] = useState<SectionType>('text')

  return (
    <>
      <SectionTypeSelector
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />

      <AddTopicMap sectionType={selectedOption} />
    </>
  )
}
