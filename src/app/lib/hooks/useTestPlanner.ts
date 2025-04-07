// lib/hooks/useTestPlanner.ts
import { useState, useEffect } from 'react'
import TestPlannerService from '../services/TestPlannerService'
import { Collection, Layout } from '../types'

export function useTestPlanner() {
  const service = TestPlannerService.getInstance()
  const [layout, setLayout] = useState<Layout | null>(
    service.getCurrentLayout()
  )
  const [isActive, setIsActive] = useState<boolean>(service.isTestActive())

  useEffect(() => {
    // Update state when service emits changes
    const unsubscribe = service.subscribe(() => {
      setLayout(service.getCurrentLayout())
      setIsActive(service.isTestActive())
    })

    // Cleanup subscription
    return unsubscribe
  }, [])

  return {
    startTest: (collection: Collection) => service.startTest(collection),
    currentLayout: layout,
    markAnswer: (answer: string) => service.markAnswer(answer),
    moveToNextQuestion: () => service.moveToNextQuestion(),
    isActive,
    resetTest: () => service.resetTest(),
  }
}
