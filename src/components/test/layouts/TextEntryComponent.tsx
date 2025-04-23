'use client'
import React, { useState, FormEvent, useEffect, useRef } from 'react'
import { Layout, TextEntryQuestion, Score } from '@/types'

interface Props<T> {
  layout: Layout<T>
  onSubmit: (answer: string) => Score
  layouts: Layout<T>[]
}

export default function TextEntryComponent({
  layout,
  onSubmit,
  layouts,
}: Props<TextEntryQuestion>) {
  const [answer, setAnswer] = useState('')
  const answerInputRef = useRef(null)
  const [correctClassName, setCorrectClassName] = useState(
    `form-row ${(layout.question as TextEntryQuestion).contentType}`
  )

  const question: TextEntryQuestion = layout.question

  useEffect(() => {
    // Reset display
    setCorrectClassName(
      `form-row ${(layout.question as TextEntryQuestion).contentType}`
    )

    // Reset form
    setAnswer('')

    // Focus on answer
    if (answerInputRef.current) {
      ;(answerInputRef.current as HTMLInputElement).focus()
    }
  }, [question.key])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!answer.trim()) return

    // Submit the answer
    const score = onSubmit(answer.trim())
    const className = score.isCorrect ? 'bg-correct' : 'bg-incorrect'

    setCorrectClassName(`form-row ${className}`)
  }

  return (
    <section className="group-block" aria-labelledby="text-entry">
      <h3 id="text-entry">{question.contentType || question.type}</h3>
      <div className="question-text">{question.text}</div>
      <form onSubmit={handleSubmit}>
        <div className={correctClassName}>
          <label htmlFor="answer">{question.hint}</label>
          <input
            id="answer"
            type="text"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            required
            ref={answerInputRef}
          />
        </div>
        <div className="form-row">
          <button id="submit-answer" type="submit" disabled={!answer.trim()}>
            Submit answer
          </button>
        </div>
      </form>
      <div>
        <div>{`Question ${layout.index + 1} of ${layouts.length}`}</div>
      </div>
    </section>
  )
}
