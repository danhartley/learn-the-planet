import React from 'react'
import { expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ScoreDisplayNotification } from './ScoreDisplayNotification'
import '@testing-library/jest-dom'

describe('ScoreDisplayNotification', () => {
  it('should render without crashing', () => {
    const { container } = render(
      <ScoreDisplayNotification
        isCorrect={true}
        history={[]}
        isVisibleClassName="visible"
      />
    )
    expect(container).toBeInTheDocument()
  })

  it('should display success message when answer is correct', () => {
    render(
      <ScoreDisplayNotification
        isCorrect={true}
        history={[1]}
        isVisibleClassName="visible"
      />
    )

    expect(screen.getByText('That is the correct answer')).toBeInTheDocument()
  })

  it('should display failure message when answer is incorrect', () => {
    render(
      <ScoreDisplayNotification
        isCorrect={false}
        history={[1]}
        isVisibleClassName="visible"
      />
    )

    expect(screen.getByText("That's not the right answer")).toBeInTheDocument()
  })

  it('should have correct CSS class when answer is correct', () => {
    render(
      <ScoreDisplayNotification
        isCorrect={true}
        history={[1]}
        isVisibleClassName="visible"
      />
    )

    const messageElement = screen.getByText('That is the correct answer')
    expect(messageElement).toHaveClass('correct')
    expect(messageElement).not.toHaveClass('incorrect')
  })

  it('should have incorrect CSS class when answer is incorrect', () => {
    render(
      <ScoreDisplayNotification
        isCorrect={false}
        history={[1]}
        isVisibleClassName="visible"
      />
    )

    const messageElement = screen.getByText("That's not the right answer")
    expect(messageElement).toHaveClass('incorrect')
    expect(messageElement).not.toHaveClass('correct')
  })

  it('should start with hidden notification class', () => {
    const { container } = render(
      <ScoreDisplayNotification
        isCorrect={true}
        history={[]}
        isVisibleClassName="visible"
      />
    )

    const notification = container.querySelector('.notification')
    expect(notification).toHaveClass('hidden')
  })

  it('should apply visible class when history has items', () => {
    const { container } = render(
      <ScoreDisplayNotification
        isCorrect={true}
        history={[1]}
        isVisibleClassName="visible"
      />
    )

    const notification = container.querySelector('.notification')
    expect(notification).toHaveClass('visible')
    expect(notification).not.toHaveClass('hidden')
  })

  it('should apply hidden class when isVisibleClassName is "hidden"', () => {
    const { container } = render(
      <ScoreDisplayNotification
        isCorrect={true}
        history={[1]}
        isVisibleClassName="hidden"
      />
    )

    const notification = container.querySelector('.notification')
    expect(notification).toHaveClass('hidden')
    expect(notification).not.toHaveClass('visible')
  })

  it('should correctly toggle between visibility classes when isVisibleClassName changes', () => {
    const { rerender, container } = render(
      <ScoreDisplayNotification
        isCorrect={true}
        history={[1]}
        isVisibleClassName="visible"
      />
    )

    // Check initial render with "visible" className
    const notification = container.querySelector('.notification')
    expect(notification).toHaveClass('visible')
    expect(notification).not.toHaveClass('hidden')

    // Re-render with "hidden" className
    rerender(
      <ScoreDisplayNotification
        isCorrect={true}
        history={[1]}
        isVisibleClassName="hidden"
      />
    )

    // Verify classes toggled correctly
    expect(notification).toHaveClass('hidden')
    expect(notification).not.toHaveClass('visible')
  })
})
