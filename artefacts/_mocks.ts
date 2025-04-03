import {
  MultipleChoiceOption,
  MultipleChoiceQuestion,
  TextEntryQuestion,
} from './_types'

const test1: {
  question: MultipleChoiceQuestion
  answer: string
} = {
  question: {
    text: 'Which description matches the yew family',
    type: 'Multiple choice',
    correctAnswer: 'Taxaceae',
    options: [
      {
        display: 'Coniferous family of many-branched, small trees and shrubs.',
        value: 'Taxaceae',
      },
      {
        display:
          'Low-lying shrubs (some herbaceous) preferring sunny habitats on poor soils in mainly temperate areas of Europe and the Mediterranean.',
        value: 'Cistaceae',
      },
    ],
  },
  answer: 'Taxaceae',
}

const test2: {
  question: MultipleChoiceQuestion
  answer: string
} = {
  question: {
    text: 'What is common name?',
    type: 'Multiple choice',
    correctAnswer: 'Teixo',
    options: [
      {
        display: 'Oliveira',
        value: 'Oliveira',
      },
      {
        display: 'Teixo',
        value: 'Teixo',
      },
    ],
  },
  answer: 'Oliveira',
}

const test3: { question: TextEntryQuestion; answer: string } = {
  question: {
    text: 'Enter full Latin name',
    type: 'Text entry',
    correctAnswer: 'Taxus baccata',
  },
  answer: 'taxus  baccata',
}

const test4: { question: TextEntryQuestion; answer: string } = {
  question: {
    text: 'Enter species name',
    type: 'Text entry',
    correctAnswer: 'baccata',
    hint: 'Taxus',
  },
  answer: 'baccata',
}

const test5: { question: TextEntryQuestion; answer: string } = {
  question: {
    text: 'Identify this species',
    type: 'Text entry',
    correctAnswer: 'Taxus baccata',
  },
  answer: 'Taxus',
}

export const mockTest = {
  test1,
  test2,
  test3,
  test4,
  test5,
}
