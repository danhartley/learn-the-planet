'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTestPlanner } from '@/hooks/useTestPlanner'

import Link from 'next/link'

import { TestDisplay } from '@/components/test/TestDisplay'
import { ScoreDisplayNotification } from '@/components/ScoreDisplayNotification'
import { LearningItem } from '@/types'

export function TestContainer<T extends LearningItem>() {
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

  const handleSubmitAnswer = (answer: string | string[]) => {
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
          <h1 id="collection">{currentLayout.collection.name}</h1>
        </div>
        <TestDisplay
          layout={currentLayout}
          onSubmit={handleSubmitAnswer}
          layouts={layouts || []}
        />
        <Link
          className="breadcrumb"
          href={`/collection/${currentLayout.collection.id}`}
        >
          Collection overview
        </Link>
      </section>
      <ScoreDisplayNotification
        isCorrect={score?.isCorrect || false}
        history={testHistory}
        isVisibleClassName={isVisibleClassName}
      />
    </>
  )
}
