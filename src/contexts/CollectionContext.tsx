'use client'
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react'

import {
  Collection,
  CollectionSummary,
  ApiResponse,
  UpdateCollectionFieldsOptions,
  ContentHandlerType,
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
    imageUrl?: string
  ) => Promise<void>
  updateSectionOrder: (
    collection: Collection<unknown>,
    sectionOrder: string[]
  ) => void
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
  const [apiResponse, setApiResponse] = useState<ApiResponse>({
    success: false,
    message: '',
  })

  // Add or update item
  const addCollectionItem = useCallback(
    async (collection: Collection<unknown>, item: unknown) => {
      if (!collection || !item) return

      const itemId = (item as { id: string }).id
      if (!itemId) return

      // Optimistic update (moved to beginning)
      const previousCollection = collection
      setCollection(prev =>
        prev
          ? {
              ...prev,
              items: [...(prev.items || []), item],
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
          body: JSON.stringify(item),
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
        message: 'Collection references update succeeded.',
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
    return response.json()
  }, [])

  const updateCollectionItems = useCallback(
    async (collection: Collection<unknown>, items: unknown[]) => {
      if (!collection || !items) return

      // Optimistic update
      const previousCollection = collection
      setCollection(prev =>
        prev
          ? {
              ...prev,
              items: items,
              itemCount: items.length,
            }
          : null
      )

      try {
        const url = `/api/collection/update-items/${collection.slug}-${collection.shortId}`
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(items),
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
          message: 'Collection items update succeeded.',
        })
      } catch (error) {
        console.error('Failed to update collection:', error)

        // Ensure revert on any error (in case it wasn't caught above)
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

    // Optimistic update
    const previousCollection = collection
    setCollection(prev =>
      prev && prev.items
        ? {
            ...prev,
            items: prev.items.map(item =>
              (item as { id: string }).id === itemId ? updatedItem : item
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
        body: JSON.stringify(updatedItem),
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
      console.log('updatedCollection', updatedCollection)
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

    // setTimeout(async () => {
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
      console.error('Failed to update collection:', error)

      // Ensure revert on any error (in case it wasn't caught above)
      setCollection(previousCollection)

      setApiResponse({
        success: false,
        message: 'Collection field updates failed.',
      })
    }
    // }, 2000)
  }

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
