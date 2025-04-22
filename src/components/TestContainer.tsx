'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTestPlanner } from '@/hooks/useTestPlanner'
import { TestDisplay } from '@/components/test/TestDisplay'

export function TestContainer<T>() {
  const router = useRouter()
  const { currentLayout, isActive, markAnswer, moveToNextQuestion } =
    useTestPlanner<T>()

  // Redirect if no test is active
  useEffect(() => {
    if (!isActive) {
      router.push('/collections')
    }
  }, [isActive, router])

  if (!currentLayout) return null

  const handleSubmitAnswer = (answer: string) => {
    const score = markAnswer(answer)
    setTimeout(() => {
      const hasNext = moveToNextQuestion()

      if (!hasNext) {
        // Test completed
        router.push('/results')
      }
    }, 2000)
    return score
  }

  return (
    <section className="group" aria-labelledby="collection">
      <h2 id="collection">{currentLayout.collection.name}</h2>
      <TestDisplay layout={currentLayout} onSubmit={handleSubmitAnswer} />
    </section>
  )
}
