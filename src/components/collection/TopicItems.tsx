'use client'
import React from 'react'

import { CollectionTopicSection } from '@/components/common/edit/CollectionTopicSection'
import { CollectionTopicCloudImage } from '@/components/common/edit/CollectionTopicCloudImage'
import { CollectionSectionExamples } from '@/components/common/taxon/CollectionSectionExamples'

import { Collection, Topic } from '@/types'

type Props = {
  collection: Collection<Topic>
}

export const TopicItems = ({ collection }: Props) => {
  return (
    <>
      {collection.items &&
        collection.items.map(section => {
          return (
            <React.Fragment key={section.id}>
              <CollectionTopicSection
                key={section.id}
                collection={collection}
                section={section}
              />
              {section.images?.map(img => {
                return (
                  <CollectionTopicCloudImage
                    collection={collection}
                    section={section}
                    key={img.src}
                    image={img}
                  />
                )
              })}
              {section.examples && (
                <CollectionSectionExamples
                  collection={collection}
                  section={section}
                />
              )}
            </React.Fragment>
          )
        })}
    </>
  )
}
