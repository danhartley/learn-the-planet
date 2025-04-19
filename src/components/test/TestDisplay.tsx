import {
  Layout,
  ContentHandlerType,
  QuestionType,
  DistractorType,
} from '@/types'
import ImageChoiceComponent from '@/components/test/layouts/ImageChoiceComponent'
import MultipleTextChoiceComponent from '@/components/test/layouts/MultipleTextChoiceComponent'
import TextEntryComponent from '@/components/test/layouts/TextEntryComponent'

type Props<T> = {
  layout: Layout<T>
  onSubmit: (answer: string) => void
}

type DisplayKey = `${ContentHandlerType}+${DistractorType}+${QuestionType}`

const displayTypeMap: Record<DisplayKey, React.ComponentType<any>> = {
  'taxonomy+image+Multiple choice': ImageChoiceComponent,
  'taxonomy+vernacularName+Multiple choice': MultipleTextChoiceComponent,
  'taxonomy+binomial+Multiple choice': MultipleTextChoiceComponent,
  'taxonomy+genus+Multiple choice': MultipleTextChoiceComponent,
  'taxonomy+species+Multiple choice': MultipleTextChoiceComponent,
  'taxonomy+image+Text entry': TextEntryComponent,
  'taxonomy+vernacularName+Text entry': TextEntryComponent,
  'taxonomy+binomial+Text entry': TextEntryComponent,
  'taxonomy+genus+Text entry': TextEntryComponent,
  'taxonomy+species+Text entry': TextEntryComponent,
}

export function TestDisplay<T>({ layout, onSubmit }: Props<T>) {
  const distractorType = layout.distractorType ?? 'binomial'
  const contentType = layout.collection.type
  const questionType = layout.question.type
  const displayType =
    `${contentType}+${distractorType}+${questionType}` as DisplayKey
  const Component = displayTypeMap[displayType]
  return <Component question={layout.question} onSubmit={onSubmit} />
}
