import { describe, it, expect, beforeEach } from 'vitest'
import { TestPlanner } from './test-planner'
import { Collection } from './types'
import { taxonomyTemplates } from './config/questionTemplates'

describe('TestPlanner', () => {
  let collection!: Collection
  it('Cannot create test planner when the collection is undefined', () => {
    expect(() => {
      // @ts-expect-error - Intentionally passing undefined for testing
      new TestPlanner(undefined)
    }).toThrowError('Collection cannot be null or undefined')
  })
  it('Cannot create test planner when the collection has no items', () => {
    collection = {
      id: '1',
      date: '',
      location: '',
      name: 'Test collection',
      index: 0,
      items: [],
    }

    expect(() => {
      new TestPlanner(collection, [])
    }).toThrowError('Collection must contain at least one item')
  })
  it('Cannot create test planner with invalid taxon items (missing required properties)', () => {
    collection = {
      id: '1',
      name: 'Test collection',
      date: '',
      location: '',
      index: 0,
      items: [
        // @ts-expect-error - Intentionally missing properties for testing
        { id: 1 },
      ],
    }

    expect(() => {
      const testPlanner = new TestPlanner(collection, [])
    }).toThrow('Invalid taxon item at index 0: missing required properties')
  })
  it('Cannot create test planner with invalid taxon binomial format', () => {
    collection = {
      id: '1',
      name: 'Test collection',
      date: '',
      location: '',
      index: 0,
      items: [
        {
          id: 1,
          binomial: 'InvalidName', // No space between genus and species
          vernacularName: 'Test Plant',
          images: [],
        },
      ],
    }

    expect(() => {
      const testPlanner = new TestPlanner(collection, [])
    }).toThrow(
      'Invalid taxon item at index 0: name must contain genus and species separated by space'
    )
  })
  it('Cannot create test planner with empty taxon name', () => {
    collection = {
      id: '1',
      name: 'Test collection',
      date: '',
      location: '',
      index: 0,
      items: [
        {
          id: 1,
          binomial: '',
          vernacularName: 'Test Plant',
        },
      ],
    }

    expect(() => {
      const testPlanner = new TestPlanner(collection, [])
    }).toThrow('Invalid taxon item at index 0: name must be a non-empty string')
  })
})

describe('Valid collection', () => {
  let collection!: Collection
  let testPlanner: TestPlanner
  beforeEach(() => {
    collection = {
      id: '1',
      name: 'Valid collection',
      date: '',
      location: '',
      index: 0,
      items: [
        {
          id: 1,
          binomial: 'Genus SpeciesOne',
          vernacularName: 'Plant One',
          family: 'Family One',
          images: [],
        },
        {
          id: 2,
          binomial: 'Altgenus SpeciesTwo',
          vernacularName: 'Plant Two',
          family: 'Family Two',
          images: [],
        },
      ],
    }

    testPlanner = new TestPlanner(collection, taxonomyTemplates)
  })
  it('Creates test plan with correct number of layouts', () => {
    const testPlan = testPlanner.getTestPlan()
    // 2 items × 5 questions per item = 8 layouts
    expect(testPlan.layouts.length).toBe(10)
  })
  it('Starts with default state', () => {
    const testPlan = testPlanner.getTestPlan()
    expect(testPlan.state).toEqual({
      layoutIndex: 0,
      collectionIndex: 0,
    })
  })
  it('Moves to next question correctly', () => {
    expect(testPlanner.moveToNextQuestion()).toBe(true)
    const testPlan = testPlanner.getTestPlan()
    expect(testPlan.state.layoutIndex).toBe(1)
    expect(testPlan.state.collectionIndex).toBe(0) // Still on first item
  })
  it('Updates collection index when moving to new item', () => {
    // Move to the 4th question (index 3)
    testPlanner.moveToNextQuestion()
    testPlanner.moveToNextQuestion()
    testPlanner.moveToNextQuestion()

    // Move to the 5th question (index 4) - now on the second item
    testPlanner.moveToNextQuestion()

    const testPlan = testPlanner.getTestPlan()
    expect(testPlan.state.layoutIndex).toBe(4)
    expect(testPlan.state.collectionIndex).toBe(1) // Now on second item
  })
  it('Returns false when no more questions are available', () => {
    // Move through all questions
    for (let i = 0; i < 9; i++) {
      expect(testPlanner.moveToNextQuestion()).toBe(true)
    }

    // Try to move past the last question
    expect(testPlanner.moveToNextQuestion()).toBe(false)
  })
  it('Marks answer correctly', () => {
    const layout = testPlanner.getCurrentLayout()
    const answer = layout.question.key
    const score = testPlanner.markAnswer(answer)

    expect(score.isCorrect).toBe(true)
    expect(score.questionCount).toBe(1)
    expect(score.correctCount).toBe(1)
    expect(score.incorrectCount).toBe(0)
  })
  it('Resets test planner state', () => {
    // Make some progress
    testPlanner.moveToNextQuestion()
    testPlanner.markAnswer('wrong answer')

    // Reset
    testPlanner.reset()

    const testPlan = testPlanner.getTestPlan()
    expect(testPlan.state).toEqual({
      layoutIndex: 0,
      collectionIndex: 0,
    })
    expect(testPlan.score).toEqual({
      isCorrect: false,
      questionCount: 0,
      correctCount: 0,
      incorrectCount: 0,
    })
  })
})

describe('Private methods', () => {
  let collection!: Collection
  let testPlanner: TestPlanner
  beforeEach(() => {
    collection = {
      id: '1',
      name: 'Valid collection',
      date: '',
      location: '',
      index: 0,
      items: [
        {
          id: 1,
          binomial: 'Genus SpeciesOne',
          vernacularName: 'Plant One',
          family: 'Family One',
          images: [],
        },
        {
          id: 2,
          binomial: 'Altgenus SpeciesTwo',
          vernacularName: 'Plant Two',
          family: 'Family Two',
          images: [],
        },
      ],
    }

    testPlanner = new TestPlanner(collection, taxonomyTemplates)
  })
  it('gets nested properties correctly via public method', () => {
    expect(testPlanner.getCurrentLayout().id).toBe('layout-8-0')
  })
})
