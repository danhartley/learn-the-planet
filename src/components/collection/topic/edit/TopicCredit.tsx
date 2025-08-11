import React, { useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { CollectionTextField } from '@/components/common/CollectionTextField'
import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { Collection, Topic, Credit, ContentHandlerType } from '@/types'

import { textToArray } from '@/utils/strings'

type Props = {
  collection: Collection<Topic>
  section: Topic
}

export const TopicCredit = ({ collection, section }: Props) => {
  const { updateCollectionItem, deleteCollectionItem, apiResponse } =
    useCollection()
  const [title, setTitle] = useState<string>(section?.credit?.title || '')
  const [source, setSource] = useState<string>(section?.credit?.source || '')
  const [authors, setAuthors] = useState<string>(
    (section?.credit?.authors ?? []).join(',') || ''
  )

  const updateCredit = () => {
    const credit: Credit = {
      title,
      source,
      authors: textToArray(authors) as string[],
    }
    section.credit = credit

    if (collection) {
      updateCollectionItem(collection, section)
    }
  }

  const deleteCredit = () => {
    if (collection) if (section) deleteCollectionItem(collection, section.id)
  }

  return (
    <section aria-labelledby="new-section">
      <h2>Edit credits</h2>

      <div className="column-group">
        <CollectionTextField
          fieldValue={title}
          setFieldValue={setTitle}
          fieldText="title"
          type={'topic' as unknown as ContentHandlerType}
          required={true}
        />
        <CollectionTextField
          fieldValue={source}
          setFieldValue={setSource}
          fieldText="source"
          type={'topic' as unknown as ContentHandlerType}
          required={false}
        />
        <CollectionTextField
          fieldValue={authors}
          setFieldValue={setAuthors}
          fieldText="authors"
          type={'topic' as unknown as ContentHandlerType}
          required={false}
        />
        <div className="form-row">
          <button
            id="submit"
            type="submit"
            onClick={updateCredit}
            className="save"
          >
            Save
          </button>
          <button onClick={deleteCredit} className="delete">
            Delete text
          </button>
          <ApiResponseMessage apiResponse={apiResponse} />
        </div>
      </div>
    </section>
  )
}
