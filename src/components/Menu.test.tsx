import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import { Menu } from '@/components/Menu'

describe('Menu', () => {
  beforeEach(() => {
    render(<Menu />)
  })

  it('should render', () => {
    expect(screen.getByText('Site Navigation')).toBeInTheDocument()
  })

  it('should contain', () => {
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByText('Topics')).toBeInTheDocument()
    expect(screen.getByText('Traits')).toBeInTheDocument()
    expect(screen.getByText('Taxa')).toBeInTheDocument()
    expect(screen.getByText('Terms')).toBeInTheDocument()
    expect(screen.getAllByRole('link')[0]).toBeInTheDocument()
  })
})
