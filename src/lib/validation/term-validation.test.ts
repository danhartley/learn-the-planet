import { describe, it, expect } from 'vitest'
import { isTraitObject, validateTraitJson } from './trait-validation'
import { Trait } from '@/types'

describe('isTraitObject', () => {
  // Test with valid trait objects
  it('should return true for a valid complete Trait object', () => {
    const validTrait: Trait = {
      id: 'trait-1',
      trait: 'Blue Flowers',
      definition: 'Flowers that are blue in color',
      source: { name: 'Field Guide to Plants', url: '' },
      distractors: ['Red Flowers', 'Yellow Flowers'],
      morphology: ['Petals', 'Sepals'],
      phenology: ['Spring', 'Summer'],
      examples: [
        {
          id: 'example-1',
          binomial: 'Centaurea cyanus',
          vernacularName: 'Cornflower',
          inaturalistUrl:
            'https://www.inaturalist.org/taxa/47603-Centaurea-cyanus',
        },
      ],
    }
    expect(isTraitObject(validTrait)).toBe(true)
  })

  it('should return true for a valid minimal Trait object with only required fields', () => {
    const minimalTrait = {
      id: 'trait-2',
      trait: 'Red Berries',
      definition: 'Berries that are red in color',
    }
    expect(isTraitObject(minimalTrait)).toBe(true)
  })

  // Test with invalid trait objects
  it('should return false for null', () => {
    expect(isTraitObject(null)).toBe(false)
  })

  it('should return false for undefined', () => {
    expect(isTraitObject(undefined)).toBe(false)
  })

  it('should return false for non-object values', () => {
    expect(isTraitObject('string')).toBe(false)
    expect(isTraitObject(123)).toBe(false)
    expect(isTraitObject(true)).toBe(false)
    expect(isTraitObject([1, 2, 3])).toBe(false)
  })

  it('should return false when missing required fields', () => {
    // Missing id
    expect(
      isTraitObject({
        trait: 'Thorns',
        definition: 'Sharp protective structures',
      })
    ).toBe(false)

    // Missing trait
    expect(
      isTraitObject({
        id: 'trait-3',
        definition: 'Sharp protective structures',
      })
    ).toBe(false)

    // Missing definition
    expect(
      isTraitObject({
        id: 'trait-4',
        trait: 'Thorns',
      })
    ).toBe(false)
  })

  it('should return false when required fields are empty strings', () => {
    expect(
      isTraitObject({
        id: '',
        trait: 'Thorns',
        definition: 'Sharp protective structures',
      })
    ).toBe(false)

    expect(
      isTraitObject({
        id: 'trait-5',
        trait: '',
        definition: 'Sharp protective structures',
      })
    ).toBe(false)

    expect(
      isTraitObject({
        id: 'trait-6',
        trait: 'Thorns',
        definition: '',
      })
    ).toBe(false)
  })

  it('should return false when required fields are whitespace strings', () => {
    expect(
      isTraitObject({
        id: '   ',
        trait: 'Thorns',
        definition: 'Sharp protective structures',
      })
    ).toBe(false)

    expect(
      isTraitObject({
        id: 'trait-7',
        trait: '  ',
        definition: 'Sharp protective structures',
      })
    ).toBe(false)

    expect(
      isTraitObject({
        id: 'trait-8',
        trait: 'Thorns',
        definition: '  ',
      })
    ).toBe(false)
  })

  it('should return false when required fields have wrong types', () => {
    expect(
      isTraitObject({
        id: 123,
        trait: 'Thorns',
        definition: 'Sharp protective structures',
      })
    ).toBe(false)

    expect(
      isTraitObject({
        id: 'trait-9',
        trait: true,
        definition: 'Sharp protective structures',
      })
    ).toBe(false)

    expect(
      isTraitObject({
        id: 'trait-10',
        trait: 'Thorns',
        definition: ['Sharp protective structures'],
      })
    ).toBe(false)
  })

  it('should return false when optional fields have wrong types', () => {
    // Wrong source type
    expect(
      isTraitObject({
        id: 'trait-11',
        trait: 'Thorns',
        definition: 'Sharp protective structures',
        source: 123,
      })
    ).toBe(false)

    // Wrong distractors type
    expect(
      isTraitObject({
        id: 'trait-12',
        trait: 'Thorns',
        definition: 'Sharp protective structures',
        distractors: 'Not thorns',
      })
    ).toBe(false)

    // Wrong morphology type
    expect(
      isTraitObject({
        id: 'trait-13',
        trait: 'Thorns',
        definition: 'Sharp protective structures',
        morphology: 'Stems',
      })
    ).toBe(false)

    // Wrong phenology type
    expect(
      isTraitObject({
        id: 'trait-14',
        trait: 'Thorns',
        definition: 'Sharp protective structures',
        phenology: 'All year',
      })
    ).toBe(false)

    // Wrong examples type
    expect(
      isTraitObject({
        id: 'trait-15',
        trait: 'Thorns',
        definition: 'Sharp protective structures',
        examples: 'Rose',
      })
    ).toBe(false)
  })
})

describe('validateTraitJson', () => {
  // Test with valid JSON
  it('should validate a valid trait JSON object', () => {
    const validTraitJson = JSON.stringify({
      id: 'trait-16',
      trait: 'Compound Leaves',
      definition: 'Leaves composed of multiple leaflets',
    })

    const result = validateTraitJson(validTraitJson)
    expect(result.isValid).toBe(true)
    expect(result.errors).toEqual([])
    expect(result.parsedData).toEqual([
      {
        id: 'trait-16',
        trait: 'Compound Leaves',
        definition: 'Leaves composed of multiple leaflets',
      },
    ])
  })

  it('should validate a valid trait JSON array', () => {
    const validTraitArrayJson = JSON.stringify([
      {
        id: 'trait-17',
        trait: 'Compound Leaves',
        definition: 'Leaves composed of multiple leaflets',
      },
      {
        id: 'trait-18',
        trait: 'Simple Leaves',
        definition: 'Leaves with a single blade',
      },
    ])

    const result = validateTraitJson(validTraitArrayJson)
    expect(result.isValid).toBe(true)
    expect(result.errors).toEqual([])
    expect(result.parsedData).toEqual([
      {
        id: 'trait-17',
        trait: 'Compound Leaves',
        definition: 'Leaves composed of multiple leaflets',
      },
      {
        id: 'trait-18',
        trait: 'Simple Leaves',
        definition: 'Leaves with a single blade',
      },
    ])
  })

  it('should validate a complete trait JSON with all optional fields', () => {
    const completeTraitJson = JSON.stringify({
      id: 'trait-19',
      trait: 'Deciduous',
      definition: 'Trees that shed their leaves annually',
      source: { name: 'Field Guide to Plants', url: '' },
      distractors: ['Evergreen', 'Semi-evergreen'],
      morphology: ['Leaf loss', 'Seasonal changes'],
      phenology: ['Fall', 'Winter'],
      examples: [
        {
          id: 'example-2',
          binomial: 'Quercus rubra',
          vernacularName: 'Red Oak',
          inaturalistUrl:
            'https://www.inaturalist.org/taxa/48734-Quercus-rubra',
        },
      ],
    })

    const result = validateTraitJson(completeTraitJson)
    expect(result.isValid).toBe(true)
    expect(result.errors).toEqual([])
  })

  // Test with invalid JSON
  it('should reject non-JSON strings', () => {
    const notJsonString = 'This is not JSON'
    const result = validateTraitJson(notJsonString)
    expect(result.isValid).toBe(false)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0]).toContain('Invalid JSON')
  })

  it('should reject empty strings', () => {
    const emptyString = ''
    const result = validateTraitJson(emptyString)
    expect(result.isValid).toBe(false)
    expect(result.errors).toEqual(['JSON string is empty'])
  })

  it('should reject whitespace-only strings', () => {
    const whitespaceString = '   '
    const result = validateTraitJson(whitespaceString)
    expect(result.isValid).toBe(false)
    expect(result.errors).toEqual(['JSON string is empty'])
  })

  it('should reject malformed JSON', () => {
    const malformedJson =
      '{"id": "trait-20", "trait": "Serrated Leaves", definition: "Leaves with toothed edges"}'
    const result = validateTraitJson(malformedJson)
    expect(result.isValid).toBe(false)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0]).toContain('Invalid JSON')
  })

  // Test with missing required fields
  it('should detect missing required fields', () => {
    // Missing id
    const missingIdJson = JSON.stringify({
      trait: 'Serrated Leaves',
      definition: 'Leaves with toothed edges',
    })
    const missingIdResult = validateTraitJson(missingIdJson)
    expect(missingIdResult.isValid).toBe(false)
    expect(missingIdResult.errors).toContain(
      'Item 0: Missing required field: id'
    )

    // Missing trait
    const missingTraitJson = JSON.stringify({
      id: 'trait-21',
      definition: 'Leaves with toothed edges',
    })
    const missingTraitResult = validateTraitJson(missingTraitJson)
    expect(missingTraitResult.isValid).toBe(false)
    expect(missingTraitResult.errors).toContain(
      'Item 0: Missing required field: trait'
    )

    // Missing definition
    const missingDefinitionJson = JSON.stringify({
      id: 'trait-22',
      trait: 'Serrated Leaves',
    })
    const missingDefinitionResult = validateTraitJson(missingDefinitionJson)
    expect(missingDefinitionResult.isValid).toBe(false)
    expect(missingDefinitionResult.errors).toContain(
      'Item 0: Missing required field: definition'
    )
  })

  // Test with invalid field types
  it('should detect invalid field types', () => {
    // Invalid id type
    const invalidIdTypeJson = JSON.stringify({
      id: 123,
      trait: 'Serrated Leaves',
      definition: 'Leaves with toothed edges',
    })
    const invalidIdResult = validateTraitJson(invalidIdTypeJson)
    expect(invalidIdResult.isValid).toBe(false)
    expect(invalidIdResult.errors).toContain(
      'Item 0: Field "id" must be a string'
    )

    // Invalid trait type
    const invalidTraitTypeJson = JSON.stringify({
      id: 'trait-23',
      trait: true,
      definition: 'Leaves with toothed edges',
    })
    const invalidTraitResult = validateTraitJson(invalidTraitTypeJson)
    expect(invalidTraitResult.isValid).toBe(false)
    expect(invalidTraitResult.errors).toContain(
      'Item 0: Field "trait" must be a string'
    )

    // Invalid definition type
    const invalidDefinitionTypeJson = JSON.stringify({
      id: 'trait-24',
      trait: 'Serrated Leaves',
      definition: ['Leaves with toothed edges'],
    })
    const invalidDefinitionResult = validateTraitJson(invalidDefinitionTypeJson)
    expect(invalidDefinitionResult.isValid).toBe(false)
    expect(invalidDefinitionResult.errors).toContain(
      'Item 0: Field "definition" must be a string'
    )
  })

  // Test for array validation errors
  it('should provide specific errors for each item in an array', () => {
    const mixedValidityArrayJson = JSON.stringify([
      {
        id: 'trait-25',
        trait: 'Serrated Leaves',
        definition: 'Leaves with toothed edges',
      },
      {
        // Missing id
        trait: 'Lobed Leaves',
        definition: 'Leaves with rounded projections',
      },
      {
        id: 'trait-26',
        // Missing trait
        definition: 'Leaves with parallel veins',
      },
    ])

    const result = validateTraitJson(mixedValidityArrayJson)
    expect(result.isValid).toBe(false)
    expect(result.errors.length).toBe(2)
    expect(result.errors).toContain('Item 1: Missing required field: id')
    expect(result.errors).toContain('Item 2: Missing required field: trait')
  })

  // Test for empty required fields
  it('should detect empty required fields', () => {
    const emptyFieldsJson = JSON.stringify({
      id: '',
      trait: 'Serrated Leaves',
      definition: 'Leaves with toothed edges',
    })
    const result = validateTraitJson(emptyFieldsJson)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Item 0: Field "id" cannot be empty')
  })

  // Test for invalid optional field types
  it('should detect invalid optional field types', () => {
    const invalidOptionalFieldsJson = JSON.stringify({
      id: 'trait-27',
      trait: 'Serrated Leaves',
      definition: 'Leaves with toothed edges',
      source: 123, // Should be object
      distractors: 'not an array', // Should be array
    })
    const result = validateTraitJson(invalidOptionalFieldsJson)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Item 0: Field "source" must be an object')
    expect(result.errors).toContain(
      'Item 0: Field "distractors" must be an array'
    )
  })

  // Test for non-object JSON
  it('should reject non-object JSON values', () => {
    const numberJson = JSON.stringify(123)
    const numberResult = validateTraitJson(numberJson)
    expect(numberResult.isValid).toBe(false)
    expect(numberResult.errors).toContain('Item 0: Not a valid object')

    const stringJson = JSON.stringify('Just a string')
    const stringResult = validateTraitJson(stringJson)
    expect(stringResult.isValid).toBe(false)
    expect(stringResult.errors).toContain('Item 0: Not a valid object')
  })
})
