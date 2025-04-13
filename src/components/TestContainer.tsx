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
    const hasNext = moveToNextQuestion()

    if (!hasNext) {
      // Test completed
      router.push('/results')
    }
  }

  return (
    <section className="group" aria-labelledby="collection">
      <h2 id="collection">{`Test your knowledge of ${currentLayout.collection.name}`}</h2>
      <div>{currentLayout.collection?.description}</div>
      <TestDisplay layout={currentLayout} onSubmit={handleSubmitAnswer} />
    </section>
  )
}
