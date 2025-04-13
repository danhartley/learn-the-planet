import { QuestionTemplate } from '@/types'

// Default taxonomic question templates
export const taxonomyTemplates: QuestionTemplate[] = [
  // Stub: Basic templates for taxonomy tests
  {
    type: 'textEntry',
    level: 'level 1',
    questionTextTemplate: 'Enter the genus for ${species}',
    correctAnswerProperty: 'genus',
    placeholder: 'Genus name',
  },
  {
    type: 'multipleChoice',
    level: 'level 1',
    questionTextTemplate: 'Select the correct vernacular name for ${binomial}',
    correctAnswerProperty: 'vernacularName',
    distractorCount: 3,
    distractorType: 'vernacularName',
  },
  {
    type: 'multipleChoice',
    level: 'level 1',
    questionTextTemplate: 'Select the correct image for ${vernacularName}',
    correctAnswerProperty: 'binomial',
    distractorCount: 3,
    distractorType: 'image',
  },
  {
    type: 'multipleChoice',
    level: 'level 1',
    questionTextTemplate: 'Select the correct binomial for ${vernacularName}',
    correctAnswerProperty: 'binomial',
    distractorCount: 3,
    distractorType: 'binomial',
  },
  {
    type: 'textEntry',
    level: 'level 1',
    questionTextTemplate: 'Enter the vernacular name name for ${binomial}',
    correctAnswerProperty: 'vernacularName',
    placeholder: 'vernacularName name',
  },
]

// Custom templates for other domains can be created
export const customTemplateSet: QuestionTemplate[] = [
  // Stub: Custom template set
]
