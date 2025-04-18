import { useState, useEffect } from 'react'
import TestPlannerService from '@/services/TestPlannerService'
import { Collection, Layout, Score, QuestionTemplate } from '@/types'
import { TestPlannerEvent } from '@/utils/enums'
import { taxonomyTemplates } from '../config/questionTemplates'

export function useTestPlanner<T>() {
  const service = TestPlannerService.getInstance()
  const [layout, setLayout] = useState<Layout<T> | null>(
    service.getCurrentLayout()
  )
  const [isActive, setIsActive] = useState<boolean>(service.isTestActive())
  const [lastScore, setLastScore] = useState<Score | null>(null)

  useEffect(() => {
    // Update state when service emits changes
    const unsubscribe = service.subscribe(() => {
      setLayout(service.getCurrentLayout())
      setIsActive(service.isTestActive())
    })

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
    }
  }, [])
  return {
    startTest: (
      collection: Collection<T>,
      questionTemplates: QuestionTemplate[] = taxonomyTemplates
    ) => service.startTest(collection, questionTemplates),
    currentLayout: layout,
    markAnswer: (answer: string) => service.markAnswer(answer),
    moveToNextQuestion: () => service.moveToNextQuestion(),
    isActive,
    resetTest: () => service.resetTest(),
    lastScore,
  }
}
