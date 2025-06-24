'use client'
import React from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { TopicSections } from '@/components/collection/topic/TopicSections'
import { TopicCloudImage } from '@/components/collection/topic/TopicCloudImage'
import { TopicExamples } from '@/components/collection/topic/TopicExamples'

import { Collection, Topic } from '@/types'

export const TopicItems = () => {
  const { collection } = useCollection()
  const topicCollection = collection as Collection<Topic>

  // const updateSectionImages = useCallback(
  //   (sectionIndex: number, newImage: CloudImage) => {
  //     setCollection(prev => {
  //       if (!prev) return prev
  //       const newItems = [...prev.items]
  //       const section = newItems[sectionIndex] as Topic
  //       newItems[sectionIndex] = {
  //         ...section,
  //         images: [...(section.images ?? []), newImage],
  //       }
  //       return { ...prev, items: newItems }
  //     })
  //   },
  //   []
  // )

  //   collection.items.map((section, index) =>
  //   <TopicCloudImage
  //     key={section.id}
  //     section={section}
  //     onUpdateImages={(image) => updateSectionImages(index, image)}
  //   />
  // )

  return (
    <div>
      {topicCollection.items &&
        topicCollection.items.map((section, index) => {
          return (
            <div
              key={section.id}
              id={section.id}
              className="group-block navigable"
            >
              <TopicSections
                key={section.id}
                section={section}
                sectionIndex={index + 1}
              />
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
          )
        })}
    </div>
  )
}
