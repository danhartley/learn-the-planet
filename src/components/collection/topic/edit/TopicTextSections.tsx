import React, { useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { TopicText } from '@/components/collection/topic/edit/TopicText'
import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { Topic } from '@/types'

type Props = {
  section: Topic
}

export const TopicTextSections = ({ section }: Props) => {
  const {
    collection,
    updateCollectionItem,
    deleteCollectionItem,
    apiResponse,
  } = useCollection()
  const [sectionText, setSectionText] = useState(section.text)
  const [isUpdating, setIsUpdating] = useState(false)
  const [topic, setTopic] = useState(section.topic || '')

  const saveChanges = () => {
    setIsUpdating(true)
    section.text = sectionText
    section.topic = topic
    if (collection) {
      updateCollectionItem(collection, section).then(() => {
        setIsUpdating(false)
      })
    }
  }
  const deleteText = () => {
    if (collection) if (section) deleteCollectionItem(collection, section.id)
  }

  return (
    <>
      {sectionText && (
        <TopicText
          key={section.id}
          id={section.id}
          text={sectionText}
          topic={topic}
          setTopic={setTopic}
          setSectionText={setSectionText}
        />
      )}
      {!!sectionText && (
        <div className="form-row">
          <button
            type="button"
            id="edit-section"
            disabled={isUpdating}
            onClick={saveChanges}
            className="save"
          >
            Save
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
