import { Layout } from '@/types'

type Props = {
  layout: Layout
}

export function QuestionDisplay({ layout }: Props) {
  console.log(layout)
  return <div>{layout.question?.text}</div>
}
