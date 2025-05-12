import { useState, useEffect } from 'react'
import TestPlannerService from '@/services/TestPlannerService'
import {
  Collection,
  Layout,
  QuestionTemplate,
  ContentHandlerType,
  TestState,
  TestStrategy,
} from '@/types'
import { TestPlannerEvent } from '@/utils/enums'
import { getTemplatesByContentType } from '../api/questionTemplates'

export function useTestPlanner<T>() {
  const service = TestPlannerService.getInstance()
  const [layout, setLayout] = useState<Layout<T> | null>(
    service.getCurrentLayout()
  )
  const [isActive, setIsActive] = useState<boolean>(service.isTestActive())
  const [testState, setTestState] = useState<TestState | undefined>(
    service.getState()
  )
  const [testHistory, setTestHistory] = useState(service.getTestHistory())
  const [layouts, setLayouts] = useState(service.getLayouts())

  useEffect(() => {
    // Update state when service emits changes
    const unsubscribe = service.subscribe(() => {
      setIsActive(service.isTestActive())
    })

    const unsubscribeFromQuestionChanged = service.subscribeToEvent(
      TestPlannerEvent.QUESTION_CHANGED,
      () => setLayout(service.getCurrentLayout() as Layout<T> | null)
    )

    const unsubscribeFromAnswerMarked = service.subscribeToEvent(
      TestPlannerEvent.ANSWER_MARKED,
      ({ testHistory }) => {
        setTestHistory(testHistory)
      }
    )

    const unsubscribeFromTestEnded = service.subscribeToEvent(
      TestPlannerEvent.TEST_ENDED,
      ({ state }) => {
        setTestState(state)
      }
    )

    const unsubscribeFromTestRestarted = service.subscribeToEvent(
      TestPlannerEvent.TEST_RESTARTED,
      ({ testHistory, layouts }) => {
        setTestHistory(testHistory)
        console.log('hook: ', layouts)
        setLayouts(layouts)
      }
    )

    // Cleanup subscription
    return () => {
      unsubscribe()
      unsubscribeFromAnswerMarked()
      unsubscribeFromQuestionChanged()
      unsubscribeFromTestEnded()
      unsubscribeFromTestRestarted()
    }
  }, [])
  return {
    startTest: (
      collection: Collection<T>,
      questionTemplates: QuestionTemplate[] = getTemplatesByContentType(
        collection.type as ContentHandlerType
      )
    ) => service.startTest(collection, questionTemplates),
    startRetest: (strategy: TestStrategy) => {
      service.startRetest(strategy)
    },
    markAnswer: (answer: string | string[]) => service.markAnswer(answer),
    moveToNextQuestion: () => service.moveToNextQuestion(),
    setLayouts: (layouts: Layout<T>[]) => service.setLayouts(layouts),
    currentLayout: layout,
    isActive,
    layouts,
    testHistory,
    testState,
  }
}
