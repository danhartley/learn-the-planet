import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import { CollectionType } from './CollectionType'
import { ContentType } from '@/types'

describe('CollectionType', () => {
  test('renders with default operation (read)', () => {
    render(<CollectionType operation="read" />)

    // Check if heading is rendered
    expect(
      screen.getByRole('heading', { name: /collection type/i })
    ).toBeInTheDocument()
  })

  test('renders with delete operation', () => {
    render(<CollectionType operation="delete" />)

    expect(
      screen.getByRole('heading', { name: /collection type/i })
    ).toBeInTheDocument()
    expect(screen.queryByText('trait')).not.toBeInTheDocument()
  })

  test('handles missing operation prop by defaulting to read', () => {
    // @ts-ignore - Intentionally omitting the prop to test default behavior
    render(<CollectionType />)

    expect(
      screen.getByRole('heading', { name: /collection type/i })
    ).toBeInTheDocument()
    expect(screen.queryByText('trait')).not.toBeInTheDocument()
  })

  test('renders correct section accessibility attributes', () => {
    render(<CollectionType operation="read" />)

    const section = screen.getByRole('region', { name: /collection type/i })
    expect(section).toHaveAttribute('aria-labelledby', 'collection-type')
  })
})
