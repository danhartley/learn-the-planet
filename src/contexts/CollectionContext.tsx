'use client'
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react'

import { processCollectionTaxa } from '@/utils/taxa'

import {
  Collection,
  CollectionSummary,
  ApiResponse,
  UpdateCollectionFieldsOptions,
  ContentHandlerType,
  CollectionStatus,
  CloudImage,
  Credit,
} from '@/types'

type CollectionContextType = {
  collection: Collection<unknown> | null
  setCollection: (collection: Collection<unknown>) => void
  apiResponse: ApiResponse
  setApiResponse: (response: ApiResponse) => void
  addCollectionItem: (
    collection: Collection<unknown>,
    item: unknown
  ) => Promise<void>
  updateLinkedCollections: (
    linkedCollections: CollectionSummary[]
  ) => Promise<Collection<unknown> | undefined>
  deleteCollection: (collection: Collection<unknown>) => Promise<void>
  updateCollectionFields: (
    collection: Collection<unknown>,
    fields: UpdateCollectionFieldsOptions
  ) => Promise<void>
  getCollectionSummaries: () => Promise<CollectionSummary[]>
  updateCollectionItems: (
    collection: Collection<unknown>,
    items: unknown[]
  ) => Promise<void>
  updateCollectionItem: (
    collection: Collection<unknown>,
    updatedItem: unknown
  ) => Promise<void>
  deleteCollectionItem: (
    collection: Collection<unknown>,
    itemId: string
  ) => Promise<void>
  addCollection: (
    name: string,
    type: ContentHandlerType,
    ownerId: string,
    imageUrl?: string
  ) => Promise<void>
  updateSectionOrder: (
    collection: Collection<unknown>,
    sectionOrder: string[]
  ) => void
  updateCollectionState: (
    collectionSummary: CollectionSummary,
    status: CollectionStatus
  ) => Promise<void>
  collectionSummary: CollectionSummary | null | undefined
  collectionSummaries: CollectionSummary[] | null | undefined
  getImages: ({
    userId,
    collectionId,
  }: {
    userId?: string
    collectionId?: string
  }) => Promise<CloudImage[]>
  updateAuthor: (
    collection: Collection<unknown>,
    author: Credit
  ) => Promise<void>
}

const CollectionContext = createContext<CollectionContextType | undefined>(
  undefined
)

type CollectionProviderProps = {
  children: ReactNode
  initialCollection?: Collection<unknown>
}

export const CollectionProvider = ({
  children,
  initialCollection,
}: CollectionProviderProps) => {
  const [collection, setCollection] = useState<Collection<unknown> | null>(
    initialCollection ?? null
  )
  const [collectionSummary, setCollectionSummary] =
    useState<CollectionSummary | null>()
  const [collectionSummaries, setCollectionSummaries] = useState<
    CollectionSummary[] | null
  >()
  const [apiResponse, setApiResponse] = useState<ApiResponse>({
    success: false,
    message: '',
  })

  const addCollectionItem = useCallback(
    async (collection: Collection<unknown>, item: unknown) => {
      if (!collection || !item) return

      const itemId = (item as { id: string }).id
      if (!itemId) return

      const processedItem = processCollectionTaxa(collection.type, [
        item,
      ])?.find(taxon => taxon)

      // Optimistic update (moved to beginning)
      const previousCollection = collection
      setCollection(prev =>
        prev
          ? {
              ...prev,
              items: [...(prev.items || []), processedItem],
              itemCount: (prev.items?.length || 0) + 1,
              sectionOrder: [...(prev.sectionOrder || []), itemId],
            }
          : null
      )

      try {
        const url = `/api/collection/update-item/${collection.slug}-${collection.shortId}-${itemId}`

        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(processedItem),
        })

        if (!response.ok) {
          const errorData = await response.json()

          // Revert optimistic update on error
          setCollection(previousCollection)

          throw new Error(
            errorData.error || `HTTP error! status: ${response.status}`
          )
        }

        const updatedCollection = await response.json()

        // Update with server response (in case server made additional changes)
        setCollection(updatedCollection)

        setApiResponse({
          success: true,
          message: 'Collection item added successfully.',
        })
      } catch (error) {
        console.error('Failed to add item to collection:', error)

        // Ensure revert on any error (in case it wasn't caught above)
        setCollection(previousCollection)

        setApiResponse({
          success: false,
          message: 'Failed to add item to collection.',
        })
      }
    },
    [setCollection, setApiResponse]
  )

  const updateLinkedCollections = async (
    linkedCollections: CollectionSummary[]
  ) => {
    if (!collection) return

    // Optimistic update
    const previousCollection = collection
    setCollection(prev =>
      prev
        ? {
            ...prev,
            collections: linkedCollections,
          }
        : null
    )

    const url = `/api/collection/update-collections/${collection.slug}-${collection.shortId}`

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ linkedCollections }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Server error response:', errorText)

        // Revert optimistic update on error
        setCollection(previousCollection)

        setApiResponse({
          success: false,
          message: 'Collections update failed.',
        })
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const jsonResponse = await response.json()
      const updatedCollection = jsonResponse.collection

      // Update with server response (in case server made additional changes)
      setCollection(updatedCollection)

      setApiResponse({
        success: true,
        message: 'Linked collections updated.',
      })

      return updatedCollection
    } catch (error) {
      console.error('Failed to update collections:', error)

      // Ensure revert on any error (in case it wasn't caught above)
      setCollection(previousCollection)

      setApiResponse({ success: false, message: 'Collections update failed.' })
      throw error
    }
  }

  const deleteCollection = async (collection: Collection<unknown>) => {
    if (!collection) return

    const url = `/api/collection/delete/${collection.slug}-${collection.shortId}`

    const response = await fetch(url, {
      method: 'DELETE',
    })
    if (response.status === 200) {
      setApiResponse({
        success: true,
        message: 'Delete collection succeeded.',
      })
    } else {
      setApiResponse({ success: false, message: 'Delete collection failed.' })
    }
  }

  const updateCollectionFields = async (
    collection: Collection<unknown>,
    fields: UpdateCollectionFieldsOptions
  ) => {
    if (!collection || !fields) return

    // Optimistic update
    const previousCollection = collection
    setCollection(prev =>
      prev
        ? {
            ...prev,
            name: fields.name ?? prev.name,
            slug: fields.slug ?? prev.slug,
            imageUrl: fields.imageUrl ?? prev.imageUrl,
            date: fields.date ?? prev.date,
            location: fields.location ?? prev.location,
            author: fields.author ?? prev.author,
          }
        : null
    )

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

        // Revert optimistic update on error
        setCollection(previousCollection)

        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        )
      }

      const updatedCollection = await response.json()

      // Update with server response (in case server made additional changes)
      setCollection(updatedCollection)

      setApiResponse({
        success: true,
        message: 'Collection properties updated',
      })

      // Only navigate if the update was successful
      // router.push(`/collection/${collection.slug}-${collection.shortId}`)
    } catch (error) {
      console.error('Failed to update collection:', error)

      // Ensure revert on any error (in case it wasn't caught above)
      setCollection(previousCollection)

      setApiResponse({
        success: false,
        message: 'Collection field updates failed.',
      })
    }
  }

  const getCollectionSummaries = useCallback(async (): Promise<
    CollectionSummary[]
  > => {
    const response = await fetch('/api/collection-summaries')
    const summaries = await response.json()

    if (summaries) {
      setCollectionSummaries(summaries)
    }

    return summaries
  }, [])

  const updateCollectionItems = useCallback(
    async (collection: Collection<unknown>, items: unknown[]) => {
      if (!collection || !items) return

      // Store previous state for rollback
      const previousCollection = collection

      const processedCollectionItems = processCollectionTaxa(
        collection.type,
        items
      )

      // Optimistic update
      setCollection(prev =>
        prev
          ? {
              ...prev,
              items: processedCollectionItems,
              itemCount: processedCollectionItems?.length || 0,
            }
          : null
      )

      try {
        const response = await fetch(
          `/api/collection/update-items/${collection.slug}-${collection.shortId}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(processedCollectionItems), // Send original items to server
          }
        )

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(
            errorData.error || `HTTP error! status: ${response.status}`
          )
        }

        const updatedCollection = await response.json()
        setCollection(updatedCollection)
        setApiResponse({
          success: true,
          message: 'Collection items update succeeded.',
        })
      } catch (error) {
        console.error('Failed to update collection:', error)

        // Revert optimistic update
        setCollection(previousCollection)
        setApiResponse({
          success: false,
          message: 'Collection items update failed.',
        })
      }
    },
    [setCollection, setApiResponse]
  )

  const updateCollectionItem = async (
    collection: Collection<unknown>,
    updatedItem: unknown
  ) => {
    if (!collection || !updatedItem) return

    const itemId = (updatedItem as { id: string }).id
    if (!itemId) return

    const processedItem = processCollectionTaxa(collection.type, [
      updatedItem,
    ])?.find(taxon => taxon)

    // Optimistic update
    const previousCollection = collection
    setCollection(prev =>
      prev && prev.items
        ? {
            ...prev,
            items: prev.items.map(item =>
              (item as { id: string }).id === itemId ? processedItem : item
            ),
          }
        : prev
    )

    try {
      const url = `/api/collection/update-item/${collection.slug}-${collection.shortId}-${itemId}`

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedItem),
      })

      if (!response.ok) {
        const errorData = await response.json()

        // Revert optimistic update on error
        setCollection(previousCollection)

        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        )
      }

      const updatedCollection = await response.json()

      // Update with server response (in case server made additional changes)
      setCollection(updatedCollection)

      setApiResponse({
        success: true,
        message: 'Collection item update succeeded.',
      })
    } catch (error) {
      console.error('Failed to update collection:', error)

      // Ensure revert on any error (in case it wasn't caught above)
      setCollection(previousCollection)

      setApiResponse({
        success: false,
        message: 'Collection item update failed.',
      })
    }
  }

  const deleteCollectionItem = async (
    collection: Collection<unknown>,
    itemId: string
  ) => {
    if (!collection || !itemId) return
    console.log(collection, itemId)
    // Check if item exists in collection
    const itemExists = collection.items?.some(
      item => (item as { id: string }).id === itemId
    )
    if (!itemExists) return

    // Optimistic update
    const previousCollection = collection
    setCollection(prev =>
      prev && prev.items
        ? {
            ...prev,
            items: prev.items.filter(
              item => (item as { id: string }).id !== itemId
            ),
            itemCount: Math.max((prev.itemCount || 0) - 1, 0),
            sectionOrder: prev.sectionOrder.filter(id => id !== itemId),
          }
        : prev
    )

    try {
      const url = `/api/collection/delete-item/${collection.slug}-${collection.shortId}-${itemId}`

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json()

        // Revert optimistic update on error
        setCollection(previousCollection)

        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        )
      }

      const updatedCollection = await response.json()

      setCollection(updatedCollection)

      setApiResponse({
        success: true,
        message: 'Collection item deleted successfully.',
      })
    } catch (error) {
      console.error('Failed to delete item from collection:', error)

      // Ensure revert on any error (in case it wasn't caught above)
      setCollection(previousCollection)

      setApiResponse({
        success: false,
        message: 'Failed to delete item from collection.',
      })
    }
  }

  const addCollection = async (
    name: string,
    type: ContentHandlerType,
    ownerId: string,
    imageUrl?: string
  ) => {
    if (!name?.trim() || !type) return

    const slug = name.trim().toLowerCase().replace(/\s+/g, '-')
    const newCollection: Collection<unknown> = {
      type,
      name: name.trim(),
      slug,
      items: [],
      itemCount: 0,
      imageUrl: imageUrl || '',
      sectionOrder: [],
      ownerId,
    }

    try {
      const response = await fetch('/api/collection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCollection),
      })

      if (!response.ok) {
        const errorData = await response.json()

        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        )
      }

      const createdCollection = await response.json()
      console.log('createdCollection', createdCollection)
      // Update with server response (in case server made additional changes like adding id/shortId)
      setCollection(createdCollection)

      setApiResponse({
        success: true,
        message: 'New collection created.',
      })
    } catch (error) {
      console.error('Failed to create collection:', error)

      setApiResponse({
        success: false,
        message: 'Failed to create collection.',
      })

      throw error // Re-throw if caller needs to handle it
    }
  }

  const updateSectionOrder = async (
    collection: Collection<unknown>,
    sectionOrder: string[]
  ) => {
    if (!collection || !collection.items || !sectionOrder) return

    const orderedItems = sectionOrder.map(order => {
      return collection?.items?.find(
        item => (item as { id: string }).id === order
      )
    })

    // Optimistic update
    const previousCollection = collection
    setCollection(prev =>
      prev
        ? {
            ...prev,
            sectionOrder: sectionOrder ?? prev.sectionOrder,
            items: orderedItems,
          }
        : null
    )

    try {
      const url = `/api/collection/update-section-order/${collection.slug}-${collection.shortId}`

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sectionOrder),
      })

      if (!response.ok) {
        const errorData = await response.json()

        // Revert optimistic update on error
        setCollection(previousCollection)

        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        )
      }

      await response.json()
    } catch (error) {
      console.error('Failed to update section order:', error)

      // Ensure revert on any error (in case it wasn't caught above)
      setCollection(previousCollection)

      setApiResponse({
        success: false,
        message: 'Collection section order failed.',
      })
    }
  }

  const updateAuthor = async (
    collection: Collection<unknown>,
    author: Credit
  ) => {
    if (!collection || !collection.items || !author) return

    // Optimistic update
    const previousCollection = collection
    setCollection(prev =>
      prev
        ? {
            ...prev,
            author: author ?? prev.author,
          }
        : null
    )

    try {
      const url = `/api/collection/author/${collection.slug}-${collection.shortId}`

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(author),
      })

      if (!response.ok) {
        const errorData = await response.json()

        // Revert optimistic update on error
        setCollection(previousCollection)

        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        )
      }

      await response.json()
    } catch (error) {
      console.error('Failed to update collection author:', error)

      // Ensure revert on any error (in case it wasn't caught above)
      setCollection(previousCollection)

      setApiResponse({
        success: false,
        message: 'Collection author update failed.',
      })
    }
  }

  const updateCollectionState = async (
    collectionSummary: CollectionSummary,
    status: CollectionStatus
  ) => {
    if (!collectionSummary || !status) return

    // Store previous states for rollback
    const previousCollectionSummary = collectionSummary
    const previousCollectionSummaries = collectionSummaries

    // Optimistic update for single collection summary
    setCollectionSummary(prev =>
      prev
        ? {
            ...prev,
            status,
          }
        : null
    )

    // Optimistic update for collection summaries array
    setCollectionSummaries(prev =>
      prev?.map(summary =>
        summary.shortId === collectionSummary.shortId
          ? { ...summary, status }
          : summary
      )
    )

    try {
      const url = `/api/collection-summary/${collectionSummary.slug}-${collectionSummary.shortId}`

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        const errorData = await response.json()

        // Revert optimistic updates on error
        setCollectionSummary(previousCollectionSummary)
        setCollectionSummaries(previousCollectionSummaries)

        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        )
      }

      const updatedCollectionSummary = await response.json()

      // Update with server response (in case server made additional changes)
      setCollectionSummary(updatedCollectionSummary)

      // Update the array with server response
      setCollectionSummaries(prev =>
        prev?.map(summary =>
          summary.shortId === collectionSummary.shortId
            ? updatedCollectionSummary
            : summary
        )
      )

      setApiResponse({
        success: true,
        message: 'Collection visibility updated',
      })

      // Only navigate if the update was successful
      // router.push(`/collection/${collectionSummary.slug}-${collectionSummary.shortId}`)
    } catch (error) {
      console.error('Failed to update collection visibility:', error)

      // Ensure revert on any error (in case it wasn't caught above)
      setCollectionSummary(previousCollectionSummary)
      setCollectionSummaries(previousCollectionSummaries)

      setApiResponse({
        success: false,
        message: 'Collection status update failed.',
      })
    }
  }

  const getImages = useCallback(
    async ({
      userId,
      collectionId,
    }: {
      userId?: string
      collectionId?: string
    }) => {
      try {
        const params = new URLSearchParams()
        if (userId) params.append('userId', userId)
        if (collectionId) params.append('collectionId', collectionId)
        const queryString = params.toString()
        const response = await fetch(
          `/api/images${queryString ? `?${queryString}` : ''}`
        )

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()

        if (!result.success) {
          throw new Error(result.error || 'Failed to fetch images')
        }

        setApiResponse({
          success: true,
          message: 'Images ready.',
        })

        return result.data // Return the actual images array
      } catch (error) {
        console.error('Error fetching images:', error)

        setApiResponse({
          success: false,
          message: 'Failed to fetch images.',
        })

        return []
      }
    },
    []
  ) // Empty dependency array since this function doesn't depend on any context values

  return (
    <CollectionContext.Provider
      value={{
        collection,
        setCollection,
        apiResponse,
        setApiResponse,
        addCollectionItem,
        updateLinkedCollections,
        deleteCollection,
        updateCollectionFields,
        getCollectionSummaries,
        updateCollectionItems,
        updateCollectionItem,
        deleteCollectionItem,
        addCollection,
        updateSectionOrder,
        updateCollectionState,
        collectionSummary,
        collectionSummaries,
        getImages,
        updateAuthor,
      }}
    >
      {children}
    </CollectionContext.Provider>
  )
}

export const useCollection = () => {
  const context = useContext(CollectionContext)
  if (!context) {
    throw new Error('useCollection must be used within a CollectionProvider')
  }
  return context
}
