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

    // Check if the operation text is displayed
    expect(screen.getByText('read')).toBeInTheDocument()
  })

  test('renders with create operation', () => {
    const types: ContentType[] = [
      {
        key: 'topic',
        value: 'topic',
      },
      {
        key: 'trait',
        value: 'trait',
      },
      {
        key: 'taxon',
        value: 'taxon',
      },
      {
        key: 'term',
        value: 'term',
      },
    ]
    render(<CollectionType operation="create" types={types} />)

    expect(
      screen.getByRole('heading', { name: /collection type/i })
    ).toBeInTheDocument()
    expect(screen.getByText('topic')).toBeInTheDocument()
    expect(screen.getByText('trait')).toBeInTheDocument()
    expect(screen.getByText('taxon')).toBeInTheDocument()
    expect(screen.getByText('term')).toBeInTheDocument()
  })

  test('renders with update operation', () => {
    render(<CollectionType operation="update" />)

    expect(
      screen.getByRole('heading', { name: /collection type/i })
    ).toBeInTheDocument()
    expect(screen.getByText('update')).toBeInTheDocument()
    // expect(screen.queryByText('topic')).not.toBeInTheDocument()
  })

  test('renders with delete operation', () => {
    render(<CollectionType operation="delete" />)

    expect(
      screen.getByRole('heading', { name: /collection type/i })
    ).toBeInTheDocument()
    expect(screen.getByText('delete')).toBeInTheDocument()
    expect(screen.queryByText('trait')).not.toBeInTheDocument()
  })

  test('handles missing operation prop by defaulting to read', () => {
    // @ts-ignore - Intentionally omitting the prop to test default behavior
    render(<CollectionType />)

    expect(
      screen.getByRole('heading', { name: /collection type/i })
    ).toBeInTheDocument()
    expect(screen.getByText('read')).toBeInTheDocument()
    expect(screen.queryByText('trait')).not.toBeInTheDocument()
  })

  test('renders correct section accessibility attributes', () => {
    render(<CollectionType operation="read" />)

    const section = screen.getByRole('region', { name: /collection type/i })
    expect(section).toHaveAttribute('aria-labelledby', 'collection-type')
  })
})
