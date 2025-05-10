'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTestPlanner } from '@/hooks/useTestPlanner'

import Link from 'next/link'

import { TestDisplay } from '@/components/test/TestDisplay'
import { ScoreDisplayNotification } from '@/components/ScoreDisplayNotification'

export function TestContainer<T>() {
  const router = useRouter()
  const {
    currentLayout,
    isActive,
    markAnswer,
    moveToNextQuestion,
    layouts,
    testHistory,
  } = useTestPlanner<T>()
  const [isVisibleClassName, setIsVisibleClassName] = useState('hidden')
  const score = testHistory.at(0)

  // Redirect if no test is active
  useEffect(() => {
    if (!isActive) {
      router.push('/collections')
    }
  }, [isActive, router])

  if (!currentLayout) return null

  const handleSubmitAnswer = (answer: string) => {
    const score = markAnswer(answer)
    setIsVisibleClassName('visible')
    setTimeout(() => {
      const hasNext = moveToNextQuestion()
      if (!hasNext) {
        // Test completed
        router.push('/test/review')
      }
      setIsVisibleClassName('hidden')
    }, 2000)
    return score
  }

  return (
    <>
      <section className="group" aria-labelledby="collection">
        <div className="group">
          <h1 id="collection">Questions</h1>
          <h2 id="collection">{currentLayout.collection.name}</h2>
          <Link
            className="breadcrumb"
            href={`/collection/${currentLayout.collection.id}`}
          >
            Collection notes
          </Link>
        </div>
        <TestDisplay
          layout={currentLayout}
          onSubmit={handleSubmitAnswer}
          layouts={layouts || []}
        />
      </section>
      <ScoreDisplayNotification
        isCorrect={score?.isCorrect || false}
        history={history}
        isVisibleClassName={isVisibleClassName}
      />
    </>
  )
}
