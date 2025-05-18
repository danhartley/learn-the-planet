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
export function validateTermJson(jsonString: string): ValidationResult<Term> {
  // Skip empty input
  if (!jsonString.trim()) {
    return {
      isValid: false,
      errors: ['JSON string is empty'],
    }
  }

  try {
    // Step 1: Try to parse the JSON
    const parsedJSON = JSON.parse(jsonString)
    const errors: string[] = []

    // Step 2: Check if JSON is an array or single object
    const isArray = Array.isArray(parsedJSON)
    const itemsToValidate = isArray ? parsedJSON : [parsedJSON]

    // Step 3: Validate each item
    itemsToValidate.forEach((item: any, index: number) => {
      // Use isTermObject directly - if valid, no need to check anything else
      if (isTermObject(item)) {
        return // This item is valid, continue to next item
      }

      // Item is invalid, collect specific errors
      let hasSpecificErrors = false

      // Check required fields
      if (!item || typeof item !== 'object' || Array.isArray(item)) {
        errors.push(`Item ${index}: Not a valid object`)
        return // Skip further checks if not even an object
      }

      // Check required fields
      if (!item.id && item.id !== '') {
        errors.push(`Item ${index}: Missing required field: id`)
        hasSpecificErrors = true
      } else if (typeof item.id !== 'string') {
        errors.push(`Item ${index}: Field "id" must be a string`)
        hasSpecificErrors = true
      } else if (item.id.trim() === '') {
        errors.push(`Item ${index}: Field "id" cannot be empty`)
        hasSpecificErrors = true
      }

      if (!item.term && item.term !== '') {
        errors.push(`Item ${index}: Missing required field: term`)
        hasSpecificErrors = true
      } else if (typeof item.term !== 'string') {
        errors.push(`Item ${index}: Field "term" must be a string`)
        hasSpecificErrors = true
      } else if (item.term.trim() === '') {
        errors.push(`Item ${index}: Field "term" cannot be empty`)
        hasSpecificErrors = true
      }

      if (!item.definition && item.definition !== '') {
        errors.push(`Item ${index}: Missing required field: definition`)
        hasSpecificErrors = true
      } else if (typeof item.definition !== 'string') {
        errors.push(`Item ${index}: Field "definition" must be a string`)
        hasSpecificErrors = true
      } else if (item.definition.trim() === '') {
        errors.push(`Item ${index}: Field "definition" cannot be empty`)
        hasSpecificErrors = true
      }

      // Check optional fields
      if (item.source !== undefined && typeof item.source !== 'string') {
        errors.push(`Item ${index}: Field "source" must be a string`)
        hasSpecificErrors = true
      }

      if (item.example !== undefined && typeof item.example !== 'string') {
        errors.push(`Item ${index}: Field "example" must be a string`)
        hasSpecificErrors = true
      }

      if (item.distractors !== undefined && !Array.isArray(item.distractors)) {
        errors.push(`Item ${index}: Field "distractors" must be an array`)
        hasSpecificErrors = true
      }

      // If no specific errors were found but isTermObject still failed, add generic error
      if (!hasSpecificErrors) {
        errors.push(
          `Item ${index}: Object does not match Term interface structure`
        )
      }
    })

    // Step 4: Return appropriate result based on validation
    if (errors.length > 0) {
      return {
        isValid: false,
        errors,
      }
    }

    // All checks passed
    return {
      isValid: true,
      parsedData: isArray ? parsedJSON : parsedJSON[0], // Return in original format
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
