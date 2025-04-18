import { EventEmitter } from 'events'
import { TestPlanner } from '../test-planner'
import { Collection, Layout, Score, QuestionTemplate } from '@/types'
import { TestPlannerEvent } from '@/utils/enums'

class TestPlannerService<T> {
  private static instance: TestPlannerService<T>
  private testPlanner: TestPlanner<T> | null = null
  private emitter = new EventEmitter()

  private constructor() {}

  // Singleton pattern: prevent more than one instance of the service from being created
  static getInstance<T>(): TestPlannerService<T> {
    if (!TestPlannerService.instance) {
      TestPlannerService.instance = new TestPlannerService()
    }
    return TestPlannerService.instance
  }

  startTest(
    collection: Collection<T>,
    questionTemplates: QuestionTemplate[]
  ): void {
    this.testPlanner = new TestPlanner(collection, questionTemplates)
    this.emitter.emit(TestPlannerEvent.TEST_STARTED)
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

  moveToNextQuestion(): boolean {
    if (!this.testPlanner) return false
    const hasNext = this.testPlanner.moveToNextQuestion()
    this.emitter.emit(
      TestPlannerEvent.QUESTION_CHANGED,
      this.getCurrentLayout()
    )
    this.emitter.emit(TestPlannerEvent.STATE_CHANGED)
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
  }
}

export default TestPlannerService
