import React, { useEffect, useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { Topic } from '@/types'

import { textToArray, getShortId } from '@/utils/strings'

export const AddTopicText = () => {
  const { collection, addCollectionItem, apiResponse } = useCollection()
  const [text, setText] = useState('')
  const [lastSectionId, setLastSectionId] = useState(
    collection?.items?.findLast(item => (item as Topic).id)
  )

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const saveText = () => {
    const item = {
      id: getShortId(),
      text: textToArray(text) as string[],
    } as Topic

    if (collection) {
      addCollectionItem(collection, item)
      setText('')
    }
  }

  useEffect(() => {
    setLastSectionId(collection?.items?.findLast(item => (item as Topic).id))
  }, [collection?.items])

  useEffect(() => {
    if (!collection) return
    const section = collection.items
      ? collection.items[collection.itemCount - 1]
      : undefined
    if (section) {
      const sectionId = (section as Topic)?.id || undefined
      if (sectionId)
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        })
    }
  }, [collection, lastSectionId])

  return (
    <section aria-labelledby="new-section">
      <form action="">
        <h2 id="new-section">
          <label htmlFor="json-input">Add text</label>
        </h2>
        <div className="group-block">
          <div className="form-row">
            <textarea
              id="json-input"
              value={text}
              onChange={handleChange}
              placeholder=""
              rows={10}
            />
          </div>
        </div>
      </form>

      <div className="form-row">
        <button id="submit" type="submit" onClick={saveText} className="save">
          Add text
        </button>
        <ApiResponseMessage apiResponse={apiResponse} />
      </div>
    </section>
  )
}
