import { describe, it, expect } from 'vitest'
import { groupCollectionsByType } from '@/utils/arrays'

// Mock types based on your function signature
type ContentHandlerType = 'taxon' | 'term' | 'topic' | 'trait'

interface CollectionSummary {
  type: ContentHandlerType
  shortId: string
  name: string
  slug: string
  // Add other properties as needed
}

describe('groupCollectionsByType', () => {
  it('should return empty groups when given empty array', () => {
    const result = groupCollectionsByType([])

    expect(result).toEqual({
      taxon: [],
      term: [],
      topic: [],
      trait: [],
    })
  })

  it('should group collections by type correctly', () => {
    const collections: CollectionSummary[] = [
      { type: 'taxon', shortId: '1', name: 'Mammals', slug: 'mammals' },
      {
        type: 'term',
        shortId: '2',
        name: 'Biology Term',
        slug: 'biology-term',
      },
      { type: 'taxon', shortId: '3', name: 'Birds', slug: 'birds' },
      { type: 'topic', shortId: '4', name: 'Evolution', slug: 'evolution' },
      { type: 'trait', shortId: '5', name: 'Wing Span', slug: 'wing-span' },
      {
        type: 'term',
        shortId: '6',
        name: 'Chemistry Term',
        slug: 'chemistry-term',
      },
    ]

    const result = groupCollectionsByType(collections)

    expect(result.taxon).toHaveLength(2)
    expect(result.term).toHaveLength(2)
    expect(result.topic).toHaveLength(1)
    expect(result.trait).toHaveLength(1)

    expect(result.taxon).toEqual([
      { type: 'taxon', shortId: '1', name: 'Mammals', slug: 'mammals' },
      { type: 'taxon', shortId: '3', name: 'Birds', slug: 'birds' },
    ])

    expect(result.term).toEqual([
      {
        type: 'term',
        shortId: '2',
        name: 'Biology Term',
        slug: 'biology-term',
      },
      {
        type: 'term',
        shortId: '6',
        name: 'Chemistry Term',
        slug: 'chemistry-term',
      },
    ])

    expect(result.topic).toEqual([
      { type: 'topic', shortId: '4', name: 'Evolution', slug: 'evolution' },
    ])

    expect(result.trait).toEqual([
      { type: 'trait', shortId: '5', name: 'Wing Span', slug: 'wing-span' },
    ])
  })

  it('should handle collections of only one type', () => {
    const collections: CollectionSummary[] = [
      { type: 'taxon', shortId: '1', name: 'Mammals', slug: 'mammals' },
      { type: 'taxon', shortId: '2', name: 'Birds', slug: 'birds' },
      { type: 'taxon', shortId: '3', name: 'Fish', slug: 'fish' },
    ]

    const result = groupCollectionsByType(collections)

    expect(result.taxon).toHaveLength(3)
    expect(result.term).toHaveLength(0)
    expect(result.topic).toHaveLength(0)
    expect(result.trait).toHaveLength(0)

    expect(result.taxon).toEqual(collections)
  })

  it('should preserve original collection objects', () => {
    const collection: CollectionSummary = {
      type: 'taxon',
      shortId: '1',
      name: 'Mammals',
      slug: 'mammals',
    }

    const result = groupCollectionsByType([collection])

    expect(result.taxon[0]).toBe(collection) // Same reference
  })

  it('should handle single collection per type', () => {
    const collections: CollectionSummary[] = [
      { type: 'taxon', shortId: '1', name: 'Mammals', slug: 'mammals' },
      {
        type: 'term',
        shortId: '2',
        name: 'Biology Term',
        slug: 'biology-term',
      },
      { type: 'topic', shortId: '3', name: 'Evolution', slug: 'evolution' },
      { type: 'trait', shortId: '4', name: 'Wing Span', slug: 'wing-span' },
    ]

    const result = groupCollectionsByType(collections)

    expect(result.taxon).toHaveLength(1)
    expect(result.term).toHaveLength(1)
    expect(result.topic).toHaveLength(1)
    expect(result.trait).toHaveLength(1)

    expect(result.taxon[0].name).toBe('Mammals')
    expect(result.term[0].name).toBe('Biology Term')
    expect(result.topic[0].name).toBe('Evolution')
    expect(result.trait[0].name).toBe('Wing Span')
  })

  it('should maintain order within each group', () => {
    const collections: CollectionSummary[] = [
      { type: 'taxon', shortId: '1', name: 'First Taxon', slug: 'first-taxon' },
      { type: 'term', shortId: '2', name: 'First Term', slug: 'first-term' },
      {
        type: 'taxon',
        shortId: '3',
        name: 'Second Taxon',
        slug: 'second-taxon',
      },
      { type: 'term', shortId: '4', name: 'Second Term', slug: 'second-term' },
      { type: 'taxon', shortId: '5', name: 'Third Taxon', slug: 'third-taxon' },
    ]

    const result = groupCollectionsByType(collections)

    expect(result.taxon[0].name).toBe('First Taxon')
    expect(result.taxon[1].name).toBe('Second Taxon')
    expect(result.taxon[2].name).toBe('Third Taxon')

    expect(result.term[0].name).toBe('First Term')
    expect(result.term[1].name).toBe('Second Term')
  })
})
