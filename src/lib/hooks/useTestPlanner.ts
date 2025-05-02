import { useState, useEffect } from 'react'
import TestPlannerService from '@/services/TestPlannerService'
import {
  Collection,
  Layout,
  Score,
  QuestionTemplate,
  ContentHandlerType,
  HistoryItem,
  TestSate,
} from '@/types'
import { TestPlannerEvent } from '@/utils/enums'
import { getTemplatesByContentType } from '../api/questionTemplates'

export function useTestPlanner<T>() {
  const service = TestPlannerService.getInstance()
  const [layout, setLayout] = useState<Layout<T> | null>(
    service.getCurrentLayout()
  )
  const [isActive, setIsActive] = useState<boolean>(service.isTestActive())
  const [lastScore, setLastScore] = useState<Score | null>(null)
  const [testState, setTestState] = useState<TestSate | null>(
    service.getState()
  )

  useEffect(() => {
    // Update state when service emits changes
    const unsubscribe = service.subscribe(() => {
      setIsActive(service.isTestActive())
    })

    const unsubscribeFromQuestionChanged = service.subscribeToEvent(
      TestPlannerEvent.QUESTION_CHANGED,
      () => setLayout(service.getCurrentLayout() as Layout<T> | null)
    )

    const unsubscribeFromTestEnded = service.subscribeToEvent(
      TestPlannerEvent.TEST_ENDED,
      () => setTestState(service.getState() as TestSate)
    )

    const unsubscribeFromAnswerMarked = service.subscribeToEvent(
      TestPlannerEvent.ANSWER_MARKED,
      ({ answer, score }) => {
        setLastScore(score)
      }
    )

    // Cleanup subscription
    return () => {
      unsubscribe()
      unsubscribeFromAnswerMarked()
      unsubscribeFromQuestionChanged()
      unsubscribeFromTestEnded()
    }
  }, [])
  return {
    startTest: (
      collection: Collection<T>,
      questionTemplates: QuestionTemplate[] = getTemplatesByContentType(
        collection.type as ContentHandlerType
      )
    ) => service.startTest(collection, questionTemplates),
    startRetest: (layouts: Layout<T>[]) => {
      service.startRetest(layouts)
    },
    markAnswer: (answer: string) => service.markAnswer(answer),
    moveToNextQuestion: () => service.moveToNextQuestion(),
    resetTest: () => service.resetTest(),
    setLayouts: (layouts: Layout<T>[]) => service.setLayouts(layouts),
    updateTestHistory: (history: HistoryItem<T>[]) =>
      service.updateTestHistory(history),
    currentLayout: layout,
    isActive,
    lastScore,
    layouts: service.getLayouts(),
    testHistory: service.getTestHistory(),
    testState,
  }
}
