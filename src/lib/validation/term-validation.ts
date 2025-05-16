import { ValidationResult } from '@/types'
import { Term } from '@/types'

/**
 * Type guard to check if an object is a valid Term
 * @param obj - The object to check
 * @returns Boolean indicating whether the object conforms to the Term interface
 */
export const isTermObject = (obj: any): obj is Term => {
  // Check if obj is an object and not null
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return false
  }

  // Check required fields exist and have correct types
  if (typeof obj.id !== 'string' || obj.id.trim() === '') {
    return false
  }

  if (typeof obj.term !== 'string' || obj.term.trim() === '') {
    return false
  }

  if (typeof obj.definition !== 'string' || obj.definition.trim() === '') {
    return false
  }

  // Check optional fields have correct types if present
  if (obj.source !== undefined && typeof obj.source !== 'string') {
    return false
  }

  if (obj.example !== undefined && typeof obj.example !== 'string') {
    return false
  }

  if (obj.distractors !== undefined && !Array.isArray(obj.distractors)) {
    return false
  }

  // All checks passed
  return true
}

/**
 * Validates if a JSON string represents a valid Term object
 * @param jsonString - The JSON string to validate
 * @returns A ValidationResult object
 */
export function validateTermJson(jsonString: string): ValidationResult {
  const errors: string[] = []

  // Skip empty input
  if (!jsonString.trim()) {
    return {
      isValid: false,
      errors: ['JSON string is empty'],
    }
  }

  try {
    // Step 1: Try to parse the JSON
    let parsedJSON = JSON.parse(jsonString)

    // Step 2: Check if JSON is an array
    const isArray = Array.isArray(parsedJSON)
    if (isArray) parsedJSON = [...parsedJSON]

    parsedJSON.forEach((item: any) => {
      if (!isTermObject(item)) {
        // Add more specific errors by checking each required field
        if (!item.id) errors.push('Missing required field: id')
        else if (typeof item.id !== 'string')
          errors.push('Field "id" must be a string')

        if (!item.term) errors.push('Missing required field: term')
        else if (typeof item.term !== 'string')
          errors.push('Field "term" must be a string')

        if (!item.definition) errors.push('Missing required field: definition')
        else if (typeof item.definition !== 'string')
          errors.push('Field "definition" must be a string')

        if (item.source !== undefined && typeof item.source !== 'string') {
          errors.push('Field "source" must be a string')
        }

        if (
          parsedJSON.example !== undefined &&
          typeof parsedJSON.example !== 'string'
        ) {
          errors.push('Field "example" must be a string')
        }

        if (
          parsedJSON.distractors !== undefined &&
          !Array.isArray(parsedJSON.distractors)
        ) {
          errors.push('Field "distractors" must be an array')
        }

        // If no specific errors were added, add a generic error
        if (errors.length === 0) {
          errors.push('Object does not match Term interface structure')
        }

        return {
          isValid: false,
          errors,
        }
      }
    })
    // Step 3: Check if it's a valid Term object

    // All checks passed
    return {
      isValid: true,
      parsedData: parsedJSON,
      errors: [],
    }
  } catch (error) {
    // JSON parsing error
    return {
      isValid: false,
      errors: [
        `Invalid JSON: ${error instanceof Error ? error.message : String(error)}`,
      ],
    }
  }
}
