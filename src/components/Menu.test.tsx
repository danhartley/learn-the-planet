import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import { Menu } from '@/components/Menu'

describe('Menu', () => {
  beforeEach(() => {
    render(<Menu />)
  })

  it('should render', () => {
    expect(screen.getByText('Menu')).toBeInTheDocument()
  })

  it('should contain', () => {
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByText('Collections')).toBeInTheDocument()
    expect(screen.getAllByRole('link')[0]).toBeInTheDocument()
  })
})
