import React from 'react'
import { MultipleChoiceQuestion, MultipleChoiceOption, Layout } from '@/types'

type QuestionAnswerProps<T> = {
  layout: Layout<T>
  onSubmit: (answer: string) => void
}

export default function MultipleTextChoiceComponent({
  layout,
  onSubmit,
}: QuestionAnswerProps<MultipleChoiceQuestion>) {
  const setAnswer = (answer: string) => {
    onSubmit(answer.trim())
  }

  const question = layout.question as MultipleChoiceQuestion
  if (!question.options) {
    throw new Error('Invalid question type: options are missing.')
  }

  const buttons = question.options.map((o: MultipleChoiceOption) => {
    return (
      <button
        id={o.key}
        key={o.key}
        value={o.value as string}
        onClick={() => setAnswer(o.value as string)}
      >
        <span>{o.value as string}</span>
      </button>
    )
  })
  return (
    <section className="group-block" aria-labelledby="multiple-choice">
      <h3 id="multiple-choice">Multiple choice</h3>
      <div className="question-text">{question.text}</div>
      <div className="block">{buttons}</div>
    </section>
  )
}
