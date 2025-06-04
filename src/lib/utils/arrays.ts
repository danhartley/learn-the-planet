import { LearningItem } from '@/types'
import {
  QuestionTemplateSelection,
  GroupedCollectionSummaries,
  CollectionSummary,
  ContentHandlerType,
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

export const groupCollectionsByType = <T>(
  collections: CollectionSummary[]
): GroupedCollectionSummaries => {
  const groups: GroupedCollectionSummaries = {
    taxon: [],
    term: [],
    topic: [],
    trait: [],
  }

  collections.forEach(collection => {
    const type = collection.type as ContentHandlerType
    groups[type].push(collection)
  })

  return groups
}
