'use client'
import React, { useState, FormEvent, useEffect, useRef } from 'react'
import { MultipleSelectQuestion, Layout, Score, LearningItem } from '@/types'

type Props<T> = {
  layout: Layout<T>
  onSubmit: (answer: string | string[]) => Score
  questionProgressText: string
}

export default function CheckBoxComponent({
  layout,
  onSubmit,
  questionProgressText,
}: Props<LearningItem>) {
  const [answers, setAnswers] = useState<string[]>([])

  const addAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const answer = (e.target as HTMLInputElement).value
    setAnswers(prev =>
      prev.includes(answer) ? prev.filter(a => a !== answer) : [...prev, answer]
    )
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const score = onSubmit(answers)
  }

  const question = layout.question as MultipleSelectQuestion

  const options = question.options.map(option => {
    return (
      <div key={option}>
        <label htmlFor={option}>
          <input
            id={option}
            type="checkbox"
            onChange={addAnswer}
            value={option}
            checked={answers.includes(option)}
          />
          {option}
        </label>
      </div>
    )
  })

  return (
    <section
      className="group-block"
      aria-labelledby="multiple-select"
      data-type={layout.collection.type}
    >
      <h3 id="multiple-select">Multiple select</h3>
      <div className="question-text">{question.text}</div>
      <div className="block-container">
        <div className="grid-lg options">{options}</div>
      </div>
      <div className="form-row">
        <button
          id="submit-answer"
          type="submit"
          disabled={answers.length !== 2}
          onClick={handleSubmit}
        >
          Submit answer
        </button>
      </div>
      <div>
        <div>{questionProgressText}</div>
      </div>
    </section>
  )
}
