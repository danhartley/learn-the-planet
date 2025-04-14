import React from 'react'
import { MultipleChoiceQuestion, MultipleChoiceOption } from '@/types'

type Props = {
  question: MultipleChoiceQuestion
  onSubmit: (answer: string) => void
}

export default function MultipleTextChoiceComponent({
  question,
  onSubmit,
}: Props) {
  const setAnswer = (answer: string) => {
    onSubmit(answer.trim())
  }

  const buttons = question.options.map((o: MultipleChoiceOption) => {
    return (
      <button
        id={o.key}
        key={o.key}
        value={o.value as string}
        onClick={e => setAnswer((e.target as HTMLButtonElement).value)}
      >
        <span>{o.value as string}</span>
      </button>
    )
  })
  return (
    <section className="group group-block" aria-labelledby="multiple-choice">
      <h3 id="multiple-choice">Multiple choice</h3>
      <div className="question-text">{question.text}</div>
      <div className="block">{buttons}</div>
    </section>
  )
}
