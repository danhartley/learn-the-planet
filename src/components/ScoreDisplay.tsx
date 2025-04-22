'use client'

import React, { useState, useEffect } from 'react'
import { useTestPlanner } from '@/hooks/useTestPlanner'
import { QuestionType } from '@/types'

type HistoryItem<T> = {
  id: string
  isCorrect: boolean
  item: T | undefined
  question: string | undefined
  type: QuestionType | undefined
  answer: string | undefined
}

export function ScoreDisplay<T>() {
  const { lastScore, currentLayout, layouts } = useTestPlanner<T>()
  const [history, setHistory] = useState<HistoryItem<T>[]>([])

  // Progress display logic
  const progress = !!currentLayout ? (
    <div className="form-row">
      <label htmlFor="test-progress">Test progress </label>
      <div>
        <progress
          id="test-progress"
          max={currentLayout.collection.items.length}
          value={currentLayout.index}
        >{`${currentLayout.index + 1}%`}</progress>
      </div>
    </div>
  ) : (
    <div>
      <progress id="test-progress" max={10} value={0}>
        {0}
      </progress>
    </div>
  )

  // Score display logic
  const score = lastScore ? (
    <p>{`You've answered ${lastScore.correctCount} out of ${lastScore.questionCount} correctly.`}</p>
  ) : (
    <p>Start test</p>
  )

  // Update history when lastScore changes
  useEffect(() => {
    if (lastScore) {
      const answer: HistoryItem<T> = {
        id: crypto.randomUUID(),
        isCorrect: lastScore.isCorrect,
        item: currentLayout?.item,
        question: currentLayout?.question.text,
        type: currentLayout?.question.type,
        answer: currentLayout?.question.key,
      }

      setHistory(prevHistory => [answer, ...prevHistory])
    }
  }, [lastScore?.questionCount])

  const historyItems = history.map(historyItem => (
    <li key={historyItem.id}>
      <div className={historyItem.isCorrect ? 'correct' : 'incorrect'}>
        {historyItem.question} ({historyItem.answer})
      </div>
    </li>
  ))

  const _layouts = layouts

  return (
    <section aria-labelledby="score">
      <h3 id="score">Test score</h3>
      {progress}
      {score}
      <ul>{historyItems}</ul>
    </section>
  )
}
