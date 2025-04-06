// Questions

export type MultipleChoiceOption = {
  key: string
  value: string
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

export type Taxon = {
  id: number
  binomial: string
  common?: string
  family?: string
  distractors?: string[]
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
