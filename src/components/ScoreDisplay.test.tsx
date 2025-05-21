import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ScoreDisplay } from './ScoreDisplay'
import { useTestPlanner } from '@/hooks/useTestPlanner'
import type { HistoryItem } from '@/types'

// Mock the hook
vi.mock('@/hooks/useTestPlanner', () => ({
  useTestPlanner: vi.fn(),
}))

// Create a helper function to provide consistent mock values
function createTestPlannerMock(overrides = {}) {
  return {
    currentLayout: null,
    testHistory: [],
    testState: null,
    // Add mock implementations for all required methods
    startTest: vi.fn(),
    startRetest: vi.fn(),
    markAnswer: vi.fn(),
    moveToNextQuestion: vi.fn().mockReturnValue(false),
    setLayouts: vi.fn(),
    updateState: vi.fn(),
    answerQuestion: vi.fn(),
    // Apply any overrides
    ...overrides,
  } as unknown as ReturnType<typeof useTestPlanner>
}

describe('ScoreDisplay Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the default progress bar when no currentLayout is available', () => {
    // Mock the return value of useTestPlanner
    vi.mocked(useTestPlanner).mockReturnValue(
      createTestPlannerMock({
        currentLayout: null,
        testHistory: [],
        testState: null,
      })
    )

    render(<ScoreDisplay />)

    // Check that the component renders with default progress
    expect(screen.getByText('Test score')).toBeInTheDocument()

    const progressBar = screen.getByRole('progressbar') as HTMLProgressElement
    expect(progressBar).toBeInTheDocument()
    expect(progressBar.max).toBe(10)
    expect(progressBar.value).toBe(0)
    expect(
      screen.getByText('Your answers and score will appear here.')
    ).toBeInTheDocument()
  })

  it('renders progress based on currentLayout and testState', () => {
    // Mock the return value of useTestPlanner with test data
    vi.mocked(useTestPlanner).mockReturnValue(
      createTestPlannerMock({
        currentLayout: { index: 3 },
        testHistory: [],
        testState: { layoutCount: 5, isEndOfTest: false },
      })
    )

    render(<ScoreDisplay />)

    // Check that the component renders with correct progress
    expect(screen.getByText('Test progress')).toBeInTheDocument()

    const progressBar = screen.getByRole('progressbar') as HTMLProgressElement
    expect(progressBar).toBeInTheDocument()
    expect(progressBar.max).toBe(5)
    expect(progressBar.value).toBe(3)
  })

  it('uses layoutCount as progress value when at end of test', () => {
    // Mock the return value of useTestPlanner for end of test
    vi.mocked(useTestPlanner).mockReturnValue(
      createTestPlannerMock({
        currentLayout: { index: 3 },
        testHistory: [],
        testState: { layoutCount: 5, isEndOfTest: true },
      })
    )

    render(<ScoreDisplay />)

    const progressBar = screen.getByRole('progressbar') as HTMLProgressElement
    expect(progressBar.max).toBe(5)
    expect(progressBar.value).toBe(5) // Should be layoutCount at end of test
  })

  it('displays correct feedback based on test history', () => {
    // Define the type for history items
    type TestItem = {
      id: string
      question: string
      answer: string
    }

    // Mock the return value of useTestPlanner with test history
    vi.mocked(useTestPlanner).mockReturnValue(
      createTestPlannerMock({
        currentLayout: { index: 3 },
        testHistory: [
          { id: '1', isCorrect: true, question: 'Q1', answer: 'A1' },
          { id: '2', isCorrect: false, question: 'Q2', answer: 'A2' },
          { id: '3', isCorrect: true, question: 'Q3', answer: 'A3' },
        ] as HistoryItem<TestItem>[],
        testState: { layoutCount: 5, isEndOfTest: false },
      })
    )

    render(<ScoreDisplay<TestItem> />)

    // Check the feedback text
    expect(
      screen.getByText("You've answered 2 out of 3 correctly.")
    ).toBeInTheDocument()
  })

  it('renders history items with correct styling', () => {
    // Define the type for history items
    type TestItem = {
      id: string
      question: string
      answer: string
    }

    const testHistory = [
      { id: '1', isCorrect: true, question: 'Question 1', answer: 'Answer 1' },
      { id: '2', isCorrect: false, question: 'Question 2', answer: 'Answer 2' },
    ] as HistoryItem<TestItem>[]

    // Mock the return value of useTestPlanner with test history
    vi.mocked(useTestPlanner).mockReturnValue(
      createTestPlannerMock({
        currentLayout: { index: 3 },
        testHistory,
        testState: { layoutCount: 5, isEndOfTest: false },
      })
    )

    render(<ScoreDisplay<TestItem> />)

    // Check for history items
    expect(screen.getByText('Question 1')).toBeInTheDocument()
    expect(screen.getByText('(Answer 2)')).toBeInTheDocument()

    // Check that the correct CSS classes are applied
    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(2)

    // First item should have 'correct' class
    expect(listItems[0].querySelector('.correct')).toBeInTheDocument()

    // Second item should have 'incorrect' class
    expect(listItems[1].querySelector('.incorrect')).toBeInTheDocument()
  })

  it('renders properly with undefined testState', () => {
    // Mock the return value of useTestPlanner with undefined testState
    vi.mocked(useTestPlanner).mockReturnValue(
      createTestPlannerMock({
        currentLayout: { index: 1 },
        testHistory: [],
        testState: undefined,
      })
    )

    // This should not throw an error
    expect(() => render(<ScoreDisplay />)).not.toThrow()
  })
})
