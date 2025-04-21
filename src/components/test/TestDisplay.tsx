import { Layout, QuestionType } from '@/types'
import ImageChoiceComponent from '@/components/test/layouts/ImageChoiceComponent'
import MultipleTextChoiceComponent from '@/components/test/layouts/MultipleTextChoiceComponent'
import TextEntryComponent from '@/components/test/layouts/TextEntryComponent'

type Props<T> = {
  layout: Layout<T>
  onSubmit: (answer: string) => void
}

// Create a more robust mapping system with proper TypeScript support
type ComponentMap = {
  [key in QuestionType]: {
    default: React.ComponentType<any>
    image?: React.ComponentType<any>
    // Add other specific overrides as needed
  }
}

const displayComponentMap: ComponentMap = {
  'Multiple choice': {
    default: MultipleTextChoiceComponent,
    image: ImageChoiceComponent,
  },
  'Text entry': {
    default: TextEntryComponent,
    // Text entry uses the same component regardless of distractor type
  },
}

export function TestDisplay<T>({ layout, onSubmit }: Props<T>) {
  const distractorType = layout.distractorType ?? 'binomial'
  const questionType = layout.question.type

  // Get the map for this question type
  const questionMap = displayComponentMap[questionType]

  // Check if there's a specific component for this distractor type
  // If not, fall back to the default
  const Component =
    distractorType === 'image' && questionMap.image
      ? questionMap.image
      : questionMap.default

  return <Component question={layout.question} onSubmit={onSubmit} />
}
