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
  const [items, setItems] = useState<LearningItem[] | undefined>()
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
    const collectionItemsValid = !!collectionItems && collectionItems.length > 0
    const isAllValid = nameValid && itemsValid && collectionItemsValid
    setIsValid(isAllValid)
    if (isAllValid)
      setCreateCollectionMessage(
        `You're ready to create a new ${type} collection`
      )
  }, [name, items, type, collectionItems])

  const addInaturalistProperties = async (type: ContentHandlerType) => {
    if (!items) return
    setCollectionItems(await getInatTaxonProperties({ items, type }))
    setMessage('Properties added')
  }

  const createCollection = () => {
    const collection: Collection<LearningItem> = {
      id: crypto.randomUUID(),
      type,
      name,
      items: collectionItems!,
    }
    startTest({
      collection: generateGenusAndSpeciesFields(
        collection as Collection<Taxon>
      ),
    })
    router.push('/test')
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
      {type === 'taxon' ? CollectionExtensions : null}
      <section aria-labelledby="create-collection">
        <div>
          <h2 id="create-collection">Create {type} collection</h2>
          <div>{createCollectionMessage}</div>
        </div>
        <button disabled={!isValid} onClick={createCollection}>
          Create
        </button>
      </section>
    </>
  )
}
