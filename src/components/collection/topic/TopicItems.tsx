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

  return (
    <>
      {topicCollection?.items &&
        topicCollection.items.map((section, index) => {
          return (
            <React.Fragment key={section.id}>
              <TopicSections
                key={section.id}
                collection={topicCollection}
                section={section}
                sectionIndex={index + 1}
              />
              {section.images?.map(img => {
                return (
                  <TopicCloudImage
                    key={img.src}
                    collection={topicCollection}
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
            </React.Fragment>
          )
        })}
    </>
  )
}
