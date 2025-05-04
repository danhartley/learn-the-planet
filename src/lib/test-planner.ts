import {
  Collection,
  TestPlan,
  Layout,
  Score,
  TestState,
  QuestionTemplate,
  ContentTypeHandler,
  ContentHandlerType,
  HistoryItem,
} from './types'

import { contentHandlers } from './content-handlers/registry'

import { shuffleArray } from '@/utils/strings'

export class TestPlanner<T> {
  private collection: Collection<T>
  private contentHandler: ContentTypeHandler<T>
  private layouts: Layout<T>[] = []
  private testState: TestState = {
    layoutIndex: 0,
    collectionIndex: 0,
    layoutCount: 0,
    isEndOfTest: false,
  }
  private score: Score = {
    isCorrect: false,
    questionCount: 0,
    correctCount: 0,
    incorrectCount: 0,
  }
  private testPlanId: number = 0
  private static testPlanCounter: number = 0
  private questionTemplates: QuestionTemplate[]
  private testHistory: HistoryItem<T>[]

  constructor(
    collection: Collection<T>,
    questionTemplates: QuestionTemplate[]
  ) {
    this.collection = collection
    this.contentHandler = contentHandlers[
      collection.type as ContentHandlerType
    ] as ContentTypeHandler<T>

    if (!collection) {
      throw new Error('Collection cannot be null or undefined')
    }

    if (!Array.isArray(collection.items) || collection.items.length === 0) {
      throw new Error('Collection must contain at least one item')
    }

    this.collection = collection
    this.testPlanId = ++TestPlanner.testPlanCounter
    this.questionTemplates = questionTemplates
    this.generateLayouts()
    this.testHistory = []
  }

  private generateLayouts(): void {
    // For each item in the collection, create layouts based on templates
    shuffleArray(this.collection.items).forEach((item, itemIndex) => {
      const questions = this.contentHandler.createQuestions(
        this.collection,
        item,
        this.questionTemplates
      )

      // Create a layout for each question
      questions.forEach((question, questionIndex) => {
        const index = itemIndex * this.questionTemplates.length + questionIndex
        const template = this.questionTemplates[questionIndex]

        // Create layout with the generated question
        const layout: Layout<T> = {
          id: `layout-${this.testPlanId}-${index}`,
          level: template.level,
          index,
          question,
          item,
          collection: this.collection,
          distractorType:
            'distractorType' in template ? template.distractorType : undefined,
          isActive: true,
        }

        this.layouts.push(layout)
      })
    })

    this.testState.layoutCount = this.layouts.length
  }

  public getCurrentLayout(): Layout<T> {
    const layout: Layout<T> = this.layouts[this.testState.layoutIndex]
    return layout
  }

  public markAnswer(answer: string): Score {
    const currentLayout = this.getCurrentLayout()
    const isCorrect = this.contentHandler.validateAnswer(
      currentLayout.question,
      answer
    )

    // Update score
    this.score.questionCount++
    if (isCorrect) {
      this.score.correctCount++
      this.score.isCorrect = true
    } else {
      this.score.incorrectCount++
      this.score.isCorrect = false
    }

    return this.score
  }

  public updateTestHistory = (history: HistoryItem<T>): HistoryItem<T>[] => {
    if (history) {
      this.testHistory = [history, ...this.testHistory]
    }

    return this.testHistory
  }

  public moveToNextQuestion(): boolean {
    let foundActive = false
    const startingIndex = this.testState.layoutIndex

    while (!foundActive) {
      // Check if we've reached the end of layouts
      if (this.testState.layoutIndex >= this.layouts.length - 1) {
        // If we're already at the last layout, return false
        if (this.testState.layoutIndex === this.layouts.length - 1) {
          return false
        }

        // Move to the next layout
        this.testState.layoutIndex++
      } else {
        // Move to the next layout
        this.testState.layoutIndex++

        // Check if the current layout is active
        if (this.layouts[this.testState.layoutIndex].isActive !== false) {
          foundActive = true
        }
      }

      // If we've checked all layouts and none are active, return false
      if (!foundActive && this.testState.layoutIndex === startingIndex) {
        return false
      }
    }

    // Update collection index if we've moved to a new item
    this.testState.collectionIndex = Math.floor(this.testState.layoutIndex / 4)

    return true
  }

  public getTestPlan(): TestPlan<T> {
    return {
      id: `Test plan ${this.testPlanId}`,
      collection: this.collection,
      state: this.testState,
      score: this.score,
      layouts: this.layouts,
    }
  }

  public reset(): void {
    this.testState = {
      layoutIndex: 0,
      collectionIndex: 0,
      layoutCount: 0,
      isEndOfTest: false,
    }
    this.score = {
      isCorrect: false,
      questionCount: 0,
      correctCount: 0,
      incorrectCount: 0,
    }
    this.testHistory = []
    this.layouts = []
  }

  public getLayouts(): Layout<T>[] {
    return this.layouts
  }

  public setLayouts(layouts: Layout<T>[]) {
    this.layouts = layouts
  }

  public getTestHistory(): HistoryItem<T>[] {
    return this.testHistory
  }

  public getState(): TestState {
    return this.testState
  }

  public setState(state: TestState): void {
    this.testState = state
  }
}
