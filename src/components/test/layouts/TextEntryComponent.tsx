'use client'
import React, { useState, FormEvent, useEffect, useRef } from 'react'
import { Layout, TextEntryQuestion, Score, LearningItem } from '@/types'

interface Props<T> {
  layout: Layout<T>
  onSubmit: (answer: string) => Score
  questionProgressText: string
}

export default function TextEntryComponent({
  layout,
  onSubmit,
  questionProgressText,
}: Props<LearningItem>) {
  const [answer, setAnswer] = useState('')
  const answerInputRef = useRef(null)
  const [correctClassName, setCorrectClassName] = useState(
    `form-row ${layout.collection.type.toString()}`
  )
  const [isAnswered, setIsAnswered] = useState(false)
  const question: TextEntryQuestion = layout.question as TextEntryQuestion

  useEffect(() => {
    // Reset display
    setCorrectClassName(`form-row ${layout.collection.type.toString()}`)

    // Reset form
    setAnswer('')
    setIsAnswered(false)

    // Focus on answer
    if (answerInputRef.current) {
      ;(answerInputRef.current as HTMLInputElement).focus()
    }
  }, [question.key, layout.question])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!answer.trim()) return

    setIsAnswered(true)

    // Submit the answer
    const score = onSubmit(answer.trim())
    const className = score.isCorrect ? 'bg-correct' : 'bg-incorrect'

    setCorrectClassName(`form-row ${className}`)
  }

  return (
    <section
      className="group-block"
      aria-labelledby="text-entry"
      data-type={layout.collection.type}
    >
      <div>
        <h2 id="text-entry">
          <label htmlFor="answer">
            {question.contentType || question.type}
          </label>
        </h2>
        <div className="question-text">{question.text}</div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={correctClassName}>
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
          <button
            id="submit-answer"
            type="submit"
            disabled={!answer.trim() || isAnswered}
          >
            Submit answer
          </button>
        </div>
      </form>
      <div className="question-progress">{questionProgressText}</div>
    </section>
  )
}
