'use client'
import React, { useState, FormEvent, useRef, useEffect } from 'react'
import { MultipleSelectQuestion, Layout, Score, LearningItem } from '@/types'
import MultiSelectList from '@/components/common/MultiSelectList'

type Props<T> = {
  layout: Layout<T>
  onSubmit: (answer: string | string[]) => Score
  questionProgressText: string
}

export default function MultiSelectTestQuestion({
  layout,
  onSubmit,
  questionProgressText,
}: Props<LearningItem>) {
  const [answers, setAnswers] = useState<string[]>([])
  const [isAnswered, setIsAnswered] = useState(false)
  const checkboxRefsRef = useRef<Record<string, HTMLInputElement | null>>({})

  const question = layout.question as MultipleSelectQuestion

  if (!question.options) {
    throw new Error('Invalid question type: options are missing.')
  }

  const handleSelectionChange = (selectedValues: string[]) => {
    setAnswers(selectedValues)
  }

  const handleRefsReady = (refs: Record<string, HTMLInputElement | null>) => {
    checkboxRefsRef.current = refs
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    setIsAnswered(true)

    /* Mark correct or incorrect answers */
    Object.values(checkboxRefsRef.current).forEach(cb => {
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

  useEffect(() => {
    setAnswers([])
    setIsAnswered(false)

    // Clean up any styling from previous question
    Object.values(checkboxRefsRef.current).forEach(cb => {
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
      <h3 id="multiple-select">Multiple select</h3>
      <div className="question-text">{question.text}</div>
      <div className="block-container">
        <MultiSelectList
          options={question.options}
          selectedValues={answers}
          onSelectionChange={handleSelectionChange}
          onRefsReady={handleRefsReady}
          disabled={isAnswered}
        />
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
