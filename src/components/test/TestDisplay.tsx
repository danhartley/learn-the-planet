import { Layout, QuestionType, DistractorType } from '@/types'
import ImageChoiceComponent from '@/components/test/layouts/ImageChoiceComponent'
import MultipleTextChoiceComponent from '@/components/test/layouts/MultipleTextChoiceComponent'
import TextEntryComponent from '@/components/test/layouts/TextEntryComponent'

type Props<T> = {
  layout: Layout<T>
  onSubmit: (answer: string) => void
}

type DisplayKey = `${DistractorType}+${QuestionType}`

const questionTypeMap: Record<DisplayKey, React.ComponentType<any>> = {
  'image+Multiple choice': ImageChoiceComponent,
  'vernacularName+Multiple choice': MultipleTextChoiceComponent,
  'binomial+Multiple choice': MultipleTextChoiceComponent,
  'genus+Multiple choice': MultipleTextChoiceComponent,
  'species+Multiple choice': MultipleTextChoiceComponent,
  'image+Text entry': TextEntryComponent,
  'vernacularName+Text entry': TextEntryComponent,
  'binomial+Text entry': TextEntryComponent,
  'genus+Text entry': TextEntryComponent,
  'species+Text entry': TextEntryComponent,
}

export function TestDisplay<T>({ layout, onSubmit }: Props<T>) {
  const type = layout.distractorType ?? 'binomial'
  const Component = questionTypeMap[`${type}+${layout.question.type}`]
  console.log(type)
  // console.log(Component)
  return <Component question={layout.question} onSubmit={onSubmit} />
}
