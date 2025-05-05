import { Layout, QuestionType, Score } from '@/types'
import ImageChoiceComponent from '@/components/test/layouts/ImageChoiceComponent'
import MultipleTextChoiceComponent from '@/components/test/layouts/MultipleTextChoiceComponent'
import TextEntryComponent from '@/components/test/layouts/TextEntryComponent'

type Props<T> = {
  layout: Layout<T>
  onSubmit: (answer: string) => Score | null
  layouts: Layout<T>[]
}

type ComponentMap = {
  [key in QuestionType]: {
    default: React.ComponentType<any>
    image?: React.ComponentType<any>
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

export function TestDisplay<T>({ layout, onSubmit, layouts }: Props<T>) {
  const distractorType = layout.distractorType ?? 'binomial'
  const questionType = layout.question.type

  // Get the map for this question type
  const questionMap = displayComponentMap[questionType]

  let activeLayouts = layouts.filter(l => l.isActive)
  let activeIndex = 1

  activeLayouts.forEach((activeLayout, i) => {
    if (activeLayout.index === layout.index) {
      activeIndex = i + 1
    }
  })

  const questionProgressText = `Question ${activeIndex} of ${activeLayouts.length}`

  // Check if there's a specific component for this distractor type
  // If not, fall back to the default
  const Component =
    distractorType === 'image' && questionMap.image
      ? questionMap.image
      : questionMap.default

  return (
    <Component
      layout={layout}
      onSubmit={onSubmit}
      questionProgressText={questionProgressText}
    />
  )
}
