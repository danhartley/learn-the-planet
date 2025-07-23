import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ScoreDisplay } from './ScoreDisplay'
import { useTestPlanner } from '@/hooks/useTestPlanner'
import type { HistoryItem, Layout } from '@/types'

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
    layouts: [],
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

// Helper function to create mock layouts
function createMockLayout(
  id: string,
  index: number,
  isActive: boolean = true
): Layout<unknown> {
  return {
    id,
    level: 'beginner',
    index,
    question: { type: 'multiple-choice', text: `Question ${id}` },
    collection: { id: 'test-collection', items: [] },
    item: { id: `item-${id}` },
    isActive,
  }
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
        layouts: [],
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

  it('renders progress based on currentLayout, testHistory, and active layouts', () => {
    const mockLayouts = [
      createMockLayout('1', 0, true),
      createMockLayout('2', 1, true),
      createMockLayout('3', 2, true),
      createMockLayout('4', 3, false), // inactive layout
      createMockLayout('5', 4, true),
    ]

    // Mock the return value of useTestPlanner with test data
    vi.mocked(useTestPlanner).mockReturnValue(
      createTestPlannerMock({
        currentLayout: { index: 3 },
        testHistory: [
          { id: '1', isCorrect: true, question: 'Q1', answer: 'A1' },
          { id: '2', isCorrect: false, question: 'Q2', answer: 'A2' },
        ],
        testState: { layoutCount: 5, isEndOfTest: false },
        layouts: mockLayouts,
      })
    )

    render(<ScoreDisplay />)

    // Check that the component renders with correct progress
    expect(screen.getByText('Test progress')).toBeInTheDocument()

    const progressBar = screen.getByRole('progressbar') as HTMLProgressElement
    expect(progressBar).toBeInTheDocument()
    // Should use active layouts count (4 active layouts)
    expect(progressBar.max).toBe(4)
    // Should use testHistory length (2 answered questions)
    expect(progressBar.value).toBe(2)
  })

  it('falls back to testState.layoutCount when no active layouts', () => {
    // Mock the return value of useTestPlanner with empty layouts
    vi.mocked(useTestPlanner).mockReturnValue(
      createTestPlannerMock({
        currentLayout: { index: 3 },
        testHistory: [
          { id: '1', isCorrect: true, question: 'Q1', answer: 'A1' },
        ],
        testState: { layoutCount: 5, isEndOfTest: false },
        layouts: [],
      })
    )

    render(<ScoreDisplay />)

    const progressBar = screen.getByRole('progressbar') as HTMLProgressElement
    expect(progressBar.max).toBe(5) // Should fall back to testState.layoutCount
    expect(progressBar.value).toBe(1) // testHistory.length
  })

  it('displays correct feedback based on test history', () => {
    // Define the type for history items
    type TestItem = {
      id: string
      question: string
      answer: string
    }

    const mockLayouts = [
      createMockLayout('1', 0, true),
      createMockLayout('2', 1, true),
      createMockLayout('3', 2, true),
    ]

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
        layouts: mockLayouts,
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

    const mockLayouts = [
      createMockLayout('1', 0, true),
      createMockLayout('2', 1, true),
    ]

    // Mock the return value of useTestPlanner with test history
    vi.mocked(useTestPlanner).mockReturnValue(
      createTestPlannerMock({
        currentLayout: { index: 3 },
        testHistory,
        testState: { layoutCount: 5, isEndOfTest: false },
        layouts: mockLayouts,
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

  it('handles array answers correctly', () => {
    type TestItem = {
      id: string
      question: string[]
      answer: string[]
    }

    const testHistory = [
      {
        id: '1',
        isCorrect: true,
        question: ['Question 1 Part A', 'Question 1 Part B'],
        answer: ['Answer 1', 'Answer 2'],
      },
    ] as HistoryItem<TestItem>[]

    const mockLayouts = [createMockLayout('1', 0, true)]

    vi.mocked(useTestPlanner).mockReturnValue(
      createTestPlannerMock({
        currentLayout: { index: 1 },
        testHistory,
        testState: { layoutCount: 1, isEndOfTest: false },
        layouts: mockLayouts,
      })
    )

    render(<ScoreDisplay<TestItem> />)

    // Check that array answers are joined with ' - '
    expect(screen.getByText('(Answer 1 - Answer 2)')).toBeInTheDocument()
  })

  it('renders properly with undefined testState', () => {
    const mockLayouts = [createMockLayout('1', 0, true)]

    // Mock the return value of useTestPlanner with undefined testState
    vi.mocked(useTestPlanner).mockReturnValue(
      createTestPlannerMock({
        currentLayout: { index: 1 },
        testHistory: [],
        testState: undefined,
        layouts: mockLayouts,
      })
    )

    // This should not throw an error
    expect(() => render(<ScoreDisplay />)).not.toThrow()
  })

  it('handles empty layouts array gracefully', () => {
    vi.mocked(useTestPlanner).mockReturnValue(
      createTestPlannerMock({
        currentLayout: { index: 1 },
        testHistory: [
          { id: '1', isCorrect: true, question: 'Q1', answer: 'A1' },
        ],
        testState: { layoutCount: 3, isEndOfTest: false },
        layouts: [],
      })
    )

    render(<ScoreDisplay />)

    const progressBar = screen.getByRole('progressbar') as HTMLProgressElement
    // Should fall back to testState.layoutCount when no layouts
    expect(progressBar.max).toBe(3)
    expect(progressBar.value).toBe(1) // testHistory.length
  })
})
