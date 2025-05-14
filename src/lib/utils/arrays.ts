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
