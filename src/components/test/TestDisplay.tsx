import React from 'react'
import { Layout, QuestionType, Score, LearningItem } from '@/types'
import ImageChoiceComponent from '@/components/test/layouts/ImageChoiceComponent'
import MultipleTextChoiceComponent from '@/components/test/layouts/MultipleTextChoiceComponent'
import TextEntryComponent from '@/components/test/layouts/TextEntryComponent'
import MultiSelectTestQuestion from '@/components/test/layouts/MultiSelectTestQuestion'

// Props for the TestDisplay component
type Props<T extends LearningItem> = {
  layout: Layout<T>
  onSubmit: (answer: string | string[]) => Score | null
  layouts: Layout<unknown>[]
}

// Props for the child components
type ComponentProps = {
  layout: Layout<unknown>
  onSubmit: (answer: string | string[]) => Score | null
  questionProgressText: string
}

// Map of question types to their respective components
type ComponentMap = {
  [key in QuestionType]: {
    default: React.ComponentType<ComponentProps>
    image?: React.ComponentType<ComponentProps>
  }
}

const displayComponentMap: ComponentMap = {
  'Multiple choice': {
    default: MultipleTextChoiceComponent as React.ComponentType<ComponentProps>,
    image: ImageChoiceComponent as React.ComponentType<ComponentProps>,
  },
  'Text entry': {
    default: TextEntryComponent as React.ComponentType<ComponentProps>,
  },
  'Multiple select': {
    default: MultiSelectTestQuestion as React.ComponentType<ComponentProps>,
  },
}

export function TestDisplay<T extends LearningItem>({
  layout,
  onSubmit,
  layouts,
}: Props<T>) {
  const distractorType = layout.distractorType ?? 'binomial'
  const questionType = layout.question.type

  // Get the map for this question type
  const questionMap = displayComponentMap[questionType]

  const activeLayouts = layouts.filter(l => l.isActive)
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
      layout={layout as unknown as Layout<unknown>}
      onSubmit={onSubmit}
      questionProgressText={questionProgressText}
    />
  )
}
