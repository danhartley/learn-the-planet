import React, { useState, useEffect } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { TopicText } from '@/components/collection/topic/add/TopicText'
import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { Collection, Topic } from '@/types'

type Props = {
  collection: Collection<Topic>
  section: Topic
  sectionIndex: number
}

export const TopicSections = ({ collection, section, sectionIndex }: Props) => {
  const { updateCollectionItem, deleteItem, apiResponse } = useCollection()
  const [sectionText, setSectionText] = useState(section.text)
  const [changesToSave, setChangesToSave] = useState(false)

  useEffect(() => {
    setChangesToSave(true)
  }, [sectionText])

  const saveChanges = () => {
    section.text = sectionText
    updateCollectionItem(collection, section)
  }
  const deleteText = () => {
    if (section) deleteItem(collection, section.id)
  }

  return (
    <div className="group-block">
      {sectionText && (
        <TopicText
          key={section.id}
          id={section.id}
          text={sectionText}
          setSectionText={setSectionText}
          sectionIndex={sectionIndex}
        />
      )}
      {!!sectionText && (
        <div className="form-row">
          <button
            type="button"
            id="edit-section"
            disabled={!changesToSave}
            onClick={saveChanges}
          >
            Save changes
          </button>
          <button onClick={deleteText}>Delete text</button>
          <ApiResponseMessage apiResponse={apiResponse} />
        </div>
      )}
    </div>
  )
}
