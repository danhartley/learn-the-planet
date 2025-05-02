import { EventEmitter } from 'events'
import { TestPlanner } from '../test-planner'
import {
  Collection,
  Layout,
  Score,
  QuestionTemplate,
  HistoryItem,
  TestState,
} from '@/types'
import { TestPlannerEvent } from '@/utils/enums'
import { H } from 'vitest/dist/chunks/reporters.d.CfRkRKN2'

class TestPlannerService<T> {
  private static instance: TestPlannerService<T>
  private testPlanner: TestPlanner<T> | null = null
  private emitter = new EventEmitter()

  private constructor() {}

  // Singleton pattern: prevent more than one instance of the service from being created
  static getInstance<U>(): TestPlannerService<U> {
    if (!TestPlannerService.instance) {
      TestPlannerService.instance = new TestPlannerService<U>()
    }
    return TestPlannerService.instance as TestPlannerService<U>
  }

  startTest(
    collection: Collection<T>,
    questionTemplates: QuestionTemplate[]
  ): void {
    this.testPlanner = new TestPlanner(collection, questionTemplates)
    this.emitter.emit(TestPlannerEvent.TEST_STARTED)
    this.emitter.emit(TestPlannerEvent.STATE_CHANGED)
  }

  startRetest(layouts: Layout<T>[]): void {
    // Reset layout and collections indices (to 0)
    this.testPlanner?.reset()

    // Reset indices
    layouts.forEach((layout, index) => {
      layout.index = index
    })

    this.testPlanner?.setLayouts(layouts)

    this.emitter.emit(TestPlannerEvent.TEST_RESTARTED)
    this.emitter.emit(TestPlannerEvent.STATE_CHANGED)
  }

  getCurrentLayout(): Layout<T> | null {
    return this.testPlanner?.getCurrentLayout() || null
  }

  markAnswer(answer: string): Score | null {
    if (!this.testPlanner) return null
    const score = this.testPlanner.markAnswer(answer)
    this.emitter.emit(TestPlannerEvent.ANSWER_MARKED, { answer, score })
    this.emitter.emit(TestPlannerEvent.STATE_CHANGED)
    return score
  }

  updateTestHistory(history: HistoryItem<T>[]) {
    if (!this.testPlanner) return false
    this.emitter.emit(TestPlannerEvent.STATE_CHANGED)
    return this.testPlanner?.updateTestHistory(history)
  }

  getTestHistory(): HistoryItem<T>[] {
    if (!this.testPlanner) return []
    return this.testPlanner?.getTestHistory() || []
  }

  moveToNextQuestion(): boolean {
    if (!this.testPlanner) return false
    const hasNext = this.testPlanner.moveToNextQuestion()
    this.emitter.emit(
      TestPlannerEvent.QUESTION_CHANGED,
      this.getCurrentLayout()
    )
    this.emitter.emit(TestPlannerEvent.STATE_CHANGED)
    if (!hasNext) {
      this.testPlanner.setState({
        ...this.testPlanner.getState(),
        isEndOfTest: true,
      })
      this.emitter.emit(TestPlannerEvent.TEST_ENDED)
    }

    return hasNext
  }

  subscribe(callback: () => void): () => void {
    this.emitter.on(TestPlannerEvent.STATE_CHANGED, callback)
    return () => this.emitter.off(TestPlannerEvent.STATE_CHANGED, callback)
  }

  // Subscribe method to listen to specific events
  subscribeToEvent(
    eventName: string,
    callback: (data?: any) => void
  ): () => void {
    this.emitter.on(eventName, callback)
    return () => this.emitter.off(eventName, callback)
  }

  isTestActive(): boolean {
    return !!this.testPlanner
  }

  resetTest(): void {
    this.testPlanner = null
    this.emitter.emit(TestPlannerEvent.TEST_RESET)
    this.emitter.emit(TestPlannerEvent.STATE_CHANGED)
  }

  getLayouts(): Layout<T>[] | undefined {
    return this.testPlanner?.getLayouts()
  }

  setLayouts(layouts: Layout<T>[]): void {
    this.testPlanner?.setLayouts(layouts)
  }

  getState(): TestState | undefined {
    return this.testPlanner?.getState()
  }
}

export default TestPlannerService
