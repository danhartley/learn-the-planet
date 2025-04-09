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
        key={o.key}
        value={o.value as string}
        onClick={e => setAnswer((e.target as HTMLButtonElement).value)}
      >
        {o.value as string}
      </button>
    )
  })
  return (
    <>
      <h3>Multiple choice</h3>
      <div>{question.text}</div>
      <div className="block">{buttons}</div>
    </>
  )
}
