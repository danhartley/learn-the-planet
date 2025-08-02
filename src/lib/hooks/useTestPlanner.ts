import { useState, useEffect } from 'react'
import TestPlannerService from '@/services/TestPlannerService'
import {
  Collection,
  Layout,
  QuestionTemplate,
  ContentHandlerType,
  TestState,
  TestStrategy,
  TestConfig,
  HistoryItem,
} from '@/types'
import { TestPlannerEvent } from '@/utils/enums'
import { getTemplatesByContentType } from '../api/questionTemplates'

export function useTestPlanner<T>() {
  const service = TestPlannerService.getInstance()
  const [layout, setLayout] = useState<Layout<T> | null>(
    () => service.getCurrentLayout() as Layout<T> | null
  )
  const [isActive, setIsActive] = useState<boolean>(service.isTestActive())
  const [testState, setTestState] = useState<TestState | undefined>(
    service.getState()
  )
  const [testHistory, setTestHistory] = useState(service.getTestHistory())
  const [layouts, setLayouts] = useState(service.getLayouts())

  type Props = {
    collection: Collection<T>
    questionTemplates?: QuestionTemplate[]
    config?: TestConfig
  }

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
      data => {
        const { testHistory } = data as {
          testHistory: HistoryItem<unknown>[]
        }
        setTestHistory(testHistory)
      }
    )
    const unsubscribeFromTestEnded = service.subscribeToEvent(
      TestPlannerEvent.TEST_ENDED,
      data => {
        const { state } = data as { state: TestState }
        setTestState(state)
      }
    )

    const unsubscribeFromTestRestarted = service.subscribeToEvent(
      TestPlannerEvent.TEST_RESTARTED,
      (data: unknown) => {
        const { testHistory, layouts } = data as {
          testHistory: HistoryItem<unknown>[]
          layouts: Layout<unknown>[]
        }
        setTestHistory(testHistory)
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
  }, [service])
  return {
    startTest: ({
      collection,
      questionTemplates = getTemplatesByContentType(
        collection.type as unknown as ContentHandlerType
      ) as QuestionTemplate[],
      config,
    }: Props) => service.startTest(collection, questionTemplates, config),
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
