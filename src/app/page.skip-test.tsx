import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import CollectionsPage from './page'

describe('Set up', () => {
  test('Home', () => {
    render(<CollectionsPage />)
    expect(
      screen.getByRole('heading', { level: 1, name: 'Collections' })
    ).toBeDefined()
  })
})
