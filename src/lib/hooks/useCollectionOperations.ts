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
  UpdateCollectionFieldsOptions,
} from '@/types'
export const useCollectionOperations = () => {
  const [type, setType] = useState<ContentHandlerType>('topic')
  const [name, setName] = useState<string>('')
  const [slug, setSlug] = useState<string>('')
  const [items, setItems] = useState<unknown[] | undefined>()
  const [collectionItems, setCollectionItems] = useState<
    LearningItem[] | undefined
  >()
  const [inatMessage, setInatMessage] = useState('')
  const [selectedCollections, setSelectedCollections] = useState<string[]>([])
  const [collectionSummaries, setCollectionSummaries] = useState<
    CollectionSummary[]
  >([])
  const [collection, setCollection] = useState<Collection<unknown>>()
  const [operation, setOperation] = useState<Operation>('create' as Operation)
  const [operationMessage, setOperationMessage] = useState('')
  const [apiResponse, setApiResponse] = useState({
    success: false,
    message: '',
  })
  const [collectionsFields, setCollectionsFields] =
    useState<UpdateCollectionFieldsOptions>()

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
        opsMessage = ''
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
    setInatMessage('Properties added')
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
    router.push(`/collection/${newCollection.slug}-${newCollection.shortId}`)
  }

  const getCollectionSummaries = async (): Promise<CollectionSummary[]> => {
    const response = await fetch('/api/collection-summaries')
    return response.json()
  }

  const updateCollectionItems = async () => {
    if (!collection || !collectionItems) return

    const transformedItems = generateGenusAndSpeciesFields(
      collectionItems as Taxon[]
    )

    try {
      const url = `/api/collection/update-items/${collection.slug}-${collection.shortId}`

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformedItems),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        )
      }

      const result = await response.json()
      console.log('Collection updated successfully:', result)
      setApiResponse({
        success: false,
        message: 'Collection items update succeeded.',
      })

      // Only navigate if the update was successful
      router.push(`/collection/${collection.slug}-${collection.shortId}`)
    } catch (error) {
      console.error('Failed to update collection:', error)
      setApiResponse({
        success: false,
        message: 'Collection items update failed.',
      })
      // You might want to show a user-friendly error message here
      // For example, using a toast notification or setting an error state
      // setError(error.message)
      // or
      // toast.error('Failed to update collection. Please try again.')
    }
  }

  const updateCollectionFields = async (
    fields: UpdateCollectionFieldsOptions
  ) => {
    console.log('collectionsFields', fields)
    if (!collection || !fields) return

    try {
      const url = `/api/collection/update-fields/${collection.slug}-${collection.shortId}`

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fields),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        )
      }

      const result = await response.json()
      console.log('Collection updated successfully:', result)
      setApiResponse({
        success: true,
        message: 'Collection field updates succeeded.',
      })

      // Only navigate if the update was successful
      // router.push(`/collection/${collection.slug}-${collection.shortId}`)
    } catch (error) {
      console.error('Failed to update collection:', error)
      setApiResponse({
        success: false,
        message: 'Collection field updates failed.',
      })
      // You might want to show a user-friendly error message here
      // For example, using a toast notification or setting an error state
      // setError(error.message)
      // or
      // toast.error('Failed to update collection. Please try again.')
    }
  }

  const deleteCollection = async () => {
    if (!collection) return
    const url = `/api/collection/delete/${collection.slug}-${collection.shortId}`
    const response = await fetch(url, {
      method: 'DELETE',
    })
    if (response.status === 200) {
      router.push('/collections')
    } else {
      setApiResponse({ success: false, message: 'Delete collection failed.' })
    }
  }

  const updateCollections = async () => {
    if (!collection) return

    const url = `/api/collection/update-collections/${collection.slug}-${collection.shortId}`

    const collections = selectedCollections
      .map(n => collectionSummaries.find(cs => cs.name === n))
      .filter(c => c !== undefined)

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ collections }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Server error response:', errorText)
        setApiResponse({
          success: false,
          message: 'Collections update failed.',
        })
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const result = await response.json()
      setApiResponse({
        success: true,
        message: 'Collections update succeeded.',
      })
      return result
    } catch (error) {
      console.error('Failed to update collections:', error)
      setApiResponse({ success: false, message: 'Collections update failed.' })
      throw error
    }
  }

  return {
    type,
    setType,
    name,
    setName,
    items,
    setItems,
    collectionItems,
    inatMessage,
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
    updateCollectionItems,
    isUpdateValid,
    setOperation,
    operation,
    deleteCollection,
    apiResponse,
    updateCollections,
    slug,
    setSlug,
    setCollectionsFields,
    updateCollectionFields,
  }
}
