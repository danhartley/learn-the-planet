import { useState } from 'react'

export const useAccordion = () => {
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
