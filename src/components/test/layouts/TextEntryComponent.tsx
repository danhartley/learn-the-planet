'use client'
import React, { useState, FormEvent, useEffect } from 'react'
import { TextEntryQuestion } from '@/types'

interface QuestionAnswerProps {
  question: TextEntryQuestion
  onSubmit: (answer: string) => void
}

export default function TextEntryComponent({
  question,
  onSubmit,
}: QuestionAnswerProps) {
  const [answer, setAnswer] = useState('')
  const [isAnswerVisible, showAnswer] = useState(false)

  useEffect(() => {
    // Hide answer when we move to next question
    showAnswer(false)

    // Reset form
    setAnswer('')
  }, [question.key])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!answer.trim()) return

    // Submit the answer
    onSubmit(answer.trim())

    // Show answer
    showAnswer(true)
  }

  return (
    <section className="group-block" aria-labelledby="text-entry">
      <h3 id="text-entry">Text entry</h3>
      <div className="question-text">{question.text}</div>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="answer">{question.hint}</label>
          <input
            id="answer"
            type="text"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <button id="submit-answer" type="submit" disabled={!answer.trim()}>
            Submit Answer
          </button>
        </div>
        <div className="form-row">
          <div className={isAnswerVisible ? '' : 'hidden'}>{question.key}</div>
        </div>
      </form>
    </section>
  )
}
