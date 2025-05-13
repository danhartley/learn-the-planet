import { QuestionTemplate, ContentHandlerType } from '@/types'

export const termTemplates: QuestionTemplate[] = [
  {
    type: 'textEntry',
    level: 'level 0',
    questionTextTemplate: '${definition}',
    correctAnswerProperty: 'term',
    placeholder: 'match',
  },
  {
    type: 'multipleChoice',
    level: 'level 1',
    questionTextTemplate: 'Select the definition for ${term}',
    correctAnswerProperty: 'definition',
    distractorCount: 3,
    distractorType: 'definition',
  },
]

export const taxonTemplates: QuestionTemplate[] = [
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
    placeholder: 'Common',
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

export const traitTemplates: QuestionTemplate[] = [
  {
    type: 'multiSelect',
    level: 'level 1',
    questionTextTemplate: 'Select the phenological traits that match: ${trait}',
    correctAnswerProperty: 'phenology',
    distractorCount: 3,
    distractorType: 'phenology',
  },
  {
    type: 'multiSelect',
    level: 'level 1',
    questionTextTemplate:
      'Select the morphological traits that match: ${trait}',
    correctAnswerProperty: 'morphology',
    distractorCount: 3,
    distractorType: 'morphology',
  },
  {
    type: 'textEntry',
    level: 'level 0',
    questionTextTemplate: '${definition}',
    correctAnswerProperty: 'trait',
    placeholder: 'match',
  },
  {
    type: 'multipleChoice',
    level: 'level 1',
    questionTextTemplate: 'Select the definition for ${trait}',
    correctAnswerProperty: 'definition',
    distractorCount: 3,
    distractorType: 'definition',
  },
]
export const topicTemplates: QuestionTemplate[] = []

export const getTemplatesByContentType = (
  contentType: ContentHandlerType
): QuestionTemplate[] => {
  const templateMap = {
    taxon: taxonTemplates,
    term: termTemplates,
    trait: traitTemplates,
    topic: topicTemplates,
  }

  const templates = templateMap[contentType].map(template => {
    template.contentType = contentType
    return template
  })

  return templates
}
