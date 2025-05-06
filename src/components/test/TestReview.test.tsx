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
    expect(screen.getByText('Test review')).toBeInTheDocument()
    expect(screen.getByText('Repeat the test in full')).toBeInTheDocument()
    expect(screen.getByText('Repeat failed questions only')).toBeInTheDocument()
    expect(screen.getByText('Start new test')).toBeInTheDocument()

    // Verify default selection
    const incorrectOnlyRadio = screen.getByLabelText(
      'Repeat failed questions only'
    ) as HTMLInputElement
    const allQuestionsRadio = screen.getByLabelText(
      'Repeat the test in full'
    ) as HTMLInputElement

    expect(allQuestionsRadio.checked).toBe(true)
    expect(incorrectOnlyRadio.checked).toBe(false)
  })

  it('changes selection when a different radio option is clicked', () => {
    render(<TestReview />)

    const allQuestionsRadio = screen.getByLabelText('Repeat the test in full')

    // Click on the "Repeat the test in full" option
    fireEvent.click(allQuestionsRadio)

    // Verify the selection changed
    expect((allQuestionsRadio as HTMLInputElement).checked).toBe(true)
    expect(
      (
        screen.getByLabelText(
          'Repeat failed questions only'
        ) as HTMLInputElement
      ).checked
    ).toBe(false)
  })

  it('calls startRetest with the correct option and navigates to test page when button is clicked', () => {
    render(<TestReview />)

    // Default is "incorrect-only"
    const startButton = screen.getByText('Start new test')
    fireEvent.click(startButton)

    // Verify the startRetest was called with the default option
    expect(mockStartRetest).toHaveBeenCalledWith('repeat-the-test-in-full')
    expect(mockPush).toHaveBeenCalledWith('/test')
  })

  it('calls startRetest with "all" when that option is selected', () => {
    render(<TestReview />)

    // Change to "all" option
    const allQuestionsRadio = screen.getByLabelText('Repeat the test in full')
    fireEvent.click(allQuestionsRadio)

    // Click the start button
    const startButton = screen.getByText('Start new test')
    fireEvent.click(startButton)

    // Verify the startRetest was called with "all"
    expect(mockStartRetest).toHaveBeenCalledWith('repeat-the-test-in-full')
    expect(mockPush).toHaveBeenCalledWith('/test')
  })

  it('maintains selected option across re-renders', () => {
    const { rerender } = render(<TestReview />)

    // Change to "all" option
    const allQuestionsRadio = screen.getByLabelText('Repeat the test in full')
    fireEvent.click(allQuestionsRadio)

    // Re-render the component
    rerender(<TestReview />)

    // Verify the selection is maintained
    expect(
      (screen.getByLabelText('Repeat the test in full') as HTMLInputElement)
        .checked
    ).toBe(true)
    expect(
      (
        screen.getByLabelText(
          'Repeat failed questions only'
        ) as HTMLInputElement
      ).checked
    ).toBe(false)
  })
})

describe('TestReview Component when all answers are correct', () => {
  const mockStartRetest = vi.fn()
  const mockPush = vi.fn()
  const mockCollection = { id: '123', name: 'Test Collection' }

  beforeEach(() => {
    vi.clearAllMocks()

    // Setup mock return values with isEveryAnswerCorrect = true scenario
    vi.mocked(useTestPlanner).mockReturnValue({
      startRetest: mockStartRetest,
      testHistory: [{ isCorrect: true }, { isCorrect: true }], // All answers correct
      currentLayout: { collection: mockCollection },
    } as any)

    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
    } as any)
  })

  it('renders only the "repeat the test in full" option when all answers are correct', () => {
    render(<TestReview />)

    // Verify component renders with collection name
    expect(screen.getByText('Test Collection')).toBeInTheDocument()

    // Verify only one radio option is available
    expect(screen.getByLabelText('Repeat the test in full')).toBeInTheDocument()
    expect(
      screen.queryByLabelText('Repeat failed questions only')
    ).not.toBeInTheDocument()

    // Verify the available option is selected by default
    const fullTestRadio = screen.getByLabelText(
      'Repeat the test in full'
    ) as HTMLInputElement
    expect(fullTestRadio.checked).toBe(true)
  })

  it('starts a new test with the correct option when button is clicked', () => {
    render(<TestReview />)

    // Click the start button
    const startButton = screen.getByText('Start new test')
    fireEvent.click(startButton)

    // Verify the startRetest was called with the only available option
    expect(mockStartRetest).toHaveBeenCalledWith('repeat-the-test-in-full')
    expect(mockPush).toHaveBeenCalledWith('/test')
  })

  it('renders the collection link correctly', () => {
    render(<TestReview />)

    const collectionLink = screen.getByText('Collection notes')
    expect(collectionLink).toHaveAttribute('href', '/collection/123')
  })
})
