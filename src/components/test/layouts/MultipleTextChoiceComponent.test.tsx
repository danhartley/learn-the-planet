import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import MultipleTextChoiceComponent from '@/components/test/layouts/MultipleTextChoiceComponent'
import { Layout, LearningItem, MultipleChoiceQuestion } from '@/types'

describe('MultipleTextChoiceComponent', () => {
  const mockOnSubmit = vi.fn()

  const createMockLayout = (
    options: unknown[],
    questionKey = 'correct-answer'
  ): Layout<LearningItem> => ({
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
      key: questionKey,
      text: 'What is the correct image?',
      options: options,
    } as MultipleChoiceQuestion,
  })

  const mockTextOptions = [
    {
      key: 'option1',
      value: 'Option 1',
    },
    {
      key: 'option2',
      value: 'Option 2',
    },
    {
      key: 'correct-option',
      value: 'correct-answer',
    },
  ]

  beforeEach(() => {
    mockOnSubmit.mockReset()
    vi.clearAllTimers()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('renders the component with question text and progress', () => {
    const layout = createMockLayout(mockTextOptions)

    render(
      <MultipleTextChoiceComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    expect(screen.getByText('Multiple choice')).toBeInTheDocument()
    expect(screen.getByText('Question 1 of 5')).toBeInTheDocument()
  })

  it('renders buttons for all options', () => {
    const layout = createMockLayout(mockTextOptions)

    render(
      <MultipleTextChoiceComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.getByText('Option 2')).toBeInTheDocument()
    expect(screen.getByText('correct-answer')).toBeInTheDocument()
  })

  it('calls onSubmit when an answer is selected', () => {
    const layout = createMockLayout(mockTextOptions)

    render(
      <MultipleTextChoiceComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    fireEvent.click(screen.getByText('Option 1'))

    expect(mockOnSubmit).toHaveBeenCalledWith('Option 1')
    expect(mockOnSubmit).toHaveBeenCalledTimes(1)
  })

  it('trims whitespace from answers before submitting', () => {
    const spacedOptions = [
      {
        key: 'spaced',
        value: '  spaced answer  ',
      },
    ]

    const layout = createMockLayout(spacedOptions)

    render(
      <MultipleTextChoiceComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    fireEvent.click(screen.getByText('spaced answer'))

    expect(mockOnSubmit).toHaveBeenCalledWith('spaced answer')
  })

  it('disables all buttons after an answer is selected', () => {
    const layout = createMockLayout(mockTextOptions)

    render(
      <MultipleTextChoiceComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    const button1 = screen.getByText('Option 1').closest('button')
    const button2 = screen.getByText('Option 2').closest('button')
    const button3 = screen.getByText('correct-answer').closest('button')

    expect(button1).not.toBeDisabled()
    expect(button2).not.toBeDisabled()
    expect(button3).not.toBeDisabled()

    fireEvent.click(screen.getByText('Option 1'))

    expect(button1).toBeDisabled()
    expect(button2).toBeDisabled()
    expect(button3).toBeDisabled()
  })

  it('adds correct styling when correct answer is selected', () => {
    const layout = createMockLayout(mockTextOptions)

    render(
      <MultipleTextChoiceComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    const correctButton = screen.getByText('correct-answer').closest('button')
    fireEvent.click(screen.getByText('correct-answer'))

    expect(correctButton).toHaveClass('bg-correct')
  })

  it('adds incorrect styling and shows correct answer when wrong answer is selected', () => {
    const layout = createMockLayout(mockTextOptions)

    render(
      <MultipleTextChoiceComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    const incorrectButton = screen.getByText('Option 1').closest('button')
    const correctButton = screen.getByText('correct-answer').closest('button')

    fireEvent.click(screen.getByText('Option 1'))

    expect(incorrectButton).toHaveClass('bg-incorrect')
    expect(correctButton).toHaveClass('bg-correct')
  })

  it.skip('removes styling after timeout', async () => {
    const layout = createMockLayout(mockTextOptions)

    render(
      <MultipleTextChoiceComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    const incorrectButton = screen.getByText('Option 1').closest('button')
    const correctButton = screen.getByText('correct-answer').closest('button')

    fireEvent.click(screen.getByText('Option 1'))

    expect(incorrectButton).toHaveClass('bg-incorrect')
    expect(correctButton).toHaveClass('bg-correct')

    // Fast-forward time by 2000ms
    vi.advanceTimersByTime(2000)

    await waitFor(() => {
      expect(incorrectButton).not.toHaveClass('bg-incorrect')
      expect(correctButton).not.toHaveClass('bg-correct')
    })
  })

  it('resets answered state when question key changes', () => {
    const layout1 = createMockLayout(mockTextOptions, 'question1')

    const { rerender } = render(
      <MultipleTextChoiceComponent
        layout={layout1}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    // Answer first question
    fireEvent.click(screen.getByText('Option 1'))

    const button = screen.getByText('Option 1').closest('button')
    expect(button).toBeDisabled()

    // Change to new question
    const layout2 = createMockLayout(mockTextOptions, 'question2')
    rerender(
      <MultipleTextChoiceComponent
        layout={layout2}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 2 of 5"
      />
    )

    // Buttons should be enabled again
    const newButton = screen.getByText('Option 1').closest('button')
    expect(newButton).not.toBeDisabled()
  })

  it('sets correct data attributes on the section element', () => {
    const layout = createMockLayout(mockTextOptions)

    const { container } = render(
      <MultipleTextChoiceComponent
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
        <MultipleTextChoiceComponent
          layout={invalidLayout}
          onSubmit={mockOnSubmit}
          questionProgressText="Question 1 of 5"
        />
      )
    }).toThrow('Invalid question type: options are missing.')
  })

  it('handles buttons with correct id and value attributes', () => {
    const layout = createMockLayout(mockTextOptions)

    render(
      <MultipleTextChoiceComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    const button1 = screen.getByText('Option 1').closest('button')
    const button2 = screen.getByText('correct-answer').closest('button')

    expect(button1).toHaveAttribute('id', 'option1')
    expect(button1).toHaveAttribute('value', 'Option 1')
    expect(button2).toHaveAttribute('id', 'correct-option')
    expect(button2).toHaveAttribute('value', 'correct-answer')
  })

  it('handles case where correct option key is not found', () => {
    const optionsWithoutMatchingKey = [
      {
        key: 'option1',
        value: 'Option 1',
      },
      {
        key: 'option2',
        value: 'Option 2',
      },
    ]

    const layout = createMockLayout(
      optionsWithoutMatchingKey,
      'non-existent-answer'
    )

    render(
      <MultipleTextChoiceComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    const incorrectButton = screen.getByText('Option 1').closest('button')

    // This should not throw an error even though correct key doesn't exist
    fireEvent.click(screen.getByText('Option 1'))

    expect(incorrectButton).toHaveClass('bg-incorrect')
    expect(mockOnSubmit).toHaveBeenCalledWith('Option 1')
  })

  it('renders empty options grid when no options provided', () => {
    const layout = createMockLayout([])

    const { container } = render(
      <MultipleTextChoiceComponent
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
