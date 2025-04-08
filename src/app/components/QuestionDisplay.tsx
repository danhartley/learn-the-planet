import { Layout } from '@/types'

type Props = {
  layout: Layout
}

export function QuestionDisplay({ layout }: Props) {
  return <div>{layout.question?.text}</div>
}
