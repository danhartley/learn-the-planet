'use client'
import { useState, useEffect } from 'react'

import { useTestPlanner } from '@/hooks/useTestPlanner'

import { HistoryItem } from '@/types'

export function ScoreDisplay<T>() {
  const { currentLayout, testHistory, testState, layouts } = useTestPlanner<T>()
  const [progressValue, setProgressValue] = useState<number | undefined>(0)
  const [layoutCount, setLayoutCount] = useState(layouts.length)

  useEffect(() => {
    setProgressValue(testHistory.length)
    setLayoutCount(layouts.filter(l => l.isActive).length)
  }, [testHistory.length, layouts])

  const progress = !!currentLayout ? (
    <div>
      <label htmlFor="test-progress">Completed</label>
      <div>
        <progress
          id="test-progress"
          max={layoutCount || testState?.layoutCount}
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

  const feedback =
    testHistory?.length > 0 ? (
      <div className="font-weight-600">{`You've answered ${testHistory.filter(s => s.isCorrect).length} out of ${testHistory.length} correctly.`}</div>
    ) : (
      <div>A record of your progress will appear here.</div>
    )

  const questionDisplay = (
    question: string | string[],
    answer: string | string[]
  ): React.ReactNode => {
    return Array.isArray(answer) ? (
      <div>
        <em>{question}</em> ({answer.join(' - ')})
      </div>
    ) : (
      <div>
        <em>{question}</em> ({answer})
      </div>
    )
  }

  const historyItems = (testHistory as HistoryItem<T>[]).map(historyItem => (
    <li key={historyItem.id}>
      <div className={historyItem.isCorrect ? 'correct' : 'incorrect'}>
        {questionDisplay(historyItem.question || '', historyItem.answer || '')}
      </div>
    </li>
  ))

  return (
    <section aria-labelledby="score" className="column-group">
      <div className="group">
        <h2 id="score">Lesson progress</h2>
        {progress}
      </div>
      {feedback}
      <ul className="list-group">{historyItems}</ul>
    </section>
  )
}
