import { useState, useCallback, useRef } from 'react'
import { useCollection } from '@/contexts/CollectionContext'
import { Collection, Topic } from '@/types'

export const useDragAndDrop = (
  topicCollection: Collection<Topic>,
  items?: Topic[]
) => {
  const { updateSectionOrder } = useCollection()

  const [draggedItemId, setDraggedItemId] = useState<string | null>(null)
  const [dragOverItemId, setDragOverItemId] = useState<string | null>(null)
  const [isReorderMode, setIsReorderMode] = useState(false)
  const [currentReorderIndex, setCurrentReorderIndex] = useState<number>(-1)
  const [error, setError] = useState<string | null>(null)

  const pendingOrderRef = useRef<string[] | null>(null)

  const save = useCallback(
    async (newOrder: string[]) => {
      // Store the pending order
      pendingOrderRef.current = newOrder

      try {
        await updateSectionOrder(topicCollection, pendingOrderRef.current!)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
      }
      pendingOrderRef.current = null
    },
    [updateSectionOrder, topicCollection]
  )

  const reorderItems = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (!items || fromIndex === toIndex) return

      const newItems = [...items]
      const [movedItem] = newItems.splice(fromIndex, 1)
      newItems.splice(toIndex, 0, movedItem)

      const newOrder = newItems.map(item => item.id)
      save(newOrder)
    },
    [items, save]
  )

  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLLIElement>, sectionId: string) => {
      if (!items) {
        return
      }

      setDraggedItemId(sectionId)
      setError(null)

      // Set drag data
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text/plain', sectionId)
    },
    [items]
  )

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'

    const target = e.currentTarget
    const rect = target.getBoundingClientRect()
    const midY = rect.top + rect.height / 2

    // Visual feedback for drop position
    if (e.clientY < midY) {
      target.classList.add('drag-over-top')
      target.classList.remove('drag-over-bottom')
    } else {
      target.classList.add('drag-over-bottom')
      target.classList.remove('drag-over-top')
    }
  }, [])

  const handleDragEnd = useCallback((e: React.DragEvent<HTMLLIElement>) => {
    setDraggedItemId(null)
    setDragOverItemId(null)

    // Clean up drag classes
    const target = e.currentTarget
    target.classList.remove('drag-over-top', 'drag-over-bottom')
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLLIElement>, targetSectionId: string) => {
      e.preventDefault()

      if (!items || !draggedItemId) return

      const draggedIndex = items.findIndex(item => item.id === draggedItemId)
      const targetIndex = items.findIndex(item => item.id === targetSectionId)

      if (draggedIndex === -1 || targetIndex === -1) return

      // Determine drop position based on mouse position
      const target = e.currentTarget
      const rect = target.getBoundingClientRect()
      const midY = rect.top + rect.height / 2
      const dropIndex = e.clientY < midY ? targetIndex : targetIndex + 1

      reorderItems(draggedIndex, dropIndex)

      // Clean up
      target.classList.remove('drag-over-top', 'drag-over-bottom')
      setDraggedItemId(null)
    },
    [items, draggedItemId, reorderItems]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, sectionId: string) => {
      if (!items) return

      const currentIndex = items.findIndex(item => item.id === sectionId)

      switch (e.key) {
        case ' ': // Space to enter reorder mode
          if (!isReorderMode) {
            e.preventDefault()
            setIsReorderMode(true)
            setCurrentReorderIndex(currentIndex)
            setError(null)
          }
          break

        case 'Escape': // Escape to exit reorder mode
          if (isReorderMode) {
            e.preventDefault()
            setIsReorderMode(false)
            setCurrentReorderIndex(-1)
          }
          break

        case 'Enter': // Enter to place item at current position
          if (isReorderMode && currentReorderIndex !== -1) {
            e.preventDefault()
            reorderItems(currentIndex, currentReorderIndex)
            setIsReorderMode(false)
            setCurrentReorderIndex(-1)
          }
          break

        case 'ArrowUp': // Move up in reorder mode
          if (isReorderMode && currentReorderIndex > 0) {
            e.preventDefault()
            setCurrentReorderIndex(currentReorderIndex - 1)
          }
          break

        case 'ArrowDown': // Move down in reorder mode
          if (isReorderMode && currentReorderIndex < items.length - 1) {
            e.preventDefault()
            setCurrentReorderIndex(currentReorderIndex + 1)
          }
          break
      }
    },
    [items, isReorderMode, currentReorderIndex, reorderItems]
  )

  return {
    draggedItemId,
    dragOverItemId,
    isReorderMode,
    currentReorderIndex,
    error,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop,
    handleKeyDown,
    setIsReorderMode,
  }
}
