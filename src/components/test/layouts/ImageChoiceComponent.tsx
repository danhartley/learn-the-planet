import { useState, useEffect } from 'react'
import { MultipleChoiceQuestion, MultipleChoiceOption, Layout } from '@/types'
import ImageButton from '@/components/common/ImageButton'

type Props<T> = {
  layout: Layout<T>
  onSubmit: (answer: string) => void
  questionProgressText: string
}

const ImageChoiceComponent = ({
  layout,
  onSubmit,
  questionProgressText,
}: Props<MultipleChoiceQuestion>) => {
  const [userAnswer, setUserAnswer] = useState<string | null>(null)

  const setAnswer = (answer: string) => {
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
      />
    ) : null
  })

  return (
    <section
      className="group-block"
      aria-labelledby="multiple-choice"
      data-type={layout.collection.type}
    >
      <h3 id="multiple-choice">Multiple choice</h3>
      <div className="question-text">{question.text}</div>
      <div className="block options">{images}</div>
      <div>
        <div>{questionProgressText}</div>
      </div>
    </section>
  )
}

export default ImageChoiceComponent
