'use client'

import React, { useState, useEffect } from 'react'
import { useTestPlanner } from '@/hooks/useTestPlanner'
import { HistoryItem } from '@/types'

export function ScoreDisplay<T>() {
  const {
    lastScore,
    currentLayout,
    layouts,
    updateTestHistory,
    testHistory,
    testState,
  } = useTestPlanner<T>()
  const [history, setHistory] = useState<HistoryItem<T>[]>([])

  const progressValue = testState?.isEndOfTest
    ? testState.layoutCount
    : currentLayout?.index

  // Progress display logic
  const progress = !!currentLayout ? (
    <div>
      <label htmlFor="test-progress">Test progress </label>
      <div>
        <progress
          id="test-progress"
          max={testState?.layoutCount}
          value={progressValue}
        >{`${progressValue}%`}</progress>
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
  ) : null

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
        layoutId: currentLayout?.id || '',
      }

      const newHistory = [answer, ...history]
      setHistory(newHistory)
      updateTestHistory(newHistory)
    }
  }, [lastScore?.questionCount])

  const currentHistory = history.length > 0 ? history : testHistory

  const historyItems = currentHistory.map(historyItem => (
    <li key={historyItem.id}>
      <div className={historyItem.isCorrect ? 'correct' : 'incorrect'}>
        <div>
          {historyItem.question} ({historyItem.answer})
        </div>
      </div>
    </li>
  ))

  return (
    <section aria-labelledby="score">
      <h3 id="score">Test score</h3>
      {progress}
      {score}
      <ul>{historyItems}</ul>
    </section>
  )
}
