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
  }

  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('renders with No Score message when lastScore is null', () => {
    // Set up the mock to return no score
    vi.mocked(useTestPlanner).mockReturnValue(defaultMockHook)

    render(<ScoreDisplay />)

    expect(screen.getByText('No score')).toBeInTheDocument()
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
      screen.getByRole('heading', { name: 'Collection score' })
    ).toBeInTheDocument()
    expect(screen.getByText('Correct count')).toBeInTheDocument()
    expect(screen.getByText('7')).toBeInTheDocument()
    expect(screen.getByText('Incorrect count')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('Question count')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('Last answered')).toBeInTheDocument()
    expect(screen.getByText('true')).toBeInTheDocument()
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

    expect(screen.getByText('Correct count')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('Incorrect count')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('Question count')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('Last answered')).toBeInTheDocument()
    expect(screen.getByText('false')).toBeInTheDocument()
  })
})
