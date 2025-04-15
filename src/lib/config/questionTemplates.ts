import { QuestionTemplate } from '@/types'

// Default taxonomic question templates
export const taxonomyTemplates: QuestionTemplate[] = [
  // Stub: Basic templates for taxonomy tests
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
    questionTextTemplate: 'Enter the genus for ${species}',
    correctAnswerProperty: 'genus',
    placeholder: 'Genus',
  },
  {
    type: 'multipleChoice',
    level: 'level 1',
    questionTextTemplate: 'Select the common name for ${binomial}',
    correctAnswerProperty: 'vernacularName',
    distractorCount: 3,
    distractorType: 'vernacularName',
  },
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
    questionTextTemplate: 'Enter the common name for ${binomial}',
    correctAnswerProperty: 'vernacularName',
    placeholder: 'Common name',
  },
]

// Custom templates for other domains can be created
export const customTemplateSet: QuestionTemplate[] = [
  // Stub: Custom template set
]
