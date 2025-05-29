import { describe, it, expect } from 'vitest'
import { isTopicObject, validateTopicJson } from './topic-validation'
import type { Topic } from '@/types'

describe('isTopicObject', () => {
  it('should return true for valid Topic objects', () => {
    const validTopic: Topic = {
      id: 'topic-1',
      topic: 'TypeScript Basics',
      text: ['Introduction to TypeScript', 'Type safety in JavaScript'],
    }

    expect(isTopicObject(validTopic)).toBe(true)
  })

  it('should return true for valid Topic objects with all optional fields', () => {
    const validTopicWithAllFields: Topic = {
      id: 'topic-1',
      topic: 'TypeScript Basics',
      text: ['Introduction to TypeScript', 'Type safety in JavaScript'],
      source: 'TypeScript Documentation',
      example: 'let x: number = 5;',
      distractors: ['JavaScript', 'C#'],
      credit: {
        title: 'Strategies',
        source: 'Wikipedia',
        authors: ['Anders Hejlsberg', 'Wikipedia Team'],
      },
    }

    expect(isTopicObject(validTopicWithAllFields)).toBe(true)
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

  it('should return false when required fields are missing', () => {
    // Missing id
    expect(
      isTopicObject({
        topic: 'Life history strategies',
        text: ['Introduction'],
      })
    ).toBe(false)

    // Missing topic
    expect(
      isTopicObject({
        id: 'topic-1',
        text: ['Introduction'],
      })
    ).toBe(false)

    // Missing text
    expect(
      isTopicObject({
        id: 'topic-1',
        topic: 'Life history strategies',
      })
    ).toBe(false)
  })

  it('should return false when required fields have wrong types', () => {
    // id is not a string
    expect(
      isTopicObject({
        id: 123,
        topic: 'Life history strategies',
        text: ['Introduction'],
      })
    ).toBe(false)

    // topic is not a string
    expect(
      isTopicObject({
        id: 'topic-1',
        topic: 123,
        text: ['Introduction'],
      })
    ).toBe(false)

    // text is not an array
    expect(
      isTopicObject({
        id: 'topic-1',
        topic: 'Life history strategies',
        text: 'Introduction',
      })
    ).toBe(false)
  })

  it('should return false when required string fields are empty', () => {
    // Empty id
    expect(
      isTopicObject({
        id: '',
        topic: 'Life history strategies',
        text: ['Introduction'],
      })
    ).toBe(false)

    // Empty topic
    expect(
      isTopicObject({
        id: 'topic-1',
        topic: '',
        text: ['Introduction'],
      })
    ).toBe(false)

    // Empty with whitespace
    expect(
      isTopicObject({
        id: '   ',
        topic: 'Life history strategies',
        text: ['Introduction'],
      })
    ).toBe(false)
  })

  it('should return false when optional fields have wrong types', () => {
    // distractors is not an array
    expect(
      isTopicObject({
        id: 'topic-1',
        topic: 'Life history strategies',
        text: ['Introduction'],
        distractors: 'wrong',
      })
    ).toBe(false)
  })

  it('should return false when credit object has incorrect structure', () => {
    // credit is not an object
    expect(
      isTopicObject({
        id: 'topic-1',
        topic: 'Life history strategies',
        text: ['Introduction'],
        credit: 'wrong',
      })
    ).toBe(false)

    // credit is an array
    expect(
      isTopicObject({
        id: 'topic-1',
        topic: 'Life history strategies',
        text: ['Introduction'],
        credit: ['wrong'],
      })
    ).toBe(false)

    // missing title in credit
    expect(
      isTopicObject({
        id: 'topic-1',
        topic: 'Life history strategies',
        text: ['Introduction'],
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
        topic: 'Life history strategies',
        text: ['Introduction'],
        credit: {
          title: 'Strategies',
          authors: ['Wikipedia Team'],
        },
      })
    ).toBe(false)

    // missing authors in credit
    expect(
      isTopicObject({
        id: 'topic-1',
        topic: 'Life history strategies',
        text: ['Introduction'],
        credit: {
          title: 'Strategies',
        },
      })
    ).toBe(false)

    // authors is not an array
    expect(
      isTopicObject({
        id: 'topic-1',
        topic: 'Life history strategies',
        text: ['Introduction'],
        credit: {
          title: 'Strategies',
          source: 'Wikipedia',
          authors: 'Wikipedia Team',
        },
      })
    ).toBe(false)
  })
})

describe('validateTopicJson', () => {
  it('should return isValid=true for valid Topic JSON', () => {
    const validTopicJson = JSON.stringify({
      id: 'topic-1',
      topic: 'TypeScript Basics',
      text: ['Introduction to TypeScript'],
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
        topic: 'TypeScript Basics',
        text: ['Introduction to TypeScript'],
      },
      {
        id: 'topic-2',
        topic: 'JavaScript Basics',
        text: ['Introduction to JavaScript'],
        distractors: ['Life history strategies', 'Java'],
      },
    ])

    const result = validateTopicJson(validTopicJson)
    expect(result.isValid).toBe(true)
    expect(result.errors).toEqual([])
    expect(result.parsedData).toBeDefined()
    expect(Array.isArray(result.parsedData)).toBe(true)
    expect(result.parsedData.length).toBe(2)
  })

  it('should return isValid=false for empty JSON string', () => {
    const result = validateTopicJson('')
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('JSON string is empty')
  })

  it('should return isValid=false for invalid JSON syntax', () => {
    const invalidJson = '{ "id": "topic-1", "topic": "TypeScript", text: [] }' // Missing quotes around text

    const result = validateTopicJson(invalidJson)
    expect(result.isValid).toBe(false)
    expect(result.errors[0]).toContain('Invalid JSON:')
  })

  it('should return specific errors for missing required fields', () => {
    // Missing id
    let json = JSON.stringify({
      topic: 'Life history strategies',
      text: ['Introduction'],
    })

    let result = validateTopicJson(json)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Item 0: Missing required field: id')

    // Missing topic
    json = JSON.stringify({
      id: 'topic-1',
      text: ['Introduction'],
    })

    result = validateTopicJson(json)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Item 0: Missing required field: topic')

    // Missing text
    json = JSON.stringify({
      id: 'topic-1',
      topic: 'Life history strategies',
    })

    result = validateTopicJson(json)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Item 0: Missing required field: text')
  })

  it('should return specific errors for wrong field types', () => {
    // id is not a string
    let json = JSON.stringify({
      id: 123,
      topic: 'Life history strategies',
      text: ['Introduction'],
    })

    let result = validateTopicJson(json)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Item 0: Field "id" must be a string')

    // text is not an array
    json = JSON.stringify({
      id: 'topic-1',
      topic: 'Life history strategies',
      text: 'Not an array',
    })

    result = validateTopicJson(json)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Item 0: Field "text" must be an array')
  })

  it('should return specific errors for empty required string fields', () => {
    const json = JSON.stringify({
      id: '',
      topic: 'Life history strategies',
      text: ['Introduction'],
    })

    const result = validateTopicJson(json)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Item 0: Field "id" cannot be empty')
  })

  it('should return specific errors for credit field with incorrect structure', () => {
    // title is not a string
    let json = JSON.stringify({
      id: 'topic-1',
      topic: 'Life history strategies',
      text: ['Introduction'],
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

    // authors is not an array
    json = JSON.stringify({
      id: 'topic-1',
      topic: 'Life history strategies',
      text: ['Introduction'],
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
        topic: 123,
        text: 'not an array',
      },
      {
        // Completely invalid item
        name: 'Wrong property',
      },
    ])

    const result = validateTopicJson(json)
    expect(result.isValid).toBe(false)
    expect(result.errors.length).toBeGreaterThan(3)
    expect(result.errors).toContain('Item 0: Field "id" cannot be empty')
    expect(result.errors).toContain('Item 0: Field "topic" must be a string')
    expect(result.errors).toContain('Item 0: Field "text" must be an array')
    expect(result.errors).toContain('Item 1: Missing required field: id')
    expect(result.errors).toContain('Item 1: Missing required field: topic')
    expect(result.errors).toContain('Item 1: Missing required field: text')
  })

  it('should handle non-object JSON values', () => {
    const nonObjectJson = JSON.stringify('just a string')

    const result = validateTopicJson(nonObjectJson)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Item 0: Not a valid object')
  })
})
