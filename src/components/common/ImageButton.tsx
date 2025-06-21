import { MultipleChoiceOption, Image } from '@/types'
import { ResponsiveImage } from '@/components/common/ResponsiveImage'

type Props = {
  option: MultipleChoiceOption
  setAnswer: (answer: string) => void
  selectedAnswer: string | null
  correctAnswer: string | null
  isAnswered: boolean
}

const ImageButton = ({
  option,
  setAnswer,
  selectedAnswer,
  correctAnswer,
  isAnswered = false,
}: Props) => {
  const handleClick = () => {
    setAnswer(option.key as string)
  }

  // Determine button class based on state
  const getButtonClass = () => {
    if (!selectedAnswer) return ''

    const isSelected = option.key === selectedAnswer
    const isCorrect = option.key === correctAnswer

    if (isSelected && isCorrect) return 'bg-correct'
    if (isSelected && !isCorrect) return 'bg-incorrect'
    if (!isSelected && isCorrect) return 'bg-correct'

    return ''
  }

  return (
    <button
      key={option.key}
      id={option.key}
      data-key={option.key as string}
      onClick={handleClick}
      title={`Option: ${option.key}`}
      className={getButtonClass()}
      disabled={isAnswered}
    >
      <ResponsiveImage
        key={option.key}
        id={option.key}
        img={option.value as Image}
        alt={option.key}
      />
    </button>
  )
}

export default ImageButton
