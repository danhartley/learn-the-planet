import { LearningItem } from '@/types'
import { QuestionTemplateSelection } from '@/types'

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
