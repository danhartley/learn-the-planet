import { useState, useEffect } from 'react'
import {
  MultipleChoiceQuestion,
  MultipleChoiceOption,
  Layout,
  LearningItem,
  Score,
} from '@/types'
import ImageButton from '@/components/common/ImageButton'

type Props<T> = {
  layout: Layout<T>
  onSubmit: (answer: string) => Score
  questionProgressText: string
}

const ImageChoiceComponent = ({
  layout,
  onSubmit,
  questionProgressText,
}: Props<LearningItem>) => {
  const [userAnswer, setUserAnswer] = useState<string | null>(null)
  const [isAnswered, setAnswered] = useState(false)

  const setAnswer = (answer: string) => {
    setAnswered(true)
    setUserAnswer(answer)
    onSubmit((answer || '').trim())
  }

  useEffect(() => {
    // Reset display
    setUserAnswer('')
  }, [])

  const question = layout.question as MultipleChoiceQuestion
  if (!question.options) {
    throw new Error('Invalid question type: options are missing.')
  }

  const images = question.options.map((option: MultipleChoiceOption) => {
    return typeof option.value === 'object' && 'url' in option.value ? (
      <ImageButton
        key={option.key}
        option={option}
        setAnswer={setAnswer}
        correctAnswer={question.key}
        selectedAnswer={userAnswer}
        isAnswered={isAnswered}
      />
    ) : null
  })

  return (
    <section
      className="group-block"
      aria-labelledby="multiple-choice"
      data-type={layout.collection.type}
    >
      <div>
        <h2 id="multiple-choice">Multiple choice</h2>
        <div className="question-text">{question.text}</div>
      </div>
      <div className="block-container">
        <div className="grid-lg options">{images}</div>
      </div>
      <div className="question-progress">{questionProgressText}</div>
    </section>
  )
}

export default ImageChoiceComponent
