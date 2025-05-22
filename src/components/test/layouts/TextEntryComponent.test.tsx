import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import TextEntryComponent from '@/components/test/layouts/TextEntryComponent'
import { Layout, LearningItem, TextEntryQuestion, Score } from '@/types'

describe('TextEntryComponent', () => {
  const mockOnSubmit = vi.fn()

  const createMockLayout = (
    questionData: Partial<TextEntryQuestion> = {}
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
      key: 'test-question',
      text: 'What is your answer?',
      hint: 'Enter your answer here',
      contentType: 'text-input',
      type: 'text-entry',
      ...questionData,
    } as TextEntryQuestion,
  })

  beforeEach(() => {
    mockOnSubmit.mockReset()
  })

  it('renders the component with question text and progress', () => {
    const layout = createMockLayout()

    render(
      <TextEntryComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    expect(screen.getByText('text-input')).toBeInTheDocument()
    expect(screen.getByText('What is your answer?')).toBeInTheDocument()
    expect(screen.getByText('Question 1 of 5')).toBeInTheDocument()
  })

  it('uses question.type as fallback when contentType is not available', () => {
    const layout = createMockLayout({ contentType: undefined })

    render(
      <TextEntryComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    expect(screen.getByText('text-entry')).toBeInTheDocument()
  })

  it('renders form with label and input', () => {
    const layout = createMockLayout()

    render(
      <TextEntryComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    expect(screen.getByLabelText('Enter your answer here')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Submit answer' })
    ).toBeInTheDocument()
  })

  it('focuses on input when component mounts', () => {
    const layout = createMockLayout()

    render(
      <TextEntryComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    const input = screen.getByRole('textbox')
    expect(input).toHaveFocus()
  })

  it('updates input value when typing', () => {
    const layout = createMockLayout()

    render(
      <TextEntryComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test answer' } })

    expect(input).toHaveValue('test answer')
  })

  it('disables submit button when input is empty', () => {
    const layout = createMockLayout()

    render(
      <TextEntryComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    const submitButton = screen.getByRole('button', { name: 'Submit answer' })
    expect(submitButton).toBeDisabled()
  })

  it('disables submit button when input contains only whitespace', () => {
    const layout = createMockLayout()

    render(
      <TextEntryComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    const input = screen.getByRole('textbox')
    const submitButton = screen.getByRole('button', { name: 'Submit answer' })

    fireEvent.change(input, { target: { value: '   ' } })
    expect(submitButton).toBeDisabled()
  })

  it('enables submit button when input has valid text', () => {
    const layout = createMockLayout()

    render(
      <TextEntryComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    const input = screen.getByRole('textbox')
    const submitButton = screen.getByRole('button', { name: 'Submit answer' })

    fireEvent.change(input, { target: { value: 'valid answer' } })
    expect(submitButton).not.toBeDisabled()
  })

  it('calls onSubmit with trimmed answer when form is submitted', () => {
    const layout = createMockLayout()
    mockOnSubmit.mockReturnValue({ isCorrect: true } as Score)

    render(
      <TextEntryComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    const input = screen.getByRole('textbox')
    const form = screen.getByRole('textbox').closest('form')

    fireEvent.change(input, { target: { value: '  test answer  ' } })
    fireEvent.submit(form!)

    expect(mockOnSubmit).toHaveBeenCalledWith('test answer')
    expect(mockOnSubmit).toHaveBeenCalledTimes(1)
  })

  it('prevents default form submission', () => {
    const layout = createMockLayout()
    mockOnSubmit.mockReturnValue({ isCorrect: true } as Score)

    render(
      <TextEntryComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    const input = screen.getByRole('textbox')
    const form = screen.getByRole('textbox').closest('form')

    fireEvent.change(input, { target: { value: 'test answer' } })

    const submitEvent = new Event('submit', { bubbles: true, cancelable: true })
    const preventDefaultSpy = vi.spyOn(submitEvent, 'preventDefault')

    form!.dispatchEvent(submitEvent)

    expect(preventDefaultSpy).toHaveBeenCalled()
  })

  it('does not submit when answer is empty or whitespace only', () => {
    const layout = createMockLayout()

    render(
      <TextEntryComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    const form = screen.getByRole('textbox').closest('form')

    // Try to submit with empty input
    fireEvent.submit(form!)
    expect(mockOnSubmit).not.toHaveBeenCalled()

    // Try to submit with whitespace only
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '   ' } })
    fireEvent.submit(form!)
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('applies correct styling when answer is correct', () => {
    const layout = createMockLayout()
    mockOnSubmit.mockReturnValue({ isCorrect: true } as Score)

    const { container } = render(
      <TextEntryComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    const input = screen.getByRole('textbox')
    const form = screen.getByRole('textbox').closest('form')

    fireEvent.change(input, { target: { value: 'correct answer' } })
    fireEvent.submit(form!)

    const formRow = container.querySelector('.form-row')
    expect(formRow).toHaveClass('bg-correct')
  })

  it('applies incorrect styling when answer is wrong', () => {
    const layout = createMockLayout()
    mockOnSubmit.mockReturnValue({ isCorrect: false } as Score)

    const { container } = render(
      <TextEntryComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    const input = screen.getByRole('textbox')
    const form = screen.getByRole('textbox').closest('form')

    fireEvent.change(input, { target: { value: 'wrong answer' } })
    fireEvent.submit(form!)

    const formRow = container.querySelector('.form-row')
    expect(formRow).toHaveClass('bg-incorrect')
  })

  it('disables submit button after answer is submitted', () => {
    const layout = createMockLayout()
    mockOnSubmit.mockReturnValue({ isCorrect: true } as Score)

    render(
      <TextEntryComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    const input = screen.getByRole('textbox')
    const form = screen.getByRole('textbox').closest('form')
    const submitButton = screen.getByRole('button', { name: 'Submit answer' })

    fireEvent.change(input, { target: { value: 'test answer' } })
    fireEvent.submit(form!)

    expect(submitButton).toBeDisabled()
  })

  it('resets form when question key changes', async () => {
    const layout1 = createMockLayout({ key: 'question1' })

    const { rerender } = render(
      <TextEntryComponent
        layout={layout1}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'some answer' } })
    expect(input).toHaveValue('some answer')

    // Change to new question
    const layout2 = createMockLayout({ key: 'question2' })
    rerender(
      <TextEntryComponent
        layout={layout2}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 2 of 5"
      />
    )

    await waitFor(() => {
      expect(input).toHaveValue('')
      expect(input).toHaveFocus()
    })
  })

  it('resets styling when question changes', async () => {
    const layout1 = createMockLayout({ key: 'question1' })
    mockOnSubmit.mockReturnValue({ isCorrect: false } as Score)

    const { container, rerender } = render(
      <TextEntryComponent
        layout={layout1}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    // Submit wrong answer to get incorrect styling
    const input = screen.getByRole('textbox')
    const form = screen.getByRole('textbox').closest('form')
    fireEvent.change(input, { target: { value: 'wrong answer' } })
    fireEvent.submit(form!)

    let formRow = container.querySelector('.form-row')
    expect(formRow).toHaveClass('bg-incorrect')

    // Change to new question
    const layout2 = createMockLayout({ key: 'question2' })
    rerender(
      <TextEntryComponent
        layout={layout2}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 2 of 5"
      />
    )

    await waitFor(() => {
      formRow = container.querySelector('.form-row')
      expect(formRow).not.toHaveClass('bg-incorrect')
      expect(formRow).toHaveClass('text-input')
    })
  })

  it('sets correct data attributes on the section element', () => {
    const layout = createMockLayout()

    const { container } = render(
      <TextEntryComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    const section = container.querySelector('section')
    expect(section).toHaveClass('group-block')
    expect(section).toHaveAttribute('aria-labelledby', 'text-entry')
    expect(section).toHaveAttribute('data-type', 'test-collection')
  })

  it('handles input with required attribute', () => {
    const layout = createMockLayout()

    render(
      <TextEntryComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    const input = screen.getByRole('textbox')
    expect(input).toBeRequired()
    expect(input).toHaveAttribute('id', 'answer')
    expect(input).toHaveAttribute('type', 'text')
  })

  it('applies initial form-row class with contentType', () => {
    const layout = createMockLayout({ contentType: 'custom-input' })

    const { container } = render(
      <TextEntryComponent
        layout={layout}
        onSubmit={mockOnSubmit}
        questionProgressText="Question 1 of 5"
      />
    )

    const formRow = container.querySelector('.form-row')
    expect(formRow).toHaveClass('form-row', 'custom-input')
  })

  it('handles case where answerInputRef is null', () => {
    const layout = createMockLayout()

    // Mock useRef to return null
    const originalUseRef = React.useRef
    vi.spyOn(React, 'useRef').mockReturnValueOnce({ current: null })

    expect(() => {
      render(
        <TextEntryComponent
          layout={layout}
          onSubmit={mockOnSubmit}
          questionProgressText="Question 1 of 5"
        />
      )
    }).not.toThrow()

    // Restore original useRef
    React.useRef = originalUseRef
  })
})
