import React, { useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { CollectionTextField } from '@/components/common/CollectionTextField'
import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { UpdateCollectionFieldsOptions, Credit } from '@/types'

export const EditProperties = () => {
  const { collection, updateCollectionFields, apiResponse } = useCollection()
  const [name, setName] = useState<string>(collection?.name || '')
  const [author, setAuthor] = useState<string>(
    collection?.author?.authors?.join(', ') || ''
  )
  const [slug, setSlug] = useState<string>(collection?.slug || '')
  const [imageUrl, setImageUrl] = useState<string>(collection?.imageUrl || '')
  const [date, setDate] = useState<string>(collection?.date || '')
  const [location, setLocation] = useState<string>(collection?.location || '')

  const handleFieldsChange = () => {
    const newFields = {
      name,
      slug,
      imageUrl,
      date: date || null,
      location: location || null,
      author: {
        authors: author ? author.split(',').map(a => a.trim()) : [],
      } as Credit,
    } as UpdateCollectionFieldsOptions

    if (collection) updateCollectionFields(collection, newFields)
  }

  return (
    <section aria-labelledby="collection-properties">
      <div className="group">
        <h2 id="collection-properties">Collection properties</h2>
      </div>
      <div className="group-block">
        <CollectionTextField
          fieldValue={name}
          setFieldValue={setName}
          fieldText="Collection name"
          type={collection?.type || 'topic'}
          sectionIndex={1}
        />
      </div>

      <div className="group-block">
        <CollectionTextField
          fieldValue={author}
          setFieldValue={setAuthor}
          fieldText="Collection author"
          type={collection?.type || 'topic'}
          sectionIndex={1}
          information="Enter authors as a comma-separated list"
        />
      </div>

      <div className="group-block">
        <CollectionTextField
          fieldValue={slug}
          setFieldValue={setSlug}
          fieldText="Collection slug"
          type={collection?.type || 'topic'}
          sectionIndex={1}
        />
      </div>

      <div className="group-block">
        <CollectionTextField
          fieldValue={imageUrl}
          setFieldValue={setImageUrl}
          fieldText="Collection image url"
          type={collection?.type || 'topic'}
          sectionIndex={1}
        />
      </div>

      <div className="group-block">
        <div>
          <h3>
            <label htmlFor="collection-date">Collection Date</label>
          </h3>
          <div className={`form-row ${collection?.type}`}>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              title="Select collection date"
              placeholder="YYYY-MM-DD"
              id="collection-date"
            />
          </div>
        </div>
      </div>

      <div className="group-block">
        <CollectionTextField
          fieldValue={location}
          setFieldValue={setLocation}
          fieldText="Collection location"
          type={collection?.type || 'topic'}
          sectionIndex={1}
        />
      </div>

      <section aria-labelledby="edit-collection">
        <div className="form-row">
          <button onClick={handleFieldsChange} className="save">
            Update collection fields
          </button>
          <ApiResponseMessage apiResponse={apiResponse} />
        </div>
      </section>
    </section>
  )
}
