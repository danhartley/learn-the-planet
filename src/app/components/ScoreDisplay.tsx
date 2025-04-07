'use client'

import { useTestPlanner } from '@/lib/hooks/useTestPlanner'

export function ScoreDisplay() {
  const { lastScore } = useTestPlanner()

  return (
    <>
      <h3>Score display</h3>
      {lastScore ? (
        <dl>
          <dt>Question count</dt>
          <dd>{lastScore?.questionCount}</dd>
          <dt>Correct count</dt>
          <dd>{lastScore?.correctCount}</dd>
          <dt>Incorrect count</dt>
          <dd>{lastScore?.incorrectCount}</dd>
          <dt>Last answered</dt>
          <dd>{lastScore?.isCorrect}</dd>
        </dl>
      ) : (
        <div>No score</div>
      )}
    </>
  )
}
