import {
  MultipleChoiceOption,
  MultipleChoiceQuestion,
  TextEntryQuestion,
  Test,
} from '@/types'

const test1: Test = {
  question: {
    text: 'Which description matches the yew family',
    type: 'Multiple choice',
    key: 'Taxaceae',
    options: [
      {
        key: 'Taxaceae',
        value: 'Coniferous family of many-branched, small trees and shrubs.',
      },
      {
        key: 'Cistaceae',
        value:
          'Low-lying shrubs (some herbaceous) preferring sunny habitats on poor soils in mainly temperate areas of Europe and the Mediterranean.',
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
    text: 'What is vernacularName name?',
    type: 'Multiple choice',
    key: 'Teixo',
    options: [
      {
        value: 'Oliveira',
        key: 'Oliveira',
      },
      {
        value: 'Teixo',
        key: 'Teixo',
      },
    ],
  },
  answer: 'Oliveira',
}

const test3: { question: TextEntryQuestion; answer: string } = {
  question: {
    text: 'Enter full Latin name',
    type: 'Text entry',
    key: 'Taxus baccata',
  },
  answer: 'taxus  baccata',
}

const test4: { question: TextEntryQuestion; answer: string } = {
  question: {
    text: 'Enter species name',
    type: 'Text entry',
    key: 'baccata',
    hint: 'Taxus',
  },
  answer: 'baccata',
}

const test5: { question: TextEntryQuestion; answer: string } = {
  question: {
    text: 'Identify this species',
    type: 'Text entry',
    key: 'Taxus baccata',
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
