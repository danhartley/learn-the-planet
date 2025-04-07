import { Layout } from '@/lib/types'

type Props = {
  layout: Layout
}

export function QuestionDisplay({ layout }: Props) {
  return <div>{layout.question?.text}</div>
}
