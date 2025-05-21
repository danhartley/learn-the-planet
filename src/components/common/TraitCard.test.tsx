import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TraitCard } from '@/components/common/TraitCard'

describe('Trait', () => {
  const mockTrait = {
    id: '1',
    trait: 'leaf shape',
    definition: 'The characteristic form of the leaf',
  }
  beforeEach(() => {
    render(<TraitCard trait={mockTrait} />)
  })
  it('test', () => {
    expect(screen.getByText(mockTrait.trait)).toBeInTheDocument()
    expect(screen.getByText(mockTrait.definition)).toBeInTheDocument()
    expect(screen.getByText('Morphology')).toBeInTheDocument()
    expect(screen.getByText('Phenology')).toBeInTheDocument()
  })
})
