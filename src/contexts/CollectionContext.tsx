'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

import {
  Collection,
  CollectionSummary,
  ApiResponse,
  UpdateCollectionFieldsOptions,
} from '@/types'

type CollectionContextType = {
  collection: Collection<unknown> | null
  setCollection: (collection: Collection<unknown>) => void
  apiResponse: ApiResponse
  setApiResponse: (response: ApiResponse) => void
  addItem: (collection: Collection<unknown>, item: unknown) => Promise<void>
  updateItem: (id: string, updates: Partial<unknown>) => Promise<void>
  removeItem: (id: string) => Promise<void>
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
}

const CollectionContext = createContext<CollectionContextType | undefined>(
  undefined
)

type CollectionProviderProps = {
  children: ReactNode
  initialCollection: Collection<unknown>
}

export const CollectionProvider = ({
  children,
  initialCollection,
}: CollectionProviderProps) => {
  const [collection, setCollection] = useState<Collection<unknown> | null>(
    initialCollection
  )
  const [apiResponse, setApiResponse] = useState<ApiResponse>({
    success: false,
    message: '',
  })

  const addItem = async (collection: Collection<unknown>, item: unknown) => {
    if (!collection) return

    if (!collection) return
    try {
      const itemId = (item as { id: string }).id
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
    // Optimistic update
    setCollection(prev =>
      prev
        ? {
            ...prev,
            items: [...(prev.items || []), item],
          }
        : null
    )
  }

  const updateItem = async (id: string, updates: Partial<unknown>) => {
    if (!collection) return

    // API call stub - add your implementation
    console.log('Updating item:', id, updates)

    // Optimistic update
    setCollection(prev =>
      prev
        ? {
            ...prev,
            items: (prev.items || []).map(item =>
              //eslint-disable-next-line @typescript-eslint/no-explicit-any
              (item as any).id === id ? { ...item, ...updates } : item
            ),
          }
        : null
    )
  }

  const removeItem = async (id: string) => {
    if (!collection) return

    // API call stub - add your implementation
    console.log('Removing item:', id)

    // Optimistic update
    setCollection(prev =>
      prev
        ? {
            ...prev,
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
            items: (prev.items || []).filter(item => (item as any).id !== id),
          }
        : null
    )
  }

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

  const getCollectionSummaries = async (): Promise<CollectionSummary[]> => {
    const response = await fetch('/api/collection-summaries')
    return response.json()
  }

  const updateCollectionItems = async (
    collection: Collection<unknown>,
    items: unknown[]
  ) => {
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
  }

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

  return (
    <CollectionContext.Provider
      value={{
        collection,
        setCollection,
        apiResponse,
        setApiResponse,
        addItem,
        updateItem,
        removeItem,
        updateLinkedCollections,
        deleteCollection,
        updateCollectionFields,
        getCollectionSummaries,
        updateCollectionItems,
        updateCollectionItem,
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
