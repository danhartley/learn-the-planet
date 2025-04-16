import {
  Collection,
  TestPlan,
  Layout,
  Score,
  TestState,
  Taxon,
  MultipleChoiceQuestion,
  TextEntryQuestion,
  QuestionTemplate,
  MultipleChoiceTemplate,
  TextEntryTemplate,
} from './types'
import { Scorer } from './scorer'

import { generateDistractors } from '@/utils/distractors'

export class TestPlanner {
  private collection: Collection
  private scorer: Scorer
  private layouts: Layout[] = []
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

  constructor(collection: Collection, questionTemplates: QuestionTemplate[]) {
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
    this.scorer = new Scorer()
    this.testPlanId = ++TestPlanner.testPlanCounter
    this.questionTemplates = questionTemplates
    this.generateLayouts()
  }

  private getPropertyByPath = (obj: any, path: string): any => {
    // Return undefined for null/undefined objects
    if (obj == null) {
      return undefined
    }

    // Handle simple property access
    if (!path.includes('.') && !path.includes('[')) {
      return obj[path]
    }

    // Split by dots but preserve array notation
    const pathArray = path.match(/[^\.\[\]]+|\[\d+\]/g)

    // Start with the object
    let current = obj

    // Navigate through the path
    for (let i = 0; i < pathArray!.length && current != null; i++) {
      let key = pathArray![i]

      // Handle array indexing
      if (key.startsWith('[') && key.endsWith(']')) {
        // Extract index number
        const index = parseInt(key.slice(1, -1))

        // Check if current is an array and index is valid
        if (
          Array.isArray(current) &&
          !isNaN(index) &&
          index >= 0 &&
          index < current.length
        ) {
          current = current[index]
        } else {
          return undefined
        }
      } else {
        // Regular property access
        current = current[key]
      }
    }

    return current
  }

  private processTemplate(template: string, item: Taxon): string {
    return template.replace(/\${([^}]+)}/g, (match, propertyPath) => {
      // Handle dot notation for nested properties (e.g., binomial, images[0].url)
      const value = this.getPropertyByPath(item, propertyPath)
      return value !== undefined ? String(value) : match
    })
  }

  private createLayoutFromTemplate(
    index: number,
    item: Taxon,
    template: QuestionTemplate
  ): Layout {
    // Process the question text template with actual item properties
    const questionText = this.processTemplate(
      template.questionTextTemplate,
      item
    )

    switch (template.type) {
      case 'multipleChoice':
        return this.createMultipleChoiceFromTemplate(
          index,
          item,
          template,
          questionText
        )
      case 'textEntry':
        return this.createTextEntryFromTemplate(
          index,
          item,
          template,
          questionText
        )
      // Add cases for other question types
      default:
        throw new Error(`Unknown question type: ${(template as any).type}`)
    }
  }

  private generateLayouts(): void {
    // For each item in the collection, create layouts based on templates
    this.collection.items.forEach((item, itemIndex) => {
      this.questionTemplates.forEach((template, templateIndex) => {
        // Create a unique index for each question
        const questionIndex =
          itemIndex * this.questionTemplates.length + templateIndex

        // Generate the layout based on the template type
        const layout = this.createLayoutFromTemplate(
          questionIndex,
          item,
          template
        )
        this.layouts.push(layout)
      })
    })
  }

  private createMultipleChoiceLayout(
    item: Taxon,
    index: number,
    template: MultipleChoiceTemplate,
    text: string,
    key: string,
    distractors: Taxon[]
  ): Layout {
    const options = [
      { key: key, value: item[template.distractorType] },
      ...distractors.map((d: Taxon) => ({
        key: d.binomial,
        value: d[template.distractorType] || '',
      })),
    ]

    const question: MultipleChoiceQuestion = {
      type: 'Multiple choice',
      text,
      key,
      options,
    }

    return {
      id: `layout-${this.testPlanId}-${index}`,
      level: template.level,
      index,
      question,
      distractorType: template.distractorType,
      item,
      collection: this.collection,
    }
  }

  private createMultipleChoiceFromTemplate(
    index: number,
    item: Taxon,
    template: MultipleChoiceTemplate,
    questionText: string
  ): Layout {
    // Get the correct answer based on the specified property
    const correctAnswer = this.getPropertyByPath(
      item,
      template.correctAnswerProperty
    )

    // Generate distractors based on template configuration
    const distractors = generateDistractors(
      this.collection,
      item,
      template.distractorCount,
      template.distractorType
    )

    return this.createMultipleChoiceLayout(
      item,
      index,
      template,
      questionText,
      correctAnswer,
      distractors
    )
  }

  private createTextEntryLayout(
    index: number,
    level: string,
    text: string,
    key: string,
    hint: string,
    item: Taxon
  ): Layout {
    const question: TextEntryQuestion = {
      type: 'Text entry',
      text,
      key,
      hint,
    }

    return {
      id: `layout-${this.testPlanId}-${index}`,
      level,
      index,
      question,
      item,
    }
  }

  private createTextEntryFromTemplate(
    index: number,
    item: Taxon,
    template: TextEntryTemplate,
    questionText: string
  ): Layout {
    const correctAnswer = this.getPropertyByPath(
      item,
      template.correctAnswerProperty
    )

    return this.createTextEntryLayout(
      index,
      template.level,
      questionText,
      correctAnswer,
      template.placeholder,
      item
    )
  }

  public getCurrentLayout(): Layout {
    const layout: Layout = this.layouts[this.state.layoutIndex]
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
    this.score = this.scorer.markAnswer(currentLayout.question, answer)
    return this.score
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

  public getTestPlan(): TestPlan {
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
    this.scorer = new Scorer()
  }
}
