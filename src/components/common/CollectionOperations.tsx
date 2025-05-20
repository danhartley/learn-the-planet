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

  const router = useRouter()
  const { startTest } = useTestPlanner<LearningItem>()

  useEffect(() => {
    const nameValid = name.trim().length > 0
    const itemsValid = !!items && items.length > 0
    const collectionItemsValid = !!collectionItems && collectionItems.length > 0

    setIsValid(nameValid && itemsValid && collectionItemsValid)
  }, [name, items, type, collectionItems])

  const appendSpeciesData = async (type: ContentHandlerType) => {
    if (!items) return

    setCollectionItems(await getInatTaxonProperties({ items, type }))
  }

  const createCollection = () => {
    console.log('collectionItems', collectionItems)
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
      <section aria-labelledby="inaturalist" className="group-block">
        <h2 id="inaturalist">iNaturalist</h2>
        <div className="column-group">
          <div>Add additional fields to species, including images</div>
          <button
            id="create-collection"
            onClick={() => appendSpeciesData(type)}
            disabled={!(!!items && items.length > 0)}
          >
            Fetch data
          </button>
        </div>
      </section>
      <section>
        <h2>Create collection</h2>
        <button disabled={!isValid} onClick={createCollection}>
          Create
        </button>
      </section>
    </>
  )
}
