'use client'
import React, { useState, FormEvent } from 'react'
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAnswerHidden, setIsAnswerHidden] = useState(true)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!answer.trim()) return

    setTimeout(() => {
      // Hide answer
      setIsAnswerHidden(true)

      setIsSubmitting(true)

      // Submit the answer
      onSubmit(answer.trim())

      // Reset form
      setAnswer('')
      setIsSubmitting(false)
    }, 1500)

    // Show answer
    setIsAnswerHidden(false)
  }

  return (
    <section className="group" aria-labelledby="text-entry">
      <h3 id="text-entry">Text entry</h3>
      <div className="question-text">{question.text}</div>
      <form onSubmit={handleSubmit}>
        <div className="block">
          <label htmlFor="answer">Your Answer:</label>
          <input
            id="answer"
            type="text"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            required
          />
          <div className={isAnswerHidden ? 'hidden' : ''}>{question.key}</div>
        </div>
        <div>
          <button
            id="submit-answer"
            type="submit"
            disabled={isSubmitting || !answer.trim()}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Answer'}
          </button>
        </div>
      </form>
    </section>
  )
}
