import React, { useRef, useCallback } from 'react'
import {
  MultipleChoiceQuestion,
  MultipleChoiceOption,
  Layout,
  Score,
} from '@/types'

type Props<T> = {
  layout: Layout<T>
  onSubmit: (answer: string) => Score
  layouts: Layout<T>[]
}

export default function MultipleTextChoiceComponent({
  layout,
  onSubmit,
  layouts,
}: Props<MultipleChoiceQuestion>) {
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const question = layout.question as MultipleChoiceQuestion

  if (!question.options) {
    throw new Error('Invalid question type: options are missing.')
  }

  const setAnswer = useCallback(
    (answer: string, key: string) => {
      if (buttonRefs.current[key]) {
        const isCorrect = answer === question.key

        // Change background to highlight correct or incorrect answer
        isCorrect
          ? buttonRefs.current[key].classList.add('bg-correct')
          : buttonRefs.current[key].classList.add('bg-incorrect')

        // If answer was incorrect, show the correct response
        if (!isCorrect) {
          const correctKey = question.options.find(
            option => option.value === question.key
          )?.key

          if (correctKey)
            buttonRefs.current[correctKey]?.classList.add('bg-correct')
        }
      }

      onSubmit(answer.trim())
    },
    [onSubmit]
  )

  const buttons = question.options.map((option: MultipleChoiceOption) => {
    return (
      <button
        id={option.key}
        key={option.key}
        value={option.value as string}
        onClick={() => setAnswer(option.value as string, option.key)}
        ref={el => {
          buttonRefs.current[option.key] = el
        }}
      >
        <span>{option.value as string}</span>
      </button>
    )
  })

  return (
    <section
      className="group-block"
      aria-labelledby="multiple-choice"
      data-type={layout.collection.type}
    >
      <h3 id="multiple-choice">Multiple choice</h3>
      <div className="question-text">{question.text}</div>
      <div className="block options">{buttons}</div>
      <div>
        <div>{`Question ${layout.index + 1} of ${layouts.length}`}</div>
      </div>
    </section>
  )
}
