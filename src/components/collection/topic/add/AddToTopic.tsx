import React, { useEffect, useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { SectionTypeSelector } from '@/components/collection/topic/add/SectionTypeSelector'
import { AddToTopicMap } from '@/components/collection/topic/add/AddToTopicMap'

import { getShortId } from '@/utils/strings'

import { SectionType, Topic, Taxon, NextCloudImage } from '@/types'

export const AddToTopic = () => {
  const { collection, addItem, apiResponse } = useCollection()
  const [selectedOption, setSelectedOption] = useState<SectionType>('text')
  const [childItems, setChildItems] = useState<unknown[]>()

  useEffect(() => {
    if (!childItems) return

    const item = {
      id: getShortId(),
    } as Topic

    switch (selectedOption) {
      case 'text':
        item.text = childItems as string[]
        break
      case 'taxon':
        item.examples = childItems as Taxon[]
        break
      case 'image':
        item.images = childItems as NextCloudImage[]
        break
    }

    if (collection) addItem(collection, item)
  }, [childItems])

  return (
    <>
      <SectionTypeSelector
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />

      <AddToTopicMap
        sectionType={selectedOption}
        setItems={setChildItems}
        apiResponse={apiResponse}
      />
    </>
  )
}
