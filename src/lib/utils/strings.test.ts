import { describe, it, expect } from 'vitest'
import { isCamelCase, splitCamelCaseSmart } from '@/utils/strings'

describe('Check for camel case', () => {
  it('should return true or false', () => {
    expect(isCamelCase('vernacularName')).toEqual(true)
    expect(isCamelCase('Genus species')).toEqual(false)
  })
})

describe('Split camel case', () => {
  it('should return split string', () => {
    expect(splitCamelCaseSmart('vernacularName')).toEqual('vernacular name')
  })
})
