import { describe, it, expect, beforeEach } from 'vitest'
import { TestPlanner } from './test-planner'
import { Collection, Taxon } from './types'
import { taxonTemplates } from './api/questionTemplates'

describe('TestPlanner', () => {
  let validCollection: Collection<Taxon>

  beforeEach(() => {
    validCollection = {
      id: '1',
      name: 'Test Collection',
      date: '2023-01-01',
      location: 'Test Lab',
      type: 'taxon',
      items: [
        { id: 1, binomial: '', vernacularName: '' },
        { id: 2, binomial: '', vernacularName: '' },
      ],
    }
  })

  it('throws if collection has no items', () => {
    const emptyCollection = { ...validCollection, items: [] }
    expect(() => {
      new TestPlanner(emptyCollection, taxonTemplates)
    }).toThrow('Collection must contain at least one item')
  })
})
