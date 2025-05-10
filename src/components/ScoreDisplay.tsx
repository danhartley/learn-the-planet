'use client'

import { useTestPlanner } from '@/hooks/useTestPlanner'

import { HistoryItem } from '@/types'

export function ScoreDisplay<T>() {
  const { currentLayout, testHistory, testState } = useTestPlanner<T>()

  const progressValue = testState?.isEndOfTest
    ? testState.layoutCount
    : currentLayout?.index

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

  const feedback =
    testHistory?.length > 0 ? (
      <div className="feedback">{`You've answered ${testHistory.filter(s => s.isCorrect).length} out of ${testHistory.length} correctly.`}</div>
    ) : (
      <div>Your answers and score will appear here.</div>
    )

  const historyItems = (testHistory as HistoryItem<T>[]).map(historyItem => (
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
      <div className="group">
        <h3 id="score">Test score</h3>
        {progress}
      </div>
      {feedback}
      <ul>{historyItems}</ul>
    </section>
  )
}
