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
  ApiResponse,
  Topic,
} from '@/types'

export const useCollectionOperations = () => {
  const [type, setType] = useState<ContentHandlerType>('topic')
  const [name, setName] = useState<string>('')
  const [slug, setSlug] = useState<string>('')
  const [imageUrl, setImageUrl] = useState<string>('')
  const [items, setItems] = useState<unknown[] | undefined>()
  const [collectionItems] = useState<LearningItem[] | undefined>()
  const [inatMessage, setInatMessage] = useState({
    success: false,
    message: '',
  } as ApiResponse)
  const [selectedCollections, setSelectedCollections] = useState<string[]>([])
  const [collectionSummaries, setCollectionSummaries] = useState<
    CollectionSummary[]
  >([])
  const [collection, setCollection] = useState<Collection<unknown>>()
  const [operation, setOperation] = useState<Operation>('create' as Operation)
  const [operationMessage, setOperationMessage] = useState({
    success: false,
    message: '',
  } as ApiResponse)
  const [apiResponse, setApiResponse] = useState({
    success: false,
    message: '',
  } as ApiResponse)
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  const isNameValid = !!name.trim()
  const isItemsValid = !!items?.length
  const isValid = isNameValid && isItemsValid

  useEffect(() => {
    let opsMessage = ''

    switch (operation) {
      case 'create':
        opsMessage = isValid
          ? `You're ready to create a new ${type} collection`
          : 'Please complete the sections above'
        break
      case 'update':
        opsMessage = ''
        break
      default:
        opsMessage = ''
    }
    setOperationMessage({
      success: isValid,
      message: opsMessage,
    } as ApiResponse)
  }, [operation, isValid, type])

  const addInaturalistProperties = async () => {
    if (!items) return
    const inaturalistItems = await getInatTaxonProperties({
      items: items as Taxon[],
      type,
    })
    setItems(inaturalistItems as LearningItem[])
    setInatMessage({
      success: true,
      message: 'Properties added',
    } as ApiResponse)
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
      items: items!,
      itemCount: (items! || items!).length || 0,
      imageUrl,
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

  const updateCollectionItems = async (
    collection: Collection<unknown>,
    items: unknown[]
  ) => {
    if (!collection) return

    const transformedItems =
      collection.type === 'taxon'
        ? generateGenusAndSpeciesFields(items as Taxon[])
        : items

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

      await response.json()

      setApiResponse({
        success: true,
        message: 'Collection items update succeeded.',
      })
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

      await response.json()

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

  const updateCollectionReferences = async ({
    collection,
    collectionReferences,
  }: {
    collection: Collection<unknown>
    collectionReferences: CollectionSummary[]
  }) => {
    if (!collection) return

    const url = `/api/collection/update-collections/${collection.slug}-${collection.shortId}`

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ collectionReferences }),
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
        message: 'Collection references update succeeded.',
      })
      return result
    } catch (error) {
      console.error('Failed to update collections:', error)
      setApiResponse({ success: false, message: 'Collections update failed.' })
      throw error
    }
  }

  const updateCollectionItem = async (
    collection: Collection<Topic>,
    updatedItem: Topic
  ) => {
    if (!collection) return
    console.log('collection', collection)
    if (!collection) return
    try {
      const itemId = updatedItem.id
      const url = `/api/collection/update-item/${collection.slug}-${collection.shortId}-${itemId}`

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        )
      }

      await response.json()

      setApiResponse({
        success: true,
        message: 'Collection item update succeeded.',
      })
    } catch (error) {
      console.error('Failed to update collection:', error)
      setApiResponse({
        success: false,
        message: 'Collection items update failed.',
      })
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
    operationMessage,
    addInaturalistProperties,
    addCollection,
    collectionSummaries,
    selectedCollections,
    setSelectedCollections,
    setCollection,
    updateCollectionItems,
    setOperation,
    operation,
    deleteCollection,
    apiResponse,
    updateCollectionReferences,
    slug,
    setSlug,
    setCollectionsFields,
    updateCollectionFields,
    imageUrl,
    setImageUrl,
    setInatMessage,
    updateCollectionItem,
  }
}
