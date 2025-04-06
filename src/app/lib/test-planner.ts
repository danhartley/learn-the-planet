import {
  Collection,
  TestPlan,
  Layout,
  Score,
  TestState,
  Taxon,
  Question,
  MultipleChoiceQuestion,
  TextEntryQuestion,
} from './types'
import { Scorer } from './scorer'

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

  constructor(collection: Collection) {
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
    this.generateLayouts()
  }

  private generateLayouts(): void {
    // For each item in the collection, create four standard question types
    this.collection.items.forEach((item, index) => {
      // Question 1: Select species from photos
      this.layouts.push(
        this.createMultipleChoiceLayout(
          index * 4,
          'level 1',
          `Select the correct photo for ${item.common} (${item.binomial})`,
          item.binomial,
          this.getDistractors(item, 3)
        )
      )

      // Question 2: Select correct species name given genus
      const genus = item.binomial.split(' ')[0]
      this.layouts.push(
        this.createMultipleChoiceLayout(
          index * 4 + 1,
          'level 1',
          `Which species belongs to the genus ${genus}?`,
          item.binomial,
          this.getDistractors(item, 3)
        )
      )

      // Question 3: Select correct genus name given species
      const species = item.binomial.split(' ')[1]
      this.layouts.push(
        this.createMultipleChoiceLayout(
          index * 4 + 2,
          'level 2',
          `Which genus does the species ${species} belong to?`,
          genus,
          this.getGenusDistractors(item, 3)
        )
      )

      // Question 4: Text entry for full name
      this.layouts.push(
        this.createTextEntryLayout(
          index * 4 + 3,
          'level 3',
          `Enter the scientific name for ${item.common}`,
          item.binomial,
          'Enter genus and species'
        )
      )
    })
  }

  private createMultipleChoiceLayout(
    index: number,
    level: string,
    text: string,
    key: string,
    distractors: string[]
  ): Layout {
    const options = [
      { key: key, value: `Photo of ${key}` },
      ...distractors.map(d => ({ key: d, value: `Photo of ${d}` })),
    ]

    // Shuffle options
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[options[i], options[j]] = [options[j], options[i]]
    }

    const question: MultipleChoiceQuestion = {
      type: 'Multiple choice',
      text,
      key,
      options,
    }

    return {
      id: `layout-${this.testPlanId}-${index}`,
      level,
      index,
      question,
    }
  }

  private createTextEntryLayout(
    index: number,
    level: string,
    text: string,
    key: string,
    hint: string
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
    }
  }

  private getDistractors(item: Taxon, count: number): string[] {
    // If the item has distractors defined, use those
    if (
      (item as any).distractors &&
      (item as any).distractors.length >= count
    ) {
      return (item as any).distractors.slice(0, count)
    }

    // Otherwise, get random items from the collection
    const distractors: string[] = []
    const availableItems = this.collection.items.filter(i => i.id !== item.id)

    while (distractors.length < count && availableItems.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableItems.length)
      const distractor = availableItems[randomIndex].name

      if (!distractors.includes(distractor) && distractor !== item.binomial) {
        distractors.push(distractor)
      }

      availableItems.splice(randomIndex, 1)
    }

    return distractors
  }

  private getGenusDistractors(item: Taxon, count: number): string[] {
    const genus = item.binomial.split(' ')[0]
    const distractors: string[] = []
    const availableItems = this.collection.items.filter(i => {
      const itemGenus = i.binomial.split(' ')[0]
      return itemGenus !== genus
    })

    const usedGenera = new Set<string>()

    while (distractors.length < count && availableItems.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableItems.length)
      const distractor = availableItems[randomIndex].binomial.split(' ')[0]

      if (!usedGenera.has(distractor)) {
        distractors.push(distractor)
        usedGenera.add(distractor)
      }

      availableItems.splice(randomIndex, 1)
    }

    return distractors
  }

  public getCurrentLayout(): Layout {
    return this.layouts[this.state.layoutIndex]
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
