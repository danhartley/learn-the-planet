import Image from 'next/image'
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
        id={o.key}
        key={o.key}
        data-key={o.key as string}
        onClick={e => setAnswer(e)}
        title={`Option: ${o.key}`}
      >
        <Image
          src={createEOLUrl(o.value.url as string)}
          alt={o.key}
          width={230}
          height={230}
          style={{ objectFit: 'cover' }}
        ></Image>
      </button>
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
