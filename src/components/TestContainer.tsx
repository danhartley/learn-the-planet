'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTestPlanner } from '@/hooks/useTestPlanner'
import { TestDisplay } from '@/components/test/TestDisplay'

export function TestContainer() {
  const router = useRouter()
  const { currentLayout, isActive, markAnswer, moveToNextQuestion } =
    useTestPlanner()

  // Redirect if no test is active
  useEffect(() => {
    if (!isActive) {
      router.push('/collections')
    }
  }, [isActive, router])

  if (!currentLayout) return null

  const handleSubmitAnswer = (answer: string) => {
    const score = markAnswer(answer)
    console.log(score)
    const hasNext = moveToNextQuestion()

    if (!hasNext) {
      // Test completed
      router.push('/results')
    }
  }

  return (
    <>
      <h2>Tests</h2>
      <div>
        <TestDisplay layout={currentLayout} onSubmit={handleSubmitAnswer} />
      </div>
    </>
  )
}
