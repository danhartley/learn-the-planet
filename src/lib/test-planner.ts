import {
  Collection,
  TestPlan,
  Layout,
  Score,
  TestState,
  QuestionTemplate,
  ContentTypeHandler,
  ContentHandlerType,
} from './types'

import { contentHandlers } from './registry'

export class TestPlanner<T> {
  private collection: Collection<T>
  private contentHandler: ContentTypeHandler<T>
  private layouts: Layout<T>[] = []
  private state: TestState = {
    layoutIndex: 0,
    collectionIndex: 0,
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

    // Validate each taxon item
    collection.items.forEach((item, index) => {
      if (!item.id || (!item.binomial && item.binomial?.trim() !== '')) {
        throw new Error(
          `Invalid taxon item at index ${index}: missing required properties`
        )
      }

      if (typeof item.binomial !== 'string' || item.binomial.trim() === '') {
        throw new Error(
          `Invalid taxon item at index ${index}: name must be a non-empty string`
        )
      }

      if (!item.binomial.includes(' ')) {
        throw new Error(
          `Invalid taxon item at index ${index}: name must contain genus and species separated by space`
        )
      }
    })

    this.collection = collection
    this.testPlanId = ++TestPlanner.testPlanCounter
    this.questionTemplates = questionTemplates
    this.generateLayouts()
  }

  private generateLayouts(): void {
    // For each item in the collection, create layouts based on templates
    this.collection.items.forEach((item, itemIndex) => {
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
        }

        this.layouts.push(layout)
      })
    })
  }

  public getCurrentLayout(): Layout<T> {
    const layout: Layout<T> = this.layouts[this.state.layoutIndex]
    return {
      ...layout,
      collection: {
        name: this.collection.name,
        description: this.collection.description,
      },
    }
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
    // const currentLayout = this.getCurrentLayout()
    // this.score = this.scorer.markAnswer(currentLayout.question, answer)
    // return this.score
  }

  public moveToNextQuestion(): boolean {
    if (this.state.layoutIndex < this.layouts.length - 1) {
      this.state.layoutIndex++

      // Update collection index if we've moved to a new item
      this.state.collectionIndex = Math.floor(this.state.layoutIndex / 4)

      return true
    }
    return false
  }

  public getTestPlan(): TestPlan<T> {
    return {
      id: `Test plan ${this.testPlanId}`,
      collection: this.collection,
      state: this.state,
      score: this.score,
      layouts: this.layouts,
    }
  }

  public reset(): void {
    this.state = {
      layoutIndex: 0,
      collectionIndex: 0,
    }
    this.score = {
      isCorrect: false,
      questionCount: 0,
      correctCount: 0,
      incorrectCount: 0,
    }
  }
}
