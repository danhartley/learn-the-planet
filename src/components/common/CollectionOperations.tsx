'use client'
import { useState, useEffect } from 'react'
import { CollectionName } from '@/components/common/CollectionName'
import { CollectionType } from '@/components/common/CollectionType'
import { CollectionItemPicker } from '@/components/common/CollectionItemPicker'

import { useRouter } from 'next/navigation'
import { useTestPlanner } from '@/hooks/useTestPlanner'
import { getInatTaxonProperties } from '@/api/inat/api'
import { generateGenusAndSpeciesFields } from '@/utils/taxa'

import {
  Operation,
  ContentType,
  ContentHandlerType,
  LearningItem,
  Collection,
  Taxon,
  Trait,
} from '@/types'

type Props = {
  operation: Operation
  types?: ContentType[]
  collectionType?: ContentHandlerType
}

export default function CollectionOperations({
  operation = 'read',
  types,
  collectionType = 'topic',
}: Props) {
  const [type, setType] = useState<ContentHandlerType>(collectionType)
  const [name, setName] = useState<string>('')
  const [items, setItems] = useState<unknown[] | undefined>()
  const [collectionItems, setCollectionItems] = useState<
    LearningItem[] | undefined
  >()
  const [isValid, setIsValid] = useState<boolean>(false)
  const [isItemsValid, setIsItemsValid] = useState<boolean>(false)
  const [message, setMessage] = useState('')
  const [createCollectionMessage, setCreateCollectionMessage] = useState(
    'Please complete the sections above'
  )

  const router = useRouter()
  const { startTest } = useTestPlanner<LearningItem>()

  useEffect(() => {
    const nameValid = name.trim().length > 0
    const itemsValid = !!items && items.length > 0
    setIsItemsValid(itemsValid)
    let collectionItemsValid = true
    if (['taxon', 'trait'].includes(type)) {
      collectionItemsValid = !!collectionItems && collectionItems.length > 0
    }
    const isAllValid = nameValid && itemsValid && collectionItemsValid
    setIsValid(isAllValid)
    if (isAllValid)
      setCreateCollectionMessage(
        `You're ready to create a new ${type} collection`
      )
    setCollectionItems(items as LearningItem[])
  }, [name, items, type, collectionItems])

  const addInaturalistProperties = async (type: ContentHandlerType) => {
    if (!items) return
    setCollectionItems(
      await getInatTaxonProperties({ items: items as Taxon[], type })
    )
    setMessage('Properties added')
  }

  const createCollection = async () => {
    const slug = name.trim().toLowerCase().replace(/\s+/g, '-')
    const collection: Collection<LearningItem> = {
      type,
      name,
      slug,
      items: collectionItems!,
    }

    let addedPropsCollection = collection

    if (['taxon'].includes(type)) {
      addedPropsCollection = {
        ...collection,
        items: generateGenusAndSpeciesFields(collection.items as Taxon[]),
      }
    }

    if (['trait'].includes(type)) {
      addedPropsCollection = {
        ...collection,
        items: (collection.items as Trait[]).map(trait => {
          return {
            ...trait,
            examples: generateGenusAndSpeciesFields(trait?.examples as Taxon[]),
          }
        }),
      }
    }

    const result = await addCollection(addedPropsCollection)
    console.log('Collection created:', result)

    // if (type !== 'topic') {
    //   startTest({
    //     collection: addedPropsCollection,
    //   })
    //   router.push('/test')
    // } else {
    //   console.log('Topic collections do not have their own tests')
    // }
  }

  const CollectionExtensions = (
    <section aria-labelledby="inaturalist" className="group-block">
      <h2 id="inaturalist">Collection taxa extensions</h2>
      <div className="column-group">
        <div>
          Add CollectionExtensions fields to your species, including images
        </div>
        <div className="form-row">
          <button
            id="add-inat-props"
            onClick={() => addInaturalistProperties(type)}
            disabled={!isItemsValid}
          >
            Add iNaturalist properties
          </button>
          <div className={isValid ? 'correct' : 'incorrect'}>{message}</div>
        </div>
      </div>
    </section>
  )

  return (
    <>
      <CollectionName
        operation={operation}
        name={name}
        setName={setName}
        type={type}
      />
      <CollectionType
        operation={operation}
        types={types}
        type={type}
        setType={setType}
      />
      <CollectionItemPicker type={type} setItems={setItems} />
      {['taxon', 'trait'].includes(type) ? CollectionExtensions : null}
      <section aria-labelledby="create-collection">
        <div>
          <h2 id="create-collection">Create {type} collection</h2>
          <div>{createCollectionMessage}</div>
        </div>
        <button disabled={!isValid} onClick={createCollection}>
          Create collection
        </button>
      </section>
    </>
  )
}

export async function addCollection(
  collection: Collection<unknown>
): Promise<Collection<unknown>> {
  const response = await fetch('/api/collections', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(collection),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to add collection')
  }

  return response.json()
}
