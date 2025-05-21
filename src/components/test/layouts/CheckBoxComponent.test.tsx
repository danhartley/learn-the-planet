import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import CheckBoxComponent from '@/components/test/layouts/CheckBoxComponent'
import { Trait, Layout, Score } from '@/types'

describe('CheckBoxComponent', () => {
  // Mock props
  const mockLayout: Layout<Trait> = {
    id: 'layout1',
    level: 'beginner',
    index: 0,
    question: {
      type: 'Multiple choice',
      key: 'q1',
      text: 'Select two morphological descriptions that match serotiny',
      options: [
        'Woody cones/fruits that remain closed on plant for years',
        'Plants resist uprooting even in loose soil',
        'Seeds released en masse after fire',
        'May have visible woody root crown',
      ],
    },
    collection: {
      id: '1',
      type: 'trait',
      name: 'Mediterranean Adaptations',
      items: [
        {
          morphology: [
            'Woody cones/fruits that remain closed on plant for years',
            'Cones often have thick, resinous seals',
            'Seeds released en masse after fire',
            'Plant may have mixture of different aged cones/fruits',
          ],
        } as Trait,
      ],
    },
    item: {
      morphology: [
        'Woody cones/fruits that remain closed on plant for years',
        'Cones often have thick, resinous seals',
        'Seeds released en masse after fire',
        'Plant may have mixture of different aged cones/fruits',
      ],
    } as Trait,
    isActive: true,
  }

  const mockOnSubmit = vi.fn((): Score => {
    return {
      isCorrect: true,
      questionCount: 10,
      correctCount: 5,
      incorrectCount: 2,
    }
  })

  const mockQuestionProgressText = 'Question 1 of 10'

  // Clean up after each test
  beforeEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('renders the component with question text', () => {
    render(
      <CheckBoxComponent
        layout={mockLayout}
        onSubmit={mockOnSubmit}
        questionProgressText={mockQuestionProgressText}
      />
    )

    expect(
      screen.getByText(
        'Select two morphological descriptions that match serotiny'
      )
    ).toBeInTheDocument()
    expect(screen.getByText('Question 1 of 10')).toBeInTheDocument()
  })
})
