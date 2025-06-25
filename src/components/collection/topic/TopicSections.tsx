import React, { useState, useEffect } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { TopicText } from '@/components/collection/topic/add/TopicText'
import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { Topic } from '@/types'

type Props = {
  section: Topic
}

export const TopicSections = ({ section }: Props) => {
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
    <>
      {sectionText && (
        <TopicText
          key={section.id}
          id={section.id}
          text={sectionText}
          setSectionText={setSectionText}
        />
      )}
      {!!sectionText && (
        <div className="form-row">
          <button
            type="button"
            id="edit-section"
            disabled={!changesToSave}
            onClick={saveChanges}
            className="save"
          >
            Save changes
          </button>
          <button onClick={deleteText} className="delete">
            Delete text
          </button>
          <ApiResponseMessage apiResponse={apiResponse} />
        </div>
      )}
    </>
  )
}
