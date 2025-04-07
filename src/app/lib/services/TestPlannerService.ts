// lib/services/TestPlannerService.ts
import { EventEmitter } from 'events'
import { TestPlanner } from '../test-planner'
import { Collection, Layout, Score } from '../types'

class TestPlannerService {
  private static instance: TestPlannerService
  private testPlanner: TestPlanner | null = null
  private emitter = new EventEmitter()

  private constructor() {}

  static getInstance(): TestPlannerService {
    if (!TestPlannerService.instance) {
      TestPlannerService.instance = new TestPlannerService()
    }
    return TestPlannerService.instance
  }

  startTest(collection: Collection): void {
    this.testPlanner = new TestPlanner(collection)
    this.emitter.emit('stateChanged')
  }

  getCurrentLayout(): Layout | null {
    return this.testPlanner?.getCurrentLayout() || null
  }

  markAnswer(answer: string): Score | null {
    if (!this.testPlanner) return null
    const score = this.testPlanner.markAnswer(answer)
    this.emitter.emit('stateChanged')
    return score
  }

  moveToNextQuestion(): boolean {
    if (!this.testPlanner) return false
    const hasNext = this.testPlanner.moveToNextQuestion()
    this.emitter.emit('stateChanged')
    return hasNext
  }

  subscribe(callback: () => void): () => void {
    this.emitter.on('stateChanged', callback)
    return () => this.emitter.off('stateChanged', callback)
  }

  isTestActive(): boolean {
    return !!this.testPlanner
  }

  resetTest(): void {
    this.testPlanner = null
    this.emitter.emit('stateChanged')
  }
}

export default TestPlannerService
