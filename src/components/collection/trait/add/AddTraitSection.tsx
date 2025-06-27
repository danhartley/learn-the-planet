import React, { useState } from 'react'

import { SectionTypeSelector } from '@/components/collection/trait/add/SectionTypeSelector'
import { SectionTypeSelectionToTraitMap } from '@/components/collection/trait/add/SectionTypeSelectionToTraitMap'

import { TraitSectionType } from '@/types'

export const AddTraitSection = () => {
  const [selectedOption, setSelectedOption] =
    useState<TraitSectionType>('morphology')

  return (
    <>
      <SectionTypeSelector
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />

      <SectionTypeSelectionToTraitMap sectionType={selectedOption} />
    </>
  )
}
