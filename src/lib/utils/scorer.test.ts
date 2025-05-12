import { Question } from '@/types'
import { markAnswer } from '@/utils/scorer'
import { expect } from 'vitest'

describe('markAnswer', () => {
  it('returns true for exact match with no brackets', () => {
    expect(markAnswer({ key: 'guard' } as Question, 'guard')).toBe(true)
  })

  it('ignores case and spaces', () => {
    expect(markAnswer({ key: 'Guard' } as Question, 'gUArd ')).toBe(true)
  })

  it('removes bracketed content before comparing', () => {
    expect(markAnswer({ key: 'guard (cells)' } as Question, 'guard')).toBe(true)
    expect(markAnswer({ key: 'guard' } as Question, 'guard (cells)')).toBe(true)
  })

  it('returns false if values differ after cleanup', () => {
    expect(markAnswer({ key: 'guard' } as Question, 'stomata')).toBe(false)
  })

  it('handles multiple bracketed parts', () => {
    expect(
      markAnswer(
        { key: 'leaf (upper) surface (lower)' } as Question,
        'leaf surface'
      )
    ).toBe(true)
  })

  it('returns true when both are empty after bracket removal', () => {
    expect(markAnswer({ key: '(extra)' } as Question, '(useless)')).toBe(true)
  })
})
