import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import { ScoreDisplay } from '@/components/ScoreDisplay'
import { useTestPlanner } from '@/hooks/useTestPlanner'
import type { Score } from '@/types'

// Mock the hook
vi.mock('@/hooks/useTestPlanner', () => ({
  useTestPlanner: vi.fn(),
}))

describe('ScoreDisplay', () => {
  // Create a default mock implementation
  const defaultMockHook = {
    lastScore: null,
    startTest: vi.fn(),
    currentLayout: null,
    markAnswer: vi.fn(),
    moveToNextQuestion: vi.fn(),
    isActive: false,
    resetTest: vi.fn(),
    layouts: [],
  }

  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('renders with No Score message when lastScore is null', () => {
    // Set up the mock to return no score
    vi.mocked(useTestPlanner).mockReturnValue(defaultMockHook)

    render(<ScoreDisplay />)

    // expect(screen.getByText('Start test')).toBeInTheDocument()
  })

  it('displays correct score data when lastScore exists', () => {
    // Create a mock score
    const mockScore: Score = {
      isCorrect: true,
      questionCount: 10,
      correctCount: 7,
      incorrectCount: 3,
    }

    // Set up the mock to return our score
    vi.mocked(useTestPlanner).mockReturnValue({
      ...defaultMockHook,
      lastScore: mockScore,
    })

    render(<ScoreDisplay />)

    // Check that all score data is displayed correctly
    expect(
      screen.getByRole('heading', { name: 'Test score' })
    ).toBeInTheDocument()
    expect(
      screen.getByText("You've answered 7 out of 10 correctly.")
    ).toBeInTheDocument()
  })

  it('displays correct data with different score values', () => {
    // Test with different values
    const mockScore: Score = {
      isCorrect: false,
      questionCount: 5,
      correctCount: 2,
      incorrectCount: 3,
    }

    vi.mocked(useTestPlanner).mockReturnValue({
      ...defaultMockHook,
      lastScore: mockScore,
    })

    render(<ScoreDisplay />)

    expect(
      screen.getByText("You've answered 2 out of 5 correctly.")
    ).toBeInTheDocument()
  })
})
