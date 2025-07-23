import { useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { CollectionTextField } from '@/components/common/CollectionTextField'
import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { Topic, Credit } from '@/types'

import { textToArray, getShortId } from '@/utils/strings'

export const AddTopicCredit = () => {
  const { collection, addCollectionItem, apiResponse } = useCollection()
  const [title, setTitle] = useState<string>('')
  const [source, setSource] = useState<string>('')
  const [authors, setAuthors] = useState<string>('')

  const saveCredit = () => {
    const credit: Credit = {
      title,
      source,
      authors: textToArray(authors) as string[],
    }
    const item = {
      id: getShortId(),
      credit,
    } as Topic

    if (collection) {
      addCollectionItem(collection, item)
    }
  }

  return (
    <section aria-labelledby="new-section" className="list-group">
      <h2>Add credits</h2>

      <CollectionTextField
        fieldValue={title}
        setFieldValue={setTitle}
        fieldText="title"
        type={'topic'}
        required={true}
      />

      <CollectionTextField
        fieldValue={source}
        setFieldValue={setSource}
        fieldText="source"
        type={'topic'}
        required={false}
      />

      <CollectionTextField
        fieldValue={authors}
        setFieldValue={setAuthors}
        fieldText="authors"
        type={'topic'}
        required={false}
      />

      <div className="form-row">
        <button id="submit" type="submit" onClick={saveCredit} className="save">
          Add credit
        </button>
        <ApiResponseMessage apiResponse={apiResponse} />
      </div>
    </section>
  )
}
