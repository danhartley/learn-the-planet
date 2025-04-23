import { markAnswer } from '@/utils/scorer'
import { expect } from 'vitest'

describe('markAnswer', () => {
  it('returns true for exact match with no brackets', () => {
    expect(markAnswer('guard', 'guard')).toBe(true)
  })

  it('ignores case and spaces', () => {
    expect(markAnswer('Guard', '  gUArd ')).toBe(true)
  })

  it('removes bracketed content before comparing', () => {
    expect(markAnswer('guard (cells)', 'guard')).toBe(true)
    expect(markAnswer('guard', 'guard (cells)')).toBe(true)
  })

  it('returns false if values differ after cleanup', () => {
    expect(markAnswer('guard', 'stomata')).toBe(false)
  })

  it('handles multiple bracketed parts', () => {
    expect(markAnswer('leaf (upper) surface (lower)', 'leaf surface')).toBe(
      true
    )
  })

  it('returns true when both are empty after bracket removal', () => {
    expect(markAnswer('(extra)', '(useless)')).toBe(true)
  })
})
