import { Layout, QuestionType, DistractorType } from '@/types'
import ImageChoiceComponent from '@/components/test/layouts/ImageChoiceComponent'
import MultipleTextChoiceComponent from '@/components/test/layouts/MultipleTextChoiceComponent'
import TextEntryComponent from '@/components/test/layouts/TextEntryComponent'

type Props = {
  layout: Layout
  onSubmit: (answer: string) => void
}

type DisplayKey = `${DistractorType}+${QuestionType}`

const questionTypeMap: Record<DisplayKey, React.ComponentType<any>> = {
  'image+Multiple choice': ImageChoiceComponent,
  'common+Multiple choice': MultipleTextChoiceComponent,
  'binomial+Multiple choice': MultipleTextChoiceComponent,
  'genus+Multiple choice': MultipleTextChoiceComponent,
  'species+Multiple choice': MultipleTextChoiceComponent,
  'image+Text entry': TextEntryComponent,
  'common+Text entry': TextEntryComponent,
  'binomial+Text entry': TextEntryComponent,
  'genus+Text entry': TextEntryComponent,
  'species+Text entry': TextEntryComponent,
}

export function QuestionDisplay({ layout, onSubmit }: Props) {
  const type = layout.distractorType ?? 'binomial'
  const Component = questionTypeMap[`${type}+${layout.question.type}`]
  return <Component question={layout.question} onSubmit={onSubmit} />
}
