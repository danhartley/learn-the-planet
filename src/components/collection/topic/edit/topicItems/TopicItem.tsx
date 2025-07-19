'use client'
import React from 'react'

import { TopicTextSections } from '@/components/collection/topic/edit/TopicTextSections'
import { TopicCloudImage } from '@/components/collection/topic/edit/TopicCloudImage'
import { TopicExamples } from '@/components/collection/topic/edit/TopicExamples'
import { TopicCredit } from '@/components/collection/topic/edit/TopicCredit'
import { TopicSummary } from '@/components/collection/topic/edit/topicItems//TopicSummary'

import { Collection, Topic } from '@/types'

interface TopicItemProps {
  section: Topic
  index: number
  isVisible: boolean
  isDragged: boolean
  isDraggedOver: boolean
  isReorderMode: boolean
  onToggle: () => void
  onDragStart: (e: React.DragEvent<HTMLLIElement>, sectionId: string) => void
  onDragOver: (e: React.DragEvent<HTMLLIElement>) => void
  onDragEnd: (e: React.DragEvent<HTMLLIElement>) => void
  onDrop: (e: React.DragEvent<HTMLLIElement>, targetSectionId: string) => void
  onKeyDown: (
    e: React.KeyboardEvent<HTMLButtonElement>,
    sectionId: string
  ) => void
  onReorderModeChange: (isReorderMode: boolean) => void
  topicCollection: Collection<Topic>
}

export const TopicItem: React.FC<TopicItemProps> = ({
  section,
  index,
  isVisible,
  isDragged,
  isDraggedOver,
  isReorderMode,
  onToggle,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDrop,
  onKeyDown,
  onReorderModeChange,
  topicCollection,
}) => {
  const [dragStartedFromButton, setDragStartedFromButton] =
    React.useState(false)

  const handleMouseDown = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLElement
    const button = target.closest('.draggable')
    setDragStartedFromButton(!!button)
  }

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    if (!dragStartedFromButton) {
      e.preventDefault()
      return
    }

    // Close the section if it's expanded
    if (isVisible) {
      onToggle()
    }

    onDragStart(e, section.id)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown(e, section.id)
  }

  const handleReorderToggle = () => {
    if (isReorderMode) {
      onReorderModeChange(false)
    } else {
      onReorderModeChange(true)
    }
  }

  return (
    <li
      className={`list-group ${isDragged ? 'dragging' : ''} ${isDraggedOver ? 'drag-over' : ''}`}
      draggable="true"
      onMouseDown={handleMouseDown}
      onDragStart={handleDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDrop={e => onDrop(e, section.id)}
    >
      <div className="horizontal-group">
        <button
          type="button"
          id={section.id}
          className="draggable"
          onClick={isReorderMode ? handleReorderToggle : onToggle}
          onKeyDown={handleKeyDown}
          aria-expanded={isVisible}
          aria-controls={`section-content-${section.id}`}
          aria-label={
            isReorderMode
              ? `Section ${index + 1}. Reorder mode active. Press Enter to place here, Escape to cancel, or arrow keys to move.`
              : `Section ${index + 1}. Press to expand or collapse. Press Space to enter reorder mode.`
          }
        >
          <div className="index">{index + 1}</div>
        </button>
        <TopicSummary section={section} />
      </div>
      {isVisible && (
        <div id={`section-content-${section.id}`}>
          <TopicTextSections key={section.id} section={section} />
          {section.images?.map(img => (
            <TopicCloudImage
              key={img.src}
              section={section}
              image={img}
              sectionIndex={index + 1}
            />
          ))}
          {section.examples && (
            <TopicExamples
              collection={topicCollection}
              section={section}
              sectionIndex={index + 1}
            />
          )}
          {section.credit && (
            <TopicCredit
              collection={topicCollection}
              section={section}
              sectionIndex={index + 1}
            />
          )}
        </div>
      )}
    </li>
  )
}
