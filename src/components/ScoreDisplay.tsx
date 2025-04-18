'use client'

import { useTestPlanner } from '@/hooks/useTestPlanner'

export function ScoreDisplay<T>() {
  const { lastScore } = useTestPlanner<T>()

  return (
    <section aria-labelledby="score">
      <h3 id="score">Collection score</h3>
      {lastScore ? (
        <dl>
          <div>
            <dt>Correct count</dt>
            <dd>{lastScore.correctCount}</dd>
          </div>
          <div>
            <dt>Incorrect count</dt>
            <dd>{lastScore.incorrectCount}</dd>
          </div>
          <div>
            <dt>Question count</dt>
            <dd>{lastScore.questionCount}</dd>
          </div>
          <div>
            <dt>Last answered</dt>
            <dd>{lastScore.isCorrect.toString()}</dd>
          </div>
        </dl>
      ) : (
        <div>No score</div>
      )}
    </section>
  )
}
