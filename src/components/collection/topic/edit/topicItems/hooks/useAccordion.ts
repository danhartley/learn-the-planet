import { useState } from 'react'
import { Topic } from '@/types'

export const useAccordion = (items?: Topic[]) => {
  // State to track which section is visible (only one at a time)
  // items?.length ? items[0].id : null
  const [visibleSectionId, setVisibleSectionId] = useState<string | null>()

  // Toggle visibility of a section (only one can be open at a time)
  const toggleSection = (sectionId: string) => {
    setVisibleSectionId(prev => (prev === sectionId ? null : sectionId))
  }

  const closeSection = (sectionId: string) => {
    if (visibleSectionId === sectionId) {
      setVisibleSectionId(null)
    }
  }

  const openSection = (sectionId: string) => {
    setVisibleSectionId(sectionId)
  }

  return {
    visibleSectionId,
    toggleSection,
    closeSection,
    openSection,
  }
}
