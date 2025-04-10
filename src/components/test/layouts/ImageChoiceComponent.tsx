import { MultipleChoiceQuestion, MultipleChoiceOption } from '@/types'
import { createEOLUrl } from '@/utils/image'

type Props = {
  question: MultipleChoiceQuestion
  onSubmit: (answer: string) => void
}

const ImageChoiceComponent = ({ question, onSubmit }: Props) => {
  const setAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const answer = (e.currentTarget.dataset.key || '').trim()
    onSubmit(answer)
  }
  const images = question.options.map((o: MultipleChoiceOption) => {
    return typeof o.value === 'object' && 'url' in o.value ? (
      <button
        key={o.key}
        data-key={o.key as string}
        onClick={e => setAnswer(e)}
      >
        <img
          key={o.key}
          src={createEOLUrl(o.value.url as string)}
          alt={o.key}
        />
      </button>
    ) : null
  })
  return (
    <>
      <h3>{question.text}</h3>
      <div className="block">{images}</div>
    </>
  )
}

export default ImageChoiceComponent
