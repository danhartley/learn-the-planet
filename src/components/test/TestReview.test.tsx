import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TestReview from './TestReview'
import { useTestPlanner } from '@/hooks/useTestPlanner'
import { useRouter } from 'next/navigation'

// Mock the hooks
vi.mock('@/hooks/useTestPlanner', () => ({
  useTestPlanner: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}))

describe('TestReview Component', () => {
  const mockStartRetest = vi.fn()
  const mockPush = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    // Setup mock return values
    vi.mocked(useTestPlanner).mockReturnValue({
      startRetest: mockStartRetest,
      // Include other properties the hook might return as needed
    } as any)

    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      // Include other properties the router might return as needed
    } as any)
  })

  it('renders the component with default radio option selected', () => {
    render(<TestReview />)

    // Verify component renders correctly
    expect(screen.getByText('Select test mode:')).toBeInTheDocument()
    expect(screen.getByText('All questions')).toBeInTheDocument()
    expect(screen.getByText('Failed questions only')).toBeInTheDocument()
    expect(screen.getByText('Start new test')).toBeInTheDocument()

    // Verify default selection
    const incorrectOnlyRadio = screen.getByLabelText(
      'Failed questions only'
    ) as HTMLInputElement
    const allQuestionsRadio = screen.getByLabelText(
      'All questions'
    ) as HTMLInputElement

    expect(incorrectOnlyRadio.checked).toBe(true)
    expect(allQuestionsRadio.checked).toBe(false)
  })

  it('changes selection when a different radio option is clicked', () => {
    render(<TestReview />)

    const allQuestionsRadio = screen.getByLabelText('All questions')

    // Click on the "All questions" option
    fireEvent.click(allQuestionsRadio)

    // Verify the selection changed
    expect((allQuestionsRadio as HTMLInputElement).checked).toBe(true)
    expect(
      (screen.getByLabelText('Failed questions only') as HTMLInputElement)
        .checked
    ).toBe(false)
  })

  it('calls startRetest with the correct option and navigates to test page when button is clicked', () => {
    render(<TestReview />)

    // Default is "incorrect-only"
    const startButton = screen.getByText('Start new test')
    fireEvent.click(startButton)

    // Verify the startRetest was called with the default option
    expect(mockStartRetest).toHaveBeenCalledWith('incorrect-only')
    expect(mockPush).toHaveBeenCalledWith('/test')
  })

  it('calls startRetest with "all" when that option is selected', () => {
    render(<TestReview />)

    // Change to "all" option
    const allQuestionsRadio = screen.getByLabelText('All questions')
    fireEvent.click(allQuestionsRadio)

    // Click the start button
    const startButton = screen.getByText('Start new test')
    fireEvent.click(startButton)

    // Verify the startRetest was called with "all"
    expect(mockStartRetest).toHaveBeenCalledWith('all')
    expect(mockPush).toHaveBeenCalledWith('/test')
  })

  it('maintains selected option across re-renders', () => {
    const { rerender } = render(<TestReview />)

    // Change to "all" option
    const allQuestionsRadio = screen.getByLabelText('All questions')
    fireEvent.click(allQuestionsRadio)

    // Re-render the component
    rerender(<TestReview />)

    // Verify the selection is maintained
    expect(
      (screen.getByLabelText('All questions') as HTMLInputElement).checked
    ).toBe(true)
    expect(
      (screen.getByLabelText('Failed questions only') as HTMLInputElement)
        .checked
    ).toBe(false)
  })
})
