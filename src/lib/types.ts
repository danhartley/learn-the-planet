// Questions

export type MultipleChoiceOption = {
  key: string
  value: string | Image | undefined
}

export type QuestionType = 'Multiple choice' | 'Text entry'

export type MultipleChoiceQuestion = {
  type: QuestionType
  key: string
  text: string
  options: MultipleChoiceOption[]
}

export type TextEntryQuestion = {
  type: QuestionType
  key: string
  text: string
  hint?: string
  contentType?: string
}

export type Question = MultipleChoiceQuestion | TextEntryQuestion

export type Score = {
  isCorrect: boolean
  questionCount: number
  correctCount: number
  incorrectCount: number
}

export type Test = {
  question: Question
  answer: string
}

// Collections and taxon items

export type Image = {
  id: number
  url: string
  licenceCode?: string
  mediumUrl?: string
  squareUrl?: string
}

export type Family = {
  genera?: number
  members?: string[]
  names: string[]
  summary?: string
  species?: number
  identification?: string
  taxon?: string
  traits?: {
    pollination?: { value: string[] }
    'leaf arrangement'?: { value: string[] }
    inflorescence?: { value: string[] }
    'petal count'?: { value: string[] }
    'fruit type'?: { value: string[] }
  }
  wiki?: string
  eol?: string
  name?: string
  iconicTaxon?: string
  taxonomy?: {
    phylum: string
    class: string
    kingdom: string
    order: string
  }
  vernacularName?: string
}

export interface LearningItem {
  id: number
  distractors?: any[]
}

export interface Taxon extends LearningItem {
  iconicTaxon?: string
  names?: {
    vernacularName?: string
    language?: string
    wikiSearchTerm?: string
  }[]
  binomial: string
  rank?: string
  order?: string
  genus?: string
  species?: string
  vernacularName: string
  family?: string | Family | undefined
  images?: Image[]
  image?: Image
  taxonomy?: {
    phylum?: string
    family?: string | Family
    class?: string
    kingdom?: string
    order?: string
    genus?: string
    species?: string
  }
  traits?: Record<string, any>
  observationURL?: string
}

export interface Definition extends LearningItem {
  term: string
  definition: string
  source?: string
  example?: string
}

export type Collection<T> = {
  id: string
  type: string
  name: string
  date?: string
  location?: string
  fieldNotes?: {
    url: string
  }
  items: T[]
}

export type CollectionSummary = {
  name: string
  type: string
}

export type Layout<T> = {
  id: string
  level: string
  index: number
  question: Question
  distractorType?: DistractorType
  collection: CollectionSummary
  item: T
}

export type TestState = {
  layoutIndex: number
  collectionIndex: number
}

export type TestPlan<T> = {
  id: string
  collection: Collection<T>
  state: TestState
  score: Score
  layouts: Layout<T>[]
}

// Define interfaces for the different question layout types
interface BaseQuestionTemplate {
  type: 'multipleChoice' | 'textEntry' /* other types */
  level: string
  questionTextTemplate: string // Uses ${property} syntax for interpolation
  contentType?: string
}

export type DistractorType =
  | 'vernacularName'
  | 'binomial'
  | 'genus'
  | 'species'
  | 'image'
  | 'term'

export interface MultipleChoiceTemplate extends BaseQuestionTemplate {
  type: 'multipleChoice'
  correctAnswerProperty: string // Property path on Taxon to get correct answer
  distractorCount: number
  distractorType: DistractorType
}

export interface TextEntryTemplate extends BaseQuestionTemplate {
  type: 'textEntry'
  correctAnswerProperty: string
  placeholder: string
}

export type QuestionTemplate =
  | MultipleChoiceTemplate
  | TextEntryTemplate /* other types */

export interface ContentTypeHandler<T> {
  // Transform items into questions based on templates
  createQuestions(
    collection: Collection<T>,
    item: T,
    templates: QuestionTemplate[]
  ): Question[]

  // Generate distractors for this content type
  generateDistractors(
    collection: Collection<T>,
    item: T,
    count: number,
    distractorType: DistractorType
  ): any[]

  // Validate answers for this content type
  validateAnswer(question: Question, answer: string): boolean
}

export type ContentHandlerType = 'taxonomy' | 'definition'
