import { describe, it, expect } from 'vitest'
import { isTopicObject, validateTopicJson } from './topic-validation'
import type { Topic } from '@/types'

describe('isTopicObject', () => {
  it('should return true for valid Topic objects with minimal fields', () => {
    const validTopic: Topic = {
      id: 'topic-1',
      text: [],
    }

    expect(isTopicObject(validTopic)).toBe(true)
  })

  it('should return true for valid Topic objects with optional fields', () => {
    const validTopicWithFields: Topic = {
      id: 'topic-1',
      name: 'TypeScript Basics',
      topic: 'Introduction to TypeScript',
      text: ['Type safety in JavaScript', 'Basic syntax'],
      credit: {
        title: 'Strategies',
        source: 'TypeScript Documentation',
        authors: ['Anders Hejlsberg'],
      },
      examples: [
        { id: 'ex1', binomial: 'binomial', vernacularName: 'Hello World' },
      ],
      images: [{ src: 'src', alt: 'alt', caption: 'caption' }],
    }

    expect(isTopicObject(validTopicWithFields)).toBe(true)
  })

  it('should return false for null or undefined', () => {
    expect(isTopicObject(null)).toBe(false)
    expect(isTopicObject(undefined)).toBe(false)
  })

  it('should return false for non-object values', () => {
    expect(isTopicObject('string')).toBe(false)
    expect(isTopicObject(123)).toBe(false)
    expect(isTopicObject([])).toBe(false)
    expect(isTopicObject(true)).toBe(false)
  })

  it('should return false when required id field is missing', () => {
    expect(
      isTopicObject({
        name: 'TypeScript Basics',
        topic: 'Introduction',
      })
    ).toBe(false)
  })

  it('should return false when required id field has wrong type', () => {
    expect(
      isTopicObject({
        id: 123,
        name: 'TypeScript Basics',
      })
    ).toBe(false)
  })

  it('should return false when required id field is empty', () => {
    expect(
      isTopicObject({
        id: '',
        name: 'TypeScript Basics',
      })
    ).toBe(false)

    expect(
      isTopicObject({
        id: '   ',
        name: 'TypeScript Basics',
      })
    ).toBe(false)
  })

  it('should return false when optional fields have wrong types', () => {
    // name is not a string
    expect(
      isTopicObject({
        id: 'topic-1',
        name: 123,
      })
    ).toBe(false)

    // topic is not a string
    expect(
      isTopicObject({
        id: 'topic-1',
        topic: 123,
      })
    ).toBe(false)

    // text is not an array
    expect(
      isTopicObject({
        id: 'topic-1',
        text: 'not an array',
      })
    ).toBe(false)

    // examples is not an array
    expect(
      isTopicObject({
        id: 'topic-1',
        examples: 'not an array',
      })
    ).toBe(false)

    // images is not an array
    expect(
      isTopicObject({
        id: 'topic-1',
        images: 'not an array',
      })
    ).toBe(false)
  })

  it('should return false when credit object has incorrect structure', () => {
    // credit is not an object
    expect(
      isTopicObject({
        id: 'topic-1',
        credit: 'wrong',
      })
    ).toBe(false)

    // credit is an array
    expect(
      isTopicObject({
        id: 'topic-1',
        credit: ['wrong'],
      })
    ).toBe(false)

    // missing title in credit
    expect(
      isTopicObject({
        id: 'topic-1',
        credit: {
          source: 'Wikipedia',
          authors: ['Wikipedia Team'],
        },
      })
    ).toBe(false)

    // missing source in credit
    expect(
      isTopicObject({
        id: 'topic-1',
        credit: {
          title: 'Strategies',
          authors: ['Wikipedia Team'],
        },
      })
    ).toBe(false)

    // authors is not an array (when present)
    expect(
      isTopicObject({
        id: 'topic-1',
        credit: {
          title: 'Strategies',
          source: 'Wikipedia',
          authors: 'Wikipedia Team',
        },
      })
    ).toBe(false)
  })

  it('should return true when credit has valid structure with optional authors', () => {
    expect(
      isTopicObject({
        id: 'topic-1',
        credit: {
          title: 'Strategies',
          source: 'Wikipedia',
        },
      })
    ).toBe(true)
  })
})

describe('validateTopicJson', () => {
  it('should return isValid=true for minimal valid Topic JSON', () => {
    const validTopicJson = JSON.stringify({
      id: 'topic-1',
    })

    const result = validateTopicJson(validTopicJson)
    expect(result.isValid).toBe(true)
    expect(result.errors).toEqual([])
    expect(result.parsedData).toBeDefined()
  })

  it('should return isValid=true for valid Topic JSON with optional fields', () => {
    const validTopicJson = JSON.stringify({
      id: 'topic-1',
      name: 'TypeScript Basics',
      topic: 'Introduction to TypeScript',
      text: ['Type safety', 'Basic syntax'],
    })

    const result = validateTopicJson(validTopicJson)
    expect(result.isValid).toBe(true)
    expect(result.errors).toEqual([])
    expect(result.parsedData).toBeDefined()
  })

  it('should return isValid=true for valid Topic JSON array', () => {
    const validTopicJson = JSON.stringify([
      {
        id: 'topic-1',
        name: 'TypeScript Basics',
      },
      {
        id: 'topic-2',
        name: 'JavaScript Basics',
        text: ['Introduction to JavaScript'],
        examples: [
          { id: 'ex1', binomial: 'binomial', vernacularName: 'Hello World' },
        ],
      },
    ])

    const result = validateTopicJson(validTopicJson)
    expect(result.isValid).toBe(true)
    expect(result.errors).toEqual([])
    expect(result.parsedData).toBeDefined()
    expect(Array.isArray(result.parsedData)).toBe(true)
    expect(result?.parsedData?.length).toBe(2)
  })

  it('should return isValid=false for empty JSON string', () => {
    const result = validateTopicJson('')
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('JSON string is empty')
  })

  it('should return isValid=false for invalid JSON syntax', () => {
    const invalidJson = '{ "id": "topic-1", name: "TypeScript" }' // Missing quotes around name

    const result = validateTopicJson(invalidJson)
    expect(result.isValid).toBe(false)
    expect(result.errors[0]).toContain('Invalid JSON:')
  })

  it('should return specific errors for missing required id field', () => {
    const json = JSON.stringify({
      name: 'TypeScript Basics',
      topic: 'Introduction',
    })

    const result = validateTopicJson(json)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Item 0: Missing required field: id')
  })

  it('should return specific errors for wrong field types', () => {
    // id is not a string
    let json = JSON.stringify({
      id: 123,
      name: 'TypeScript Basics',
    })

    let result = validateTopicJson(json)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Item 0: Field "id" must be a string')

    // name is not a string
    json = JSON.stringify({
      id: 'topic-1',
      name: 123,
    })

    result = validateTopicJson(json)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Item 0: Field "name" must be a string')

    // text is not an array
    json = JSON.stringify({
      id: 'topic-1',
      text: 'Not an array',
    })

    result = validateTopicJson(json)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Item 0: Field "text" must be an array')

    // examples is not an array
    json = JSON.stringify({
      id: 'topic-1',
      examples: 'Not an array',
    })

    result = validateTopicJson(json)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Item 0: Field "examples" must be an array')
  })

  it('should return specific errors for empty required id field', () => {
    const json = JSON.stringify({
      id: '',
      name: 'TypeScript Basics',
    })

    const result = validateTopicJson(json)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Item 0: Field "id" cannot be empty')
  })

  it('should return specific errors for credit field with incorrect structure', () => {
    // title is not a string
    let json = JSON.stringify({
      id: 'topic-1',
      credit: {
        title: 123,
        source: 'Wikipedia',
        authors: ['Wikipedia Team'],
      },
    })

    let result = validateTopicJson(json)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain(
      'Item 0: Field "credit.title" must be a string'
    )

    // authors is not an array (when present)
    json = JSON.stringify({
      id: 'topic-1',
      credit: {
        title: 'Strategies',
        source: 'Wikipedia',
        authors: 'Not an array',
      },
    })

    result = validateTopicJson(json)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain(
      'Item 0: Field "credit.authors" must be an array'
    )
  })

  it('should return multiple errors for multiple issues', () => {
    const json = JSON.stringify([
      {
        id: '',
        name: 123,
        text: 'not an array',
      },
      {
        // Missing required id
        name: 'Valid name but no id',
      },
    ])

    const result = validateTopicJson(json)
    expect(result.isValid).toBe(false)
    expect(result.errors.length).toBeGreaterThan(3)
    expect(result.errors).toContain('Item 0: Field "id" cannot be empty')
    expect(result.errors).toContain('Item 0: Field "name" must be a string')
    expect(result.errors).toContain('Item 0: Field "text" must be an array')
    expect(result.errors).toContain('Item 1: Missing required field: id')
  })

  it('should handle non-object JSON values', () => {
    const nonObjectJson = JSON.stringify('just a string')

    const result = validateTopicJson(nonObjectJson)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Item 0: Not a valid object')
  })

  it('should validate credit objects with optional authors', () => {
    const json = JSON.stringify({
      id: 'topic-1',
      credit: {
        title: 'Strategies',
        source: 'Wikipedia',
        // authors is optional
      },
    })

    const result = validateTopicJson(json)
    expect(result.isValid).toBe(true)
    expect(result.errors).toEqual([])
  })
})
