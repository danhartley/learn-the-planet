import { QuestionTemplate } from '@/types'

// Default taxonomic question templates
export const taxonomyTemplates: QuestionTemplate[] = [
  // Stub: Basic templates for taxonomy tests
  {
    type: 'multipleChoice',
    level: 'level 1',
    questionTextTemplate: 'Select the correct common for ${binomial}',
    correctAnswerProperty: 'common',
    distractorCount: 3,
    distractorType: 'common',
  },
  {
    type: 'multipleChoice',
    level: 'level 1',
    questionTextTemplate: 'Select the correct image for ${common}',
    correctAnswerProperty: 'binomial',
    distractorCount: 3,
    distractorType: 'image',
  },
  {
    type: 'multipleChoice',
    level: 'level 1',
    questionTextTemplate: 'Select the correct binomial for ${common}',
    correctAnswerProperty: 'binomial',
    distractorCount: 3,
    distractorType: 'binomial',
  },
  {
    type: 'textEntry',
    level: 'level 1',
    questionTextTemplate: 'Enter the genus for ${species}',
    correctAnswerProperty: 'genus',
    placeholder: 'Genus name',
  },
  {
    type: 'textEntry',
    level: 'level 1',
    questionTextTemplate: 'Enter the common name for ${binomial}',
    correctAnswerProperty: 'common',
    placeholder: 'Common name',
  },
]

// Custom templates for other domains can be created
export const customTemplateSet: QuestionTemplate[] = [
  // Stub: Custom template set
]
