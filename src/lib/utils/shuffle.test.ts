import { describe, it, expect, beforeEach } from 'vitest'
import { shuffle } from '@/utils/shuffle'

describe('shuffle', () => {
  it('should return [] for empty array', () => {
    expect(shuffle([])).toEqual([])
  })
})
