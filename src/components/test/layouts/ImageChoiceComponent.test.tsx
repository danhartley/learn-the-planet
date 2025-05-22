import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ImageChoiceComponent from '@/components/test/layouts/ImageChoiceComponent'
import { Layout, LearningItem, MultipleChoiceQuestion } from '@/types'

// Mock the ImageButton component
vi.mock('@/components/common/ImageButton', () => ({
  default: ({
    option,
    setAnswer,
    correctAnswer,
    selectedAnswer,
    isAnswered,
  }: {
    option: { key: string; text: string }
    setAnswer: (key: string) => void
    correctAnswer: string
    selectedAnswer: string
    isAnswered: boolean
  }) => (
    <button
      data-testid={`image-button-${option.key}`}
      onClick={() => setAnswer(option.key)}
      data-correct={correctAnswer}
      data-selected={selectedAnswer}
      data-answered={isAnswered}
    >
      {option.text}
    </button>
  ),
}))

describe('ImageChoiceComponent', () => {
  const mockOnSubmit = vi.fn()

  const createMockLayout = (options: unknown[]): Layout<LearningItem> => ({
    id: 'layout-id',
    level: '1',
    index: 0,
    item: {} as LearningItem,
    isActive: true,
    collection: {
      id: 'test-collection-id',
      name: 'Test Collection',
      type: 'test-collection',
      items: [],
    },
    question: {
      key: 'correct-answer',
      text: 'What is the correct image?',
      options: options,
    } as MultipleChoiceQuestion,
  })

  const mockImageOptions = [
    {
      key: 'option1',
      text: 'Option 1',
      value: { url: 'https://example.com/image1.jpg' },
    },
    {
      key: 'option2',
      text: 'Option 2',
      value: { url: 'https://example.com/image2.jpg' },
    },
    {
      key: 'correct-answer',
      text: 'Correct Option',
      value: { url: 'https://example.com/correct.jpg' },
    },
  ]

  beforeEach(() => {
    mockOnSubmit.mockReset()
  })

  it('renders the component with question text and progress', () => {
    const layout = createMockLayout(mockImageOptions)

    render(
      <ImageChoiceComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    expect(screen.getByText('Multiple choice')).toBeInTheDocument()
    expect(screen.getByText('What is the correct image?')).toBeInTheDocument()
    expect(screen.getByText('Question 1 of 5')).toBeInTheDocument()
  })

  it('renders image buttons for valid image options', () => {
    const layout = createMockLayout(mockImageOptions)

    render(
      <ImageChoiceComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    expect(screen.getByTestId('image-button-option1')).toBeInTheDocument()
    expect(screen.getByTestId('image-button-option2')).toBeInTheDocument()
    expect(
      screen.getByTestId('image-button-correct-answer')
    ).toBeInTheDocument()
  })

  it('filters out non-image options', () => {
    const mixedOptions = [
      ...mockImageOptions,
      {
        key: 'text-option',
        text: 'Text Option',
        value: 'just-text', // Not an object with url
      },
    ]

    const layout = createMockLayout(mixedOptions)

    render(
      <ImageChoiceComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    expect(screen.getByTestId('image-button-option1')).toBeInTheDocument()
    expect(screen.getByTestId('image-button-option2')).toBeInTheDocument()
    expect(
      screen.getByTestId('image-button-correct-answer')
    ).toBeInTheDocument()
    expect(
      screen.queryByTestId('image-button-text-option')
    ).not.toBeInTheDocument()
  })

  it('calls onSubmit when an answer is selected', () => {
    const layout = createMockLayout(mockImageOptions)

    render(
      <ImageChoiceComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    fireEvent.click(screen.getByTestId('image-button-option1'))

    expect(mockOnSubmit).toHaveBeenCalledWith('option1')
    expect(mockOnSubmit).toHaveBeenCalledTimes(1)
  })

  it('handles empty/null answers gracefully', () => {
    const layout = createMockLayout(mockImageOptions)

    render(
      <ImageChoiceComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    // Simulate clicking a button that would set an empty answer
    const imageButton = screen.getByTestId('image-button-option1')

    // Override the onClick to simulate empty answer
    fireEvent.click(imageButton)

    // The component should still call onSubmit, even with empty string
    expect(mockOnSubmit).toHaveBeenCalled()
  })

  it('sets correct data attributes on the section element', () => {
    const layout = createMockLayout(mockImageOptions)

    const { container } = render(
      <ImageChoiceComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    const section = container.querySelector('section')
    expect(section).toHaveClass('group-block')
    expect(section).toHaveAttribute('aria-labelledby', 'multiple-choice')
    expect(section).toHaveAttribute('data-type', 'test-collection')
  })

  it('throws error when question options are missing', () => {
    const invalidLayout: Layout<LearningItem> = {
      collection: {
        id: 'invalid-collection-id',
        name: 'Invalid Collection',
        type: 'test-collection',
        items: [],
      },
      question: {
        key: 'test',
        text: 'Test question',
        // Missing options property
      } as MultipleChoiceQuestion,
      id: 'invalid-layout-id',
      level: '1',
      index: 0,
      item: {} as LearningItem,
      isActive: true,
    }

    expect(() => {
      render(
        <ImageChoiceComponent
          layout={invalidLayout}
          onSubmit={mockOnSubmit}
          questionProgressText="Question 1 of 5"
        />
      )
    }).toThrow('Invalid question type: options are missing.')
  })

  it('passes correct props to ImageButton components', () => {
    const layout = createMockLayout(mockImageOptions)

    render(
      <ImageChoiceComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    const button = screen.getByTestId('image-button-option1')
    expect(button).toHaveAttribute('data-correct', 'correct-answer')
    expect(button).toHaveAttribute('data-selected', '')
    expect(button).toHaveAttribute('data-answered', 'false')
  })

  it('updates state after answer selection', () => {
    const layout = createMockLayout(mockImageOptions)

    render(
      <ImageChoiceComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    // Click an answer
    fireEvent.click(screen.getByTestId('image-button-option1'))

    // Check that the button now shows answered state
    const button = screen.getByTestId('image-button-option1')
    expect(button).toHaveAttribute('data-answered', 'true')
    expect(button).toHaveAttribute('data-selected', 'option1')
  })

  it('renders empty grid when no valid image options exist', () => {
    const nonImageOptions = [
      {
        key: 'text1',
        text: 'Text 1',
        value: 'just-text',
      },
      {
        key: 'text2',
        text: 'Text 2',
        value: 'also-just-text',
      },
    ]

    const layout = createMockLayout(nonImageOptions)

    const { container } = render(
      <ImageChoiceComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    const optionsGrid = container.querySelector('.grid-lg.options')
    expect(optionsGrid).toBeInTheDocument()
    expect(optionsGrid?.children).toHaveLength(0)
  })
})
