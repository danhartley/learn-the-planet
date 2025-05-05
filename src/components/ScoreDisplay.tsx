'use client'

import { useTestPlanner } from '@/hooks/useTestPlanner'

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
      <p>{`You've answered ${testHistory.filter(s => s.isCorrect).length} out of ${testHistory.length} correctly.`}</p>
    ) : (
      <p>Your answers and score will appear here.</p>
    )

  const historyItems = testHistory.map(historyItem => (
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
      {feedback}
      <ul>{historyItems}</ul>
    </section>
  )
}
