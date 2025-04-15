import { MultipleChoiceOption, Image } from '@/types'
import ResponsiveImage from '@/components/common/ResponsiveImage'

const ImageButton = ({
  option,
  setAnswer,
}: {
  option: MultipleChoiceOption
  setAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void
}) => {
  return (
    <button
      id={option.key}
      key={option.key}
      data-key={option.key as string}
      onClick={e => setAnswer(e)}
      title={`Option: ${option.key}`}
    >
      <ResponsiveImage id={option.key} img={option.value as Image} />
    </button>
  )
}

export default ImageButton
