import React, { useRef, useCallback, useState, useEffect } from 'react'
import {
  MultipleChoiceQuestion,
  MultipleChoiceOption,
  Layout,
  Score,
  LearningItem,
} from '@/types'

type Props<T> = {
  layout: Layout<T>
  onSubmit: (answer: string) => Score
  questionProgressText: string
}

export default function MultipleTextChoiceComponent({
  layout,
  onSubmit,
  questionProgressText,
}: Props<LearningItem>) {
  const [isAnswered, setIsAnswered] = useState(false)
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const question = layout.question as MultipleChoiceQuestion

  if (!question.options) {
    throw new Error('Invalid question type: options are missing.')
  }

  useEffect(() => {
    setIsAnswered(false)
  }, [question.key])

  const setAnswer = useCallback(
    (answer: string, key: string) => {
      setIsAnswered(true)
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

      /* Remove all styling before next multiple text choice question */
      setTimeout(() => {
        if (buttonRefs) {
          Object.keys(buttonRefs.current).map(btn => {
            buttonRefs?.current[btn]?.classList.remove('bg-correct')
            buttonRefs?.current[btn]?.classList.remove('bg-incorrect')
          })
        }
      }, 2000)
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
        disabled={isAnswered}
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
      <div className="block-container">
        <div className="grid-lg options">{buttons}</div>
      </div>
      <div className="question-progress">{questionProgressText}</div>
    </section>
  )
}
