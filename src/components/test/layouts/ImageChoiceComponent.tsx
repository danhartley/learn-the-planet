import { MultipleChoiceQuestion, MultipleChoiceOption } from '@/types'
import ImageButton from '@/components/common/ImageButton'

type Props = {
  question: MultipleChoiceQuestion
  onSubmit: (answer: string) => void
}

const ImageChoiceComponent = ({ question, onSubmit }: Props) => {
  const setAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const answer = (e.currentTarget.dataset.key || '').trim()
    onSubmit(answer)
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
