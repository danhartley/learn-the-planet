'use server'
import { Dispatch, SetStateAction } from 'react'
import { getInatTaxonProperties } from '@/api/inat/api'
import { ContentHandlerType, LearningItem } from '@/types'

type Props = {
  isValid: boolean
  type: ContentHandlerType
  items: LearningItem[] | undefined
  setCollectionItems: Dispatch<SetStateAction<LearningItem[]>>
}

export async function CollectionAddInaturalistProperties({
  isValid,
  type,
  items,
  setCollectionItems,
}: Props) {
  const fetchData = async () => {
    if (!items) return

    let collectionItems

    switch (type) {
      case 'taxon':
        const iNatData = await getInatTaxonProperties(
          items.map(item => item.id)
        )
        collectionItems = items.map((item: LearningItem) => {
          return {
            ...iNatData?.find(data => data.id === item.id),
            ...item,
          }
        })
        break
      default:
        collectionItems = items!
    }

    setCollectionItems(collectionItems)
  }
  return <></>
}
