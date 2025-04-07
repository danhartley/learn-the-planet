'use client'
import React, { useState, FormEvent } from 'react'

interface QuestionAnswerProps {
  onSubmit: (answer: string) => void
}

export function QuestionAnswer({ onSubmit }: QuestionAnswerProps) {
  const [answer, setAnswer] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!answer.trim()) return

    setIsSubmitting(true)

    // Submit the answer
    onSubmit(answer.trim())

    // Reset form
    setAnswer('')
    setIsSubmitting(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="answer">Your Answer:</label>
        <input
          id="answer"
          type="text"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          required
        />
        <div>
          <button type="submit" disabled={isSubmitting || !answer.trim()}>
            {isSubmitting ? 'Submitting...' : 'Submit Answer'}
          </button>
        </div>
      </form>
    </div>
  )
}
