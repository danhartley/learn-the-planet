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
  url: string
}

export type Taxon = {
  id: number
  binomial: string
  genus?: string
  species?: string
  common?: string
  family?: string
  distractors?: Taxon[]
  images: Image[]
  image?: Image
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
  | 'binomial'
  | 'genus'
  | 'species'
  | 'image' /* others */

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
