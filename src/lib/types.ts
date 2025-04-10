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
  url?: string
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

export type Taxon = {
  id: number
  iconicTaxon?: string
  names?: {
    vernacularName?: string
    language?: string
    wikiSearchTerm?: boolean
  }[]
  binomial: string
  order?: string
  genus?: string
  species?: string
  vernacularName: string
  family?: string | Family | undefined
  distractors?: Taxon[]
  images?: Image[]
  image?: Image
  taxonomy?: {
    phylum?: string
    family?: string | Family // Allow `family` to be either a string or an object
    class?: string
    kingdom?: string
    order?: string
    genus?: string
    species?: string
  }
  traits?: Record<string, any>
}

export type Collection = {
  id: string
  name: string
  count: number
  index: number
  items: Taxon[]
}

export type Layout = {
  id: string
  level: string
  index: number
  question: Question
  distractorType?: DistractorType
  item?: Taxon
}

export type TestState = {
  layoutIndex: number
  collectionIndex: number
}

export type TestPlan = {
  id: string
  collection: Collection
  state: TestState
  score: Score
  layouts: Layout[]
}

// Lesson

export type Lesson = {
  id: string
  collection: Collection
}

export type LessonPlan = {
  id: string
}

// App state

export type AppState = {
  collections: Collection[]
  testPlans: TestPlan[]
  testPlanId: string
  lessonPlanId: string
}

// Define interfaces for the different question layout types
interface BaseQuestionTemplate {
  type: 'multipleChoice' | 'textEntry' /* other types */
  level: string
  questionTextTemplate: string // Uses ${property} syntax for interpolation
}

export type DistractorType =
  | 'vernacularName'
  | 'binomial'
  | 'genus'
  | 'species'
  | 'image'

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
