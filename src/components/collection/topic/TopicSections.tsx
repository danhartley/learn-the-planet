import React, { useState, useEffect } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { TopicText } from '@/components/collection/topic/add/TopicText'
import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { Topic } from '@/types'

type Props = {
  section: Topic
  sectionIndex: number
}

export const TopicSections = ({ section, sectionIndex }: Props) => {
  const { collection, updateCollectionItem, deleteItem, apiResponse } =
    useCollection()
  const [sectionText, setSectionText] = useState(section.text)
  const [changesToSave, setChangesToSave] = useState(false)

  useEffect(() => {
    setChangesToSave(true)
  }, [sectionText])

  const saveChanges = () => {
    section.text = sectionText
    if (collection) {
      updateCollectionItem(collection, section).then(() => {
        setSectionText([])
      })
    }
  }
  const deleteText = () => {
    if (collection) if (section) deleteItem(collection, section.id)
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
