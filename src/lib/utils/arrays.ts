import { LearningItem, InatTaxon } from '@/types'
import {
  QuestionTemplateSelection,
  GroupedCollectionSummaries,
  CollectionSummary,
} from '@/types'

export const updateTemplate = (
  templates: QuestionTemplateSelection[],
  typeToUpdate: QuestionTemplateSelection
): QuestionTemplateSelection[] => {
  return templates.map(
    template =>
      template.type === typeToUpdate.type
        ? { ...template, isSelected: typeToUpdate.isSelected } // Create new object with updated property
        : template // Keep unchanged objects as-is
  )
}

export const dedupe = (items: LearningItem[]) => {
  const deduped = Array.from(
    new Map(items.map(item => [item.id, item])).values()
  )

  return deduped
}

export const groupCollectionsByType = (
  collections: CollectionSummary[]
): GroupedCollectionSummaries => {
  const groups: GroupedCollectionSummaries = {
    taxon: [],
    term: [],
    topic: [],
    trait: [],
  }

  collections.forEach(collection => {
    const type = collection.type
    switch (type.toString()) {
      case 'taxon':
        groups.taxon.push(collection)
        break
      case 'term':
        groups.term.push(collection)
        break
      case 'topic':
        groups.topic.push(collection)
        break
      case 'trait':
        groups.trait.push(collection)
        break
    }
  })

  return groups
}

export const sortedArrayByRank = (array: InatTaxon[]) => {
  return array.sort((a, b) => {
    if (a.rank === 'species' && b.rank !== 'species') return -1
    if (a.rank !== 'species' && b.rank === 'species') return 1
    return 0
  })
}
