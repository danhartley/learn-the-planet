import { describe, it, expect } from 'vitest'
import { createEOLUrl } from '@/utils/image'

describe('createEOLUrl', () => {
  it('should return complete URL', () => {
    const input = '55/6a/83/509.11026897.jpg'
    const url = createEOLUrl(input)
    expect(url).toEqual(
      'https://content.eol.org/data/media/55/6a/83/509.11026897.260x190.jpg'
    )
  })
})
