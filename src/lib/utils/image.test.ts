import { describe, it, expect } from 'vitest'
import { formatURL } from '@/utils/image'

describe('formatURL', () => {
  it('should return complete URL', () => {
    const input = '55/6a/83/509.11026897.jpg'
    const url = formatURL(input)
    expect(url).toEqual(
      'https://content.eol.org/data/media/55/6a/83/509.11026897.260x190.jpg'
    )
  })
})
