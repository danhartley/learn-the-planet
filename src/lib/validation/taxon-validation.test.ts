import { describe, it, expect } from 'vitest'
import { isTaxonObject, validateTaxonJson } from './taxon-validation'

describe('isTaxonObject', () => {
  it('should return true for a valid Taxon object', () => {
    const validTaxon = {
      id: 'taxon-1',
      vernacularName: 'Red Fox',
      binomial: 'Vulpes vulpes',
      source: 'Some source',
      example: 'Example image URL',
    }

    expect(isTaxonObject(validTaxon)).toBe(true)
  })

  it('should return true for a valid Taxon object with distractors', () => {
    const validTaxon = {
      id: 'taxon-1',
      vernacularName: 'Red Fox',
      binomial: 'Vulpes vulpes',
      distractors: ['Gray Wolf', 'Arctic Fox'],
    }

    expect(isTaxonObject(validTaxon)).toBe(true)
  })

  it('should return false for null or undefined', () => {
    expect(isTaxonObject(null)).toBe(false)
    expect(isTaxonObject(undefined)).toBe(false)
  })

  it('should return false for non-object values', () => {
    expect(isTaxonObject('string')).toBe(false)
    expect(isTaxonObject(123)).toBe(false)
    expect(isTaxonObject(true)).toBe(false)
    expect(isTaxonObject([])).toBe(false)
  })

  it('should return false if id is missing', () => {
    const invalidTaxon = {
      vernacularName: 'Red Fox',
      binomial: 'Vulpes vulpes',
    }

    expect(isTaxonObject(invalidTaxon)).toBe(false)
  })

  it('should return false if id is empty', () => {
    const invalidTaxon = {
      id: '',
      vernacularName: 'Red Fox',
      binomial: 'Vulpes vulpes',
    }

    expect(isTaxonObject(invalidTaxon)).toBe(false)
  })

  it('should return false if id is just whitespace', () => {
    const invalidTaxon = {
      id: '   ',
      vernacularName: 'Red Fox',
      binomial: 'Vulpes vulpes',
    }

    expect(isTaxonObject(invalidTaxon)).toBe(false)
  })

  it('should return false if vernacularName is missing', () => {
    const invalidTaxon = {
      id: 'taxon-1',
      binomial: 'Vulpes vulpes',
    }

    expect(isTaxonObject(invalidTaxon)).toBe(false)
  })

  it('should return false if vernacularName is empty', () => {
    const invalidTaxon = {
      id: 'taxon-1',
      vernacularName: '',
      binomial: 'Vulpes vulpes',
    }

    expect(isTaxonObject(invalidTaxon)).toBe(false)
  })

  it('should return false if binomial is missing', () => {
    const invalidTaxon = {
      id: 'taxon-1',
      vernacularName: 'Red Fox',
    }

    expect(isTaxonObject(invalidTaxon)).toBe(false)
  })

  it('should return false if binomial is empty', () => {
    const invalidTaxon = {
      id: 'taxon-1',
      vernacularName: 'Red Fox',
      binomial: '',
    }

    expect(isTaxonObject(invalidTaxon)).toBe(false)
  })

  it('should return false if source is not a string', () => {
    const invalidTaxon = {
      id: 'taxon-1',
      vernacularName: 'Red Fox',
      binomial: 'Vulpes vulpes',
      source: 123,
    }

    expect(isTaxonObject(invalidTaxon)).toBe(false)
  })

  it('should return false if example is not a string', () => {
    const invalidTaxon = {
      id: 'taxon-1',
      vernacularName: 'Red Fox',
      binomial: 'Vulpes vulpes',
      example: true,
    }

    expect(isTaxonObject(invalidTaxon)).toBe(false)
  })

  it('should return false if distractors is not an array', () => {
    const invalidTaxon = {
      id: 'taxon-1',
      vernacularName: 'Red Fox',
      binomial: 'Vulpes vulpes',
      distractors: 'Not an array',
    }

    expect(isTaxonObject(invalidTaxon)).toBe(false)
  })
})

describe('validateTaxonJson', () => {
  it('should return isValid=true for valid single taxon JSON', () => {
    const validJson = JSON.stringify({
      id: 'taxon-1',
      vernacularName: 'Red Fox',
      binomial: 'Vulpes vulpes',
    })

    const result = validateTaxonJson(validJson)
    expect(result.isValid).toBe(true)
    expect(result.errors).toEqual([])
    expect(result.parsedData).toEqual({
      id: 'taxon-1',
      vernacularName: 'Red Fox',
      binomial: 'Vulpes vulpes',
    })
  })

  it('should return isValid=true for valid array of taxa JSON', () => {
    const validJson = JSON.stringify([
      {
        id: 'taxon-1',
        vernacularName: 'Red Fox',
        binomial: 'Vulpes vulpes',
      },
      {
        id: 'taxon-2',
        vernacularName: 'Gray Wolf',
        binomial: 'Canis lupus',
        distractors: ['Red Fox', 'Coyote'],
      },
    ])

    const result = validateTaxonJson(validJson)
    expect(result.isValid).toBe(true)
    expect(result.errors).toEqual([])
    expect(result.parsedData).toEqual([
      {
        id: 'taxon-1',
        vernacularName: 'Red Fox',
        binomial: 'Vulpes vulpes',
      },
      {
        id: 'taxon-2',
        vernacularName: 'Gray Wolf',
        binomial: 'Canis lupus',
        distractors: ['Red Fox', 'Coyote'],
      },
    ])
  })

  it('should return isValid=false for empty JSON string', () => {
    const result = validateTaxonJson('')
    expect(result.isValid).toBe(false)
    expect(result.errors).toEqual(['JSON string is empty'])
  })

  it('should return isValid=false for whitespace-only JSON string', () => {
    const result = validateTaxonJson('   ')
    expect(result.isValid).toBe(false)
    expect(result.errors).toEqual(['JSON string is empty'])
  })

  it('should return isValid=false for invalid JSON syntax', () => {
    const result = validateTaxonJson('{invalid json:}')
    expect(result.isValid).toBe(false)
    expect(result.errors[0]).toContain('Invalid JSON:')
  })

  it('should return specific errors for invalid taxon structure', () => {
    const invalidJson = JSON.stringify({
      id: 'taxon-1',
      // Missing vernacularName
      binomial: 'Vulpes vulpes',
    })

    const result = validateTaxonJson(invalidJson)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain(
      'Item 0: Missing required field: vernacularName'
    )
  })

  it('should validate each item in an array and return all errors', () => {
    const invalidJson = JSON.stringify([
      {
        id: 'taxon-1',
        vernacularName: 'Red Fox',
        binomial: '', // Empty binomial
      },
      {
        id: 'taxon-2',
        // Missing vernacularName
        binomial: 'Canis lupus',
      },
    ])

    const result = validateTaxonJson(invalidJson)
    expect(result.isValid).toBe(false)
    expect(result.errors).toHaveLength(2)
    expect(result.errors).toContain('Item 0: Field "binomial" cannot be empty')
    expect(result.errors).toContain(
      'Item 1: Missing required field: vernacularName'
    )
  })

  it('should validate optional fields if present', () => {
    const invalidJson = JSON.stringify({
      id: 'taxon-1',
      vernacularName: 'Red Fox',
      binomial: 'Vulpes vulpes',
      distractors: 'Not an array', // Should be an array
    })

    const result = validateTaxonJson(invalidJson)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain(
      'Item 0: Field "distractors" must be an array'
    )
  })

  it('should check if wikipediaUrl is a string if present', () => {
    const invalidJson = JSON.stringify({
      id: 'taxon-1',
      vernacularName: 'Red Fox',
      binomial: 'Vulpes vulpes',
      wikipediaUrl: 123, // Should be a string
    })

    const result = validateTaxonJson(invalidJson)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain(
      'Item 0: Field "wikipediaUrl" must be a string'
    )
  })

  it('should check if inaturalistUrl is a string if present', () => {
    const invalidJson = JSON.stringify({
      id: 'taxon-1',
      vernacularName: 'Red Fox',
      binomial: 'Vulpes vulpes',
      inaturalistUrl: false, // Should be a string
    })

    const result = validateTaxonJson(invalidJson)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain(
      'Item 0: Field "inaturalistUrl" must be a string'
    )
  })

  it('should return a generic error if object structure is invalid', () => {
    // This is a case where the object isn't null and has the required fields,
    // but their types are wrong in a way not specifically checked
    const invalidJson = JSON.stringify({
      id: ['not-a-string'],
      vernacularName: ['not-a-string'],
      binomial: ['not-a-string'],
    })

    const result = validateTaxonJson(invalidJson)
    expect(result.isValid).toBe(false)
    expect(
      result.errors.some(
        error =>
          error.includes('Field "id" must be a string') ||
          error.includes('Field "vernacularName" must be a string') ||
          error.includes('Field "binomial" must be a string')
      )
    ).toBe(true)
  })
})
