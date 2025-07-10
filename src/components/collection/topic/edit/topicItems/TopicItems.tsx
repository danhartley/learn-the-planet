'use client'
import React from 'react'

import { useCollection } from '@/contexts/CollectionContext'
import { TopicItem } from './TopicItem'
import { useAccordion } from './hooks/useAccordion'
import { useDragAndDrop } from './hooks/useDragAndDrop'

import { Collection, Topic } from '@/types'

export const TopicItems = () => {
  const { collection } = useCollection()
  const topicCollection = collection as Collection<Topic>
  const { visibleSectionId, toggleSection } = useAccordion()
  const {
    draggedItemId,
    dragOverItemId,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop,
    handleKeyDown,
    isReorderMode,
    setIsReorderMode,
    error,
  } = useDragAndDrop(topicCollection, topicCollection.items)

  if (!topicCollection.items) {
    return (
      <section aria-labelledby="topics-list">
        <h2 id="topics-list">Topics</h2>
        <p>Nothing to show yet!</p>
      </section>
    )
  }

  return (
    <>
      {error && (
        <div role="alert" className="error-message">
          Failed to save section order: {error}
        </div>
      )}
      <section aria-labelledby="topics-list">
        <div className="group">
          <h2 id="traits-list">Topic sections</h2>
          <div>
            <em>
              Click to edit or delete a topic. To change the position of a
              section, click on its button and move up or down.
            </em>
          </div>
        </div>
        {topicCollection.items.length > 0 ? (
          <ul>
            {topicCollection.items.map((section, index) => (
              <TopicItem
                key={`${section.id}-${index}`}
                section={section}
                index={index}
                isVisible={visibleSectionId === section.id}
                isDragged={draggedItemId === section.id}
                isDraggedOver={dragOverItemId === section.id}
                isReorderMode={isReorderMode}
                onToggle={() => toggleSection(section.id)}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
                onDrop={handleDrop}
                onKeyDown={handleKeyDown}
                onReorderModeChange={setIsReorderMode}
                topicCollection={topicCollection}
              />
            ))}
          </ul>
        ) : (
          <div>
            <strong>Select "Add Item" to begin creating content.</strong>
          </div>
        )}
      </section>
    </>
  )
}
