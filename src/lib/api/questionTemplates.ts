import { QuestionTemplate, ContentHandlerType } from '@/types'

export const definitionTemplates: QuestionTemplate[] = [
  {
    type: 'textEntry',
    level: 'level 0',
    questionTextTemplate: '${definition}',
    correctAnswerProperty: 'term',
    placeholder: 'Match',
  },
]

export const taxonomyTemplates: QuestionTemplate[] = [
  {
    type: 'multipleChoice',
    level: 'level 1',
    questionTextTemplate: 'Select the binomial for ${vernacularName}',
    correctAnswerProperty: 'binomial',
    distractorCount: 3,
    distractorType: 'binomial',
  },
  {
    type: 'textEntry',
    level: 'level 1',
    questionTextTemplate: 'Enter the genus for ${species}',
    correctAnswerProperty: 'genus',
    placeholder: 'Genus',
  },
  {
    type: 'multipleChoice',
    level: 'level 1',
    questionTextTemplate: 'Select the image that matches ${vernacularName}',
    correctAnswerProperty: 'binomial',
    distractorCount: 3,
    distractorType: 'image',
  },
  {
    type: 'textEntry',
    level: 'level 1',
    questionTextTemplate: 'Enter the common name for ${binomial}',
    correctAnswerProperty: 'vernacularName',
    placeholder: 'Common name',
  },
  {
    type: 'multipleChoice',
    level: 'level 1',
    questionTextTemplate: 'Select the common name for ${binomial}',
    correctAnswerProperty: 'vernacularName',
    distractorCount: 3,
    distractorType: 'vernacularName',
  },
]

export const getTemplatesByContentType = (
  contentType: ContentHandlerType
): QuestionTemplate[] => {
  const templateMap = {
    taxonomy: taxonomyTemplates,
    definition: definitionTemplates,
  }

  const templates = templateMap[contentType].map(template => {
    template.contentType = contentType
    return template
  })

  return templates
}
