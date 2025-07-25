'use client'
import React, { useState, FormEvent, useRef, useEffect } from 'react'
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
  const [isAnswered, setIsAnswered] = useState(false)
  const checkboxRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const addAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const answer = (e.target as HTMLInputElement).value
    setAnswers(prev =>
      prev.includes(answer) ? prev.filter(a => a !== answer) : [...prev, answer]
    )
  }

  const question = layout.question as MultipleSelectQuestion

  if (!question.options) {
    throw new Error('Invalid question type: options are missing.')
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    setIsAnswered(true)

    /* Mark correct or incorrect answers */
    Object.values(checkboxRefs.current).forEach(cb => {
      const answer = cb?.value as string
      const isChecked = cb?.checked
      const isCorrect = question.key.includes(answer)
      if (isCorrect) {
        cb?.classList.add('cb-correct')
        cb?.parentElement?.classList.add('bg-correct-light')
      }
      if (!isCorrect && isChecked) {
        cb?.classList.add('cb-incorrect')
        cb?.parentElement?.classList.add('bg-incorrect-light')
      }
    })

    onSubmit(answers)
  }

  const options = question.options.map((option: string) => {
    return (
      <div key={option} className="row-group">
        <input
          id={option}
          type="checkbox"
          onChange={addAnswer}
          value={option}
          checked={answers.includes(option)}
          ref={el => {
            checkboxRefs.current[option] = el
          }}
        />
        <label htmlFor={option}>{option}</label>
      </div>
    )
  })

  useEffect(() => {
    setAnswers([])
    setIsAnswered(false)

    // Clean up any styling from previous question
    Object.values(checkboxRefs.current).forEach(cb => {
      cb?.classList.remove('cb-correct', 'cb-incorrect')
      cb?.parentElement?.classList.remove(
        'bg-correct-light',
        'bg-incorrect-light'
      )
    })
  }, [layout.question])

  return (
    <section
      className="group-block"
      aria-labelledby="multiple-select"
      data-type={layout.collection.type}
    >
      <div>
        <h2 id="multiple-select">Multiple select</h2>
        <div className="question-text">{question.text}</div>
      </div>
      <div className="block-container">
        <div className="grid-lg options">{options}</div>
      </div>
      <div className="form-row">
        <button
          id="submit-answer"
          type="submit"
          disabled={answers.length !== 2 || isAnswered}
          onClick={handleSubmit}
        >
          Submit answer
        </button>
      </div>
      <div className="question-progress">{questionProgressText}</div>
    </section>
  )
}
