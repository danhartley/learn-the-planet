'use client'
import React, { useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { TopicTextSections } from '@/components/collection/topic/edit/TopicTextSections'
import { TopicCloudImage } from '@/components/collection/topic/edit/TopicCloudImage'
import { TopicExamples } from '@/components/collection/topic/edit/TopicExamples'

import { Collection, Topic } from '@/types'

export const TopicItems = () => {
  const { collection } = useCollection()
  const topicCollection = collection as Collection<Topic>

  // State to track which section is visible (only one at a time)
  const [visibleSectionId, setVisibleSectionId] = useState<string | null>(
    topicCollection.items?.length ? topicCollection.items[0].id : null
  )

  // Toggle visibility of a section (only one can be open at a time)
  const toggleSection = (sectionId: string) => {
    setVisibleSectionId(prev => (prev === sectionId ? null : sectionId))
  }

  if (!topicCollection.items) {
    return (
      <section aria-labelledby="traits-list">
        <h2 id="traits-list">Topics</h2>
        <p>Nothing to show yet!</p>
      </section>
    )
  }

  const getSummaryText = (section: Topic): string => {
    if (section.topic) {
      return `Text: ${section.topic}`
    }

    if (section.text?.length) {
      const firstText = section.text.find(t => t && t.trim())
      if (firstText) {
        return `Text: ${firstText.length > 100 ? firstText.slice(0, 100) + '…' : firstText}`
      }
    }

    if (section.images?.length) {
      const firstImage = section.images.find(i => i?.caption)
      if (firstImage?.caption) {
        return `Image: ${firstImage.caption}`
      }
      return `Image: ${section.images.length} image${section.images.length > 1 ? 's' : ''}`
    }

    if (section.examples?.length) {
      const binomials = section.examples
        .map(e => e?.binomial)
        .filter(Boolean)
        .slice(0, 3) // Show max 3 taxa

      if (binomials.length > 0) {
        const taxaText = binomials.join(', ')
        const remaining = section.examples.length - binomials.length
        return `Taxa: ${taxaText}${remaining > 0 ? ` (+${remaining} more)` : ''}`
      }
      return `Taxa: ${section.examples.length} example${section.examples.length > 1 ? 's' : ''}`
    }

    return `Section ${section.id}`
  }

  return (
    <ul>
      {topicCollection.items &&
        topicCollection.items.map((section, index) => {
          const isVisible = visibleSectionId === section.id

          return (
            <li key={`${section.id}-${index}`} className="column-group">
              <div className="horizontal-group">
                <button
                  type="button"
                  id={section.id}
                  className="draggable"
                  onClick={() => toggleSection(section.id)}
                  aria-expanded={isVisible}
                  aria-controls={`section-content-${section.id}`}
                >
                  <div className="index">{index + 1}</div>
                </button>
                <div>{getSummaryText(section)}</div>
              </div>
              {isVisible && (
                <div
                  key={section.id}
                  className="group-block"
                  id={`section-content-${section.id}`}
                >
                  <TopicTextSections key={section.id} section={section} />
                  {section.images?.map(img => {
                    return (
                      <TopicCloudImage
                        key={img.src}
                        section={section}
                        image={img}
                        sectionIndex={index + 1}
                      />
                    )
                  })}
                  {section.examples && (
                    <TopicExamples
                      collection={topicCollection}
                      section={section}
                      sectionIndex={index + 1}
                    />
                  )}
                </div>
              )}
            </li>
          )
        })}
    </ul>
  )
}
