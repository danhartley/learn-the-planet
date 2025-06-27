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
    <div className="column-group">
      {topicCollection.items &&
        topicCollection.items.map((section, index) => {
          return (
            <>
              <div id={section.id} className="navigable">
                <div>{index + 1}</div>
              </div>
              <div key={section.id} className="group-block">
                <TopicSections key={section.id} section={section} />
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
            </>
          )
        })}
    </div>
  )
}
