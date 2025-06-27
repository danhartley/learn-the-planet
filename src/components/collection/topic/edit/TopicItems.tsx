'use client'
import React from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { TopicTextSections } from '@/components/collection/topic/edit/TopicTextSections'
import { TopicCloudImage } from '@/components/collection/topic/edit/TopicCloudImage'
import { TopicExamples } from '@/components/collection/topic/edit/TopicExamples'

import { Collection, Topic } from '@/types'

export const TopicItems = () => {
  const { collection } = useCollection()
  const topicCollection = collection as Collection<Topic>

  if (!topicCollection.items) {
    return (
      <section aria-labelledby="traits-list">
        <h2 id="traits-list">Topics</h2>
        <p>Nothing to show yet!</p>
      </section>
    )
  }

  return (
    <div className="column-group">
      {topicCollection.items &&
        topicCollection.items.map((section, index) => {
          return (
            <React.Fragment key={`${section.id}-${index}`}>
              <div id={section.id} className="navigable">
                <div>{index + 1}</div>
              </div>
              <div key={section.id} className="group-block">
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
            </React.Fragment>
          )
        })}
    </div>
  )
}
