import { describe, it, expect, beforeEach } from 'vitest'
import { Scorer } from './scorer'
import { mockTest } from './mock-test'

describe('Single question test score', () => {
  let scorer: Scorer
  beforeEach(() => {
    scorer = new Scorer()
  })

  it('should mark correct answer as correct', () => {
    const score = scorer.markAnswer(
      {
        text: '',
        type: 'Multiple choice',
        key: 'Taxaceae',
        options: [
          {
            key: '',
            value: '',
          },
          {
            key: '',
            value: '',
          },
        ],
      },
      'Taxaceae'
    )
    expect(score.isCorrect).toBe(true)
  })

  it('should mark incorrect answer as incorrect', () => {
    const score = scorer.markAnswer(
      {
        text: '',
        type: 'Multiple choice',
        key: 'Teixo',
        options: [
          {
            key: '',
            value: '',
          },
          {
            key: '',
            value: '',
          },
        ],
      },
      'Oliveira'
    )
    expect(score.isCorrect).toBe(false)
  })

  it('should mark answer as correct when formatted differences are removed', () => {
    const score = scorer.markAnswer(
      {
        text: '',
        type: 'Text entry',
        key: 'Taxus baccata',
      },
      ' taxus  baCCATA '
    )
    expect(score.isCorrect).toBe(true)
  })
})

describe('Multiple question test score', () => {
  let scorer = new Scorer()
  let score

  it('should return running totals of questions and correct and incorrect scores', () => {
    score = scorer.markAnswer(mockTest.test1.question, mockTest.test1.answer)
    expect(score.questionCount).toBe(1)
    expect(score.correctCount).toBe(1)
    expect(score.incorrectCount).toBe(0)
    score = scorer.markAnswer(mockTest.test2.question, mockTest.test2.answer)
    expect(score.questionCount).toBe(2)
    expect(score.correctCount).toBe(1)
    expect(score.incorrectCount).toBe(1)
    score = scorer.markAnswer(mockTest.test3.question, mockTest.test3.answer)
    expect(score.questionCount).toBe(3)
    expect(score.correctCount).toBe(2)
    expect(score.incorrectCount).toBe(1)
    score = scorer.markAnswer(mockTest.test4.question, mockTest.test4.answer)
    expect(score.questionCount).toBe(4)
    expect(score.correctCount).toBe(3)
    expect(score.incorrectCount).toBe(1)
    score = scorer.markAnswer(mockTest.test5.question, mockTest.test5.answer)
    expect(score.questionCount).toBe(5)
    expect(score.correctCount).toBe(3)
    expect(score.incorrectCount).toBe(2)
  })
})
