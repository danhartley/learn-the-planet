import { describe, it, expect, vi, beforeEach } from 'vitest'
import { generateDistractors } from './distractors'
import type { Taxon, Collection, DistractorType } from '@/types'

vi.mock('@/utils/shuffle', async () => {
  return {
    shuffle: <T>(arr: T[]) => arr, // identity shuffle for test predictability
  }
})

describe('generateDistractors', () => {
  let collection: Collection<Taxon>
  let item: Taxon

  beforeEach(() => {
    item = {
      id: 1,
      vernacularName: 'Species A',
      binomial: 'Genus species A',
      distractors: [
        { binomial: 'Genus species B', name: 'Species B' },
        { binomial: 'Genus species C', name: 'Species C' },
      ],
      traits: [],
    }

    collection = {
      id: 'col1',
      name: 'Test Collection',
      date: '',
      location: '',
      index: 0,
      type: 'taxonomy',
      items: [
        item,
        {
          id: 2,
          binomial: 'Genus species D',
          vernacularName: 'Species D',
          traits: [],
        },
        {
          id: 3,
          binomial: 'Genus species E',
          vernacularName: 'Species E',
          traits: [],
        },
      ],
    }
  })

  it('returns distractors from item.distractors only when count is less or equal', () => {
    const result = generateDistractors(
      collection,
      item,
      2,
      'name' as DistractorType
    )
    expect(result).toEqual([
      { key: 'Genus species B', value: 'Species B' },
      { key: 'Genus species C', value: 'Species C' },
    ])
  })

  it('adds fallback distractors from collection when item.distractors are insufficient', () => {
    const result = generateDistractors(
      collection,
      item,
      3,
      'name' as DistractorType
    )
    expect(result).toContainEqual({
      key: 'Genus species B',
      value: 'Species B',
    })
    expect(result).toContainEqual({
      key: 'Genus species C',
      value: 'Species C',
    })
    expect(result.some(d => d.key === item.binomial)).toBe(false)
  })

  it('uses only collection distractors when item.distractors is empty', () => {
    item.distractors = []
    const result = generateDistractors(
      collection,
      item,
      2,
      'name' as DistractorType
    )
    expect(result.length).toBe(2)
    expect(result.some(d => d.key === item.binomial)).toBe(false)
  })

  it('returns the correct value for given distractorType', () => {
    const result = generateDistractors(
      collection,
      item,
      2,
      'name' as DistractorType
    )
    expect(result.every(opt => typeof opt.value === 'string')).toBe(true)
  })
})
