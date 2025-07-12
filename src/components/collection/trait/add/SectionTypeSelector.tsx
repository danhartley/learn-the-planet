import React, { Dispatch, SetStateAction } from 'react'
import { TraitSectionType, SectionTypeOption } from '@/types'

type Props = {
  selectedOption: TraitSectionType
  setSelectedOption: Dispatch<SetStateAction<TraitSectionType>>
}
export const SectionTypeSelector = ({
  selectedOption,
  setSelectedOption,
}: Props) => {
  const sectionTypes = [
    {
      key: 'morphology' as TraitSectionType,
      value: 'Morphology',
      description: 'Add morphology',
    },
    {
      key: 'phenology' as TraitSectionType,
      value: 'Phenology',
      description: 'Add phenology',
    },
    {
      key: 'taxon' as TraitSectionType,
      value: 'Taxon',
      description: 'Add taxa from iNaturalist',
    },
  ] as SectionTypeOption[]

  const scrollToNewSection = () => {
    // Find the component to display
    const newSection = document.getElementById('new-section')

    if (newSection) {
      // Get the element's position relative to the document
      const elementRect = newSection.getBoundingClientRect()
      const elementTop = elementRect.top + window.scrollY

      // Scroll to the calculated position
      window.scrollTo({
        top: elementTop,
        behavior: 'smooth', // Optional: adds smooth scrolling animation
      })
    }
  }

  const selectOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value as TraitSectionType)
    // Allow time for component to render
    setTimeout(() => {
      scrollToNewSection()
    })
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
        <span>Select the type of section you want to add.</span>

        <div>
          <ul className="list-group">{options}</ul>
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
