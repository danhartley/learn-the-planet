import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getInatTaxonProperties } from '@/api/inat/api'
import { generateGenusAndSpeciesFields } from '@/utils/taxa'

import {
  ContentHandlerType,
  LearningItem,
  Collection,
  Taxon,
  Trait,
} from '@/types'

export const useCollectionOperations = () => {
  const [type, setType] = useState<ContentHandlerType>('topic')
  const [name, setName] = useState<string>('')
  const [items, setItems] = useState<unknown[] | undefined>()
  const [collectionItems, setCollectionItems] = useState<
    LearningItem[] | undefined
  >()
  const [message, setMessage] = useState('')
  const router = useRouter()

  // Derived validation states
  const isNameValid = name.trim().length > 0
  const isItemsValid = !!items && items.length > 0
  const needsCollectionItems = ['taxon', 'trait'].includes(type)
  const isCollectionItemsValid =
    !needsCollectionItems || (!!collectionItems && collectionItems.length > 0)
  const isValid = isNameValid && isItemsValid && isCollectionItemsValid

  const createCollectionMessage = isValid
    ? `You're ready to create a new ${type} collection`
    : 'Please complete the sections above'

  const addInaturalistProperties = async () => {
    if (!items) return
    const inaturalistItems = await getInatTaxonProperties({
      items: items as Taxon[],
      type,
    })
    setCollectionItems(inaturalistItems)
    setMessage('Properties added')
  }

  const transformCollectionData = (collection: Collection<LearningItem>) => {
    if (type === 'taxon') {
      return {
        ...collection,
        items: generateGenusAndSpeciesFields(collection.items as Taxon[]),
      }
    }

    if (type === 'trait') {
      return {
        ...collection,
        items: (collection.items as Trait[]).map(trait => ({
          ...trait,
          examples: generateGenusAndSpeciesFields(trait?.examples as Taxon[]),
        })),
      }
    }

    return collection
  }

  const addCollection = async () => {
    const slug = name.trim().toLowerCase().replace(/\s+/g, '-')
    const collection: Collection<LearningItem> = {
      type,
      name,
      slug,
      items: collectionItems!,
      itemCount: items?.length || 0,
    }

    const transformedCollection = transformCollectionData(collection)

    const result = await fetch('/api/collection', {
      method: 'POST',
      body: JSON.stringify(transformedCollection),
    })

    const newCollection: Collection<unknown> = await result.json()
    router.push(`/collection/${newCollection.shortId}`)
  }

  return {
    type,
    setType,
    name,
    setName,
    items,
    setItems: setItems,
    collectionItems,
    message,
    isValid,
    isItemsValid,
    needsCollectionItems,
    createCollectionMessage,
    addInaturalistProperties,
    addCollection,
  }
}
