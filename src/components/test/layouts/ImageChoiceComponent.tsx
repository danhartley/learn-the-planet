import { MultipleChoiceQuestion, MultipleChoiceOption, Layout } from '@/types'
import ImageButton from '@/components/common/ImageButton'

type QuestionAnswerProps<T> = {
  layout: Layout<T>
  onSubmit: (answer: string) => void
}

const ImageChoiceComponent = ({
  layout,
  onSubmit,
}: QuestionAnswerProps<MultipleChoiceQuestion>) => {
  const setAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const answer = (e.currentTarget.dataset.key || '').trim()
    onSubmit(answer)
  }

  const question = layout.question as MultipleChoiceQuestion
  if (!question.options) {
    throw new Error('Invalid question type: options are missing.')
  }

  const images = question.options.map((option: MultipleChoiceOption) => {
    return typeof option.value === 'object' && 'url' in option.value ? (
      <ImageButton key={option.key} option={option} setAnswer={setAnswer} />
    ) : null
  })
  return (
    <section className="group-block" aria-labelledby="multiple-choice">
      <h3 id="multiple-choice">Multiple choice</h3>
      <div className="question-text">{question.text}</div>
      <div className="block">{images}</div>
    </section>
  )
}

export default ImageChoiceComponent
