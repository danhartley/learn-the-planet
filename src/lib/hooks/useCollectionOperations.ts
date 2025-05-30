import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getInatTaxonProperties } from '@/api/inat/api'
import { generateGenusAndSpeciesFields } from '@/utils/taxa'

import {
  ContentHandlerType,
  LearningItem,
  Collection,
  Taxon,
  Trait,
  CollectionSummary,
  Operation,
} from '@/types'
export const useCollectionOperations = () => {
  const [type, setType] = useState<ContentHandlerType>('topic')
  const [name, setName] = useState<string>('')
  const [items, setItems] = useState<unknown[] | undefined>()
  const [collectionItems, setCollectionItems] = useState<
    LearningItem[] | undefined
  >()
  const [message, setMessage] = useState('')
  const [selectedCollections, setSelectedCollections] = useState<string[]>([])
  const [collectionSummaries, setCollectionSummaries] = useState<
    CollectionSummary[]
  >([])
  const [collection, setCollection] = useState<Collection<unknown>>()
  const [operation, setOperation] = useState<Operation>('create' as Operation)
  const [operationMessage, setOperationMessage] = useState('')

  useEffect(() => {
    const getSummaries = async () => {
      const summaries: CollectionSummary[] = await getCollectionSummaries()
      setCollectionSummaries(summaries)
    }

    getSummaries()
  }, [])

  const router = useRouter()

  // Derived validation states
  const isNameValid = name.trim().length > 0
  const isItemsValid = !!items && items.length > 0
  const needsCollectionItems = ['taxon', 'trait'].includes(type)
  const isCollectionItemsValid =
    !needsCollectionItems || (!!collectionItems && collectionItems.length > 0)

  const isValid = isNameValid && isItemsValid && isCollectionItemsValid
  const isUpdateValid = isItemsValid && isCollectionItemsValid

  useEffect(() => {
    let opsMessage = ''

    switch (operation) {
      case 'create':
        opsMessage = isValid
          ? `You're ready to create a new ${type} collection`
          : 'Please complete the sections above'
        setOperationMessage(opsMessage)
        break
      case 'update':
        opsMessage = isValid
          ? `You're ready to edit a new ${type} collection`
          : 'Please complete the sections above'
        setOperationMessage(opsMessage)
        break
      default:
        opsMessage = ''
    }
  }, [operation, isValid, type])

  const addInaturalistProperties = async () => {
    if (!items) return
    const inaturalistItems = await getInatTaxonProperties({
      items: items as Taxon[],
      type,
    })

    setCollectionItems(inaturalistItems as LearningItem[])
    setMessage('Properties added')
  }

  const transformCollectionData = (collection: Collection<unknown>) => {
    if (type === 'taxon') {
      return {
        ...collection,
        items: generateGenusAndSpeciesFields(collection.items as Taxon[]),
      }
    }

    if (type === 'trait') {
      return {
        ...collection,
        items: (collection.items as Trait[]).map(trait => ({
          ...trait,
          examples: generateGenusAndSpeciesFields(trait?.examples as Taxon[]),
        })),
      }
    }

    return collection
  }

  const addCollection = async () => {
    const slug = name.trim().toLowerCase().replace(/\s+/g, '-')
    const collection: Collection<unknown> = {
      type,
      name,
      slug,
      items: collectionItems! || items!,
      itemCount: (collectionItems! || items!).length || 0,
    }

    const transformedCollection = transformCollectionData(collection)
    if (type === 'topic') {
      const collections = collectionSummaries.filter(cs =>
        selectedCollections.includes(cs.name)
      )

      transformedCollection.collections = collections
    }

    const response = await fetch('/api/collection', {
      method: 'POST',
      body: JSON.stringify(transformedCollection),
    })

    const newCollection: Collection<unknown> = await response.json()
    router.push(`/collection/${newCollection.slug}/${newCollection.shortId}`)
  }

  const getCollectionSummaries = async (): Promise<CollectionSummary[]> => {
    const response = await fetch('/api/collection-summaries')
    return response.json()
  }

  const updateCollection = async () => {
    if (!collection || !items) return
    const url = `/api/collection/update/${collection.slug}-${collection.shortId}`
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(items),
    })
    router.push(`/collection/${collection.slug}/${collection.shortId}`)
  }

  const deleteCollection = async () => {
    if (!collection) return
    const url = `/api/collection/update/${collection.slug}-${collection.shortId}`
    const response = await fetch(url, {
      method: 'DELETE',
    })
  }

  return {
    type,
    setType,
    name,
    setName,
    items,
    setItems,
    collectionItems,
    message,
    isValid,
    isItemsValid,
    needsCollectionItems,
    operationMessage,
    addInaturalistProperties,
    addCollection,
    collectionSummaries,
    selectedCollections,
    setSelectedCollections,
    setCollection,
    updateCollection,
    isUpdateValid,
    setOperation,
    operation,
    deleteCollection,
  }
}
