import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { SectionTypeSelector } from '@/components/common/topic/SectionTypeSelector'
import { SectionComponentMap } from '@/components/common/topic/SectionComponentMap'

import { SectionType, ApiResponse } from '@/types'

type Props = {
  setItems: Dispatch<SetStateAction<unknown[] | undefined>>
  apiResponse: ApiResponse
}

export const CreateTopicCollection = ({ setItems, apiResponse }: Props) => {
  const [selectedOption, setSelectedOption] = useState<SectionType>('text')
  const [examples, setExamples] = useState<unknown[] | undefined>()

  useEffect(() => {
    setItems([
      {
        id: crypto.randomUUID().split('-')[0],
        examples,
      },
    ])
  }, [examples])

  return (
    <>
      <SectionTypeSelector
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />

      <SectionComponentMap
        sectionType={selectedOption}
        setItems={setExamples}
        apiResponse={apiResponse}
      />
    </>
  )
}
