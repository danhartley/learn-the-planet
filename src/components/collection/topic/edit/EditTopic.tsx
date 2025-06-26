import React, { useState } from 'react'

import { SectionTypeSelector } from '@/components/collection/topic/edit/SectionTypeSelector'
import { EditTopicMap } from '@/components/collection/topic/edit/EditTopicMap'

import { SectionType } from '@/types'

export const EditTopic = () => {
  const [selectedOption, setSelectedOption] = useState<SectionType>('text')

  return (
    <>
      <SectionTypeSelector
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />

      <EditTopicMap sectionType={selectedOption} />
    </>
  )
}
