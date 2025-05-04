import { EventEmitter } from 'events'
import { TestPlanner } from '../test-planner'
import {
  Collection,
  Layout,
  Score,
  QuestionTemplate,
  HistoryItem,
  TestState,
  TestStrategy,
} from '@/types'
import { TestPlannerEvent } from '@/utils/enums'

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

  startRetest(strategy: TestStrategy): void {
    const oldTestHistory = this.testPlanner?.getTestHistory()
    const oldLayouts = this.getLayouts()

    this.testPlanner?.reset()

    let layouts: Layout<T>[] = oldLayouts,
      index: number = 0

    switch (strategy) {
      case 'incorrect-only':
        layouts = oldLayouts?.map(layout => {
          const score = (oldTestHistory as HistoryItem<T>[]).find(
            (history: HistoryItem<T>) => history?.layoutId === layout.id
          )
          // Where there is a layout score, check for correct answer
          // Where not, e.g. where the question had previously been answered correctly, set active to false
          const isActive = score?.isCorrect === false
          return { ...layout, isActive }
        }) as Layout<T>[]
        // Find first active layout index
        index = layouts?.find(layout => layout.isActive)?.index || 0
        break
    }

    const state = this.testPlanner?.getState() as TestState

    this.testPlanner?.setState({ ...state, layoutIndex: index })
    this.testPlanner?.setLayouts(layouts || [])

    this.emitter.emit(TestPlannerEvent.TEST_RESTARTED, {
      testHistory: [],
      layouts,
    })
  }

  getCurrentLayout(): Layout<T> | null {
    return this.testPlanner?.getCurrentLayout() || null
  }

  markAnswer(answer: string): Score | null {
    if (!this.testPlanner) return null
    const score = this.testPlanner.markAnswer(answer)
    const currentLayout = this.getCurrentLayout()

    let testHistory

    if (score) {
      const historyItem: HistoryItem<T> = {
        id: crypto.randomUUID(),
        isCorrect: score.isCorrect,
        item: currentLayout?.item,
        question: currentLayout?.question.text,
        type: currentLayout?.question.type,
        answer: currentLayout?.question.key,
        layoutId: currentLayout?.id || '',
      }

      testHistory = this.testPlanner?.updateTestHistory(historyItem)

      this.emitter.emit(TestPlannerEvent.ANSWER_MARKED, {
        answer,
        score,
        testHistory,
      })
      this.emitter.emit(TestPlannerEvent.STATE_CHANGED)
    }

    return score
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
      const state = this.testPlanner.getState()
      if (state !== undefined) {
        this.testPlanner.setState({
          ...state,
          isEndOfTest: true,
        })
        this.emitter.emit(TestPlannerEvent.TEST_ENDED, { state })
      }
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

  getLayouts(): Layout<T>[] {
    return this.testPlanner?.getLayouts() || []
  }

  setLayouts(layouts: Layout<T>[]): void {
    this.testPlanner?.setLayouts(layouts)
  }

  getState(): TestState | undefined {
    return this.testPlanner?.getState()
  }
}

export default TestPlannerService
