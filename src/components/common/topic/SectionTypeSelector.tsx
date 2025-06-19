import React, { Dispatch, SetStateAction } from 'react'
import { SectionType, SectionTypeOption } from '@/types'

type Props = {
  selectedOption: SectionType
  setSelectedOption: Dispatch<SetStateAction<SectionType>>
}
export const SectionTypeSelector = ({
  selectedOption,
  setSelectedOption,
}: Props) => {
  const sectionTypes = [
    {
      key: 'text' as SectionType,
      value: 'Text',
      description: 'Add a new text section',
    },
    {
      key: 'image' as SectionType,
      value: 'Image',
      description: 'Add an new image or images',
    },
    {
      key: 'taxon' as SectionType,
      value: 'Taxon',
      description: 'Add taxa from iNaturalist',
    },
  ] as SectionTypeOption[]

  const scrollToNewSection = () => {
    // Find the height of the section type selector
    const sectionTypeSelector = document.getElementById(
      'section-type-selector-section'
    )
    const sectionTypeSelectorHeight = sectionTypeSelector?.offsetHeight || 0

    // Find the component to display
    const newSection = document.getElementById('new-section')

    if (newSection) {
      // Get the element's position relative to the document
      const elementRect = newSection.getBoundingClientRect()
      const elementTop = elementRect.top + window.scrollY

      // Calculate the desired scroll position
      // Element position minus the offset we want from the top
      const targetScrollPosition = elementTop
      // const targetScrollPosition = elementTop - sectionTypeSelectorHeight

      // Scroll to the calculated position
      window.scrollTo({
        top: targetScrollPosition,
        behavior: 'smooth', // Optional: adds smooth scrolling animation
      })
    }
  }

  const selectOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value as SectionType)
    // Allow time for component to render
    setTimeout(() => {
      scrollToNewSection()
    }, 200)
  }

  const options = sectionTypes.map(option => {
    return (
      <li key={option.key}>
        <input
          name="rb-section-type"
          id={`${option.key}-section`}
          type="radio"
          value={option.key}
          onChange={selectOption}
          checked={option.key === selectedOption}
        />
        <label htmlFor={`${option.key}-section`}>{option.value}</label>
      </li>
    )
  })

  const getCurrentTypeDescription = () => {
    const currentType = sectionTypes.find(t => t.key === selectedOption)
    return currentType?.description || ''
  }

  return (
    <section
      id="section-type-selector-section"
      aria-labelledby="section-type-selector"
      className="group-block"
    >
      <h2 id="section-type-selector">Section type</h2>
      <div className="column-group">
        <span>Select the type of section you want to create.</span>

        <div>
          <ul>{options}</ul>
        </div>
        <div>
          <strong>{getCurrentTypeDescription()}</strong>
        </div>
        <div>
          <em>
            Create multiple sections of each type, and change their order at any
            time.
          </em>
        </div>
      </div>
    </section>
  )
}
