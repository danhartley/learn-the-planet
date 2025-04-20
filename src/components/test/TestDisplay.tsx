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
  // Taxonomy mappings
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

  // Definition mappings
  'definition+image+Multiple choice': ImageChoiceComponent,
  'definition+vernacularName+Multiple choice': MultipleTextChoiceComponent,
  'definition+binomial+Multiple choice': MultipleTextChoiceComponent,
  'definition+genus+Multiple choice': MultipleTextChoiceComponent,
  'definition+species+Multiple choice': MultipleTextChoiceComponent,
  'definition+image+Text entry': TextEntryComponent,
  'definition+vernacularName+Text entry': TextEntryComponent,
  'definition+binomial+Text entry': TextEntryComponent,
  'definition+genus+Text entry': TextEntryComponent,
  'definition+species+Text entry': TextEntryComponent,
}

export function TestDisplay<T>({ layout, onSubmit }: Props<T>) {
  const distractorType = layout.distractorType ?? 'binomial'
  const contentType = layout.collection.type
  const questionType = layout.question.type
  const displayType =
    `${contentType}+${distractorType}+${questionType}` as DisplayKey
  console.log(displayType)
  const Component = displayTypeMap[displayType]
  return <Component question={layout.question} onSubmit={onSubmit} />
}
