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
      <h3>Text entry</h3>
      <form onSubmit={handleSubmit}>
        <div>{question.text}</div>
        <div className="block">
          <label htmlFor="answer">Your Answer:</label>
          <input
            id="answer"
            type="text"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit" disabled={isSubmitting || !answer.trim()}>
            {isSubmitting ? 'Submitting...' : 'Submit Answer'}
          </button>
        </div>
      </form>
    </div>
  )
}
