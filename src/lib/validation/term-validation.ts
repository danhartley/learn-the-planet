import { ValidationResult } from '@/types'
import { Term } from '@/types'

/**
 * Type guard to check if an object is a valid Term
 * @param obj - The object to check
 * @returns Boolean indicating whether the object conforms to the Term interface
 */
export const isTermObject = (obj: unknown): obj is Term => {
  // Check if obj is an object and not null
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return false
  }

  // Check required fields exist and have correct types
  const o = obj as Record<string, unknown>

  if (typeof o.id !== 'string' || (o.id as string).trim() === '') {
    return false
  }

  if (typeof o.term !== 'string' || (o.term as string).trim() === '') {
    return false
  }

  if (
    typeof o.definition !== 'string' ||
    (o.definition as string).trim() === ''
  ) {
    return false
  }

  // Check optional fields have correct types if present
  if (o.source !== undefined && typeof o.source !== 'string') {
    return false
  }

  if (o.example !== undefined && typeof o.example !== 'string') {
    return false
  }

  if (o.distractors !== undefined && !Array.isArray(o.distractors)) {
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
    itemsToValidate.forEach((item: unknown, index: number) => {
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

      // Cast item to Record<string, unknown> for property access
      const obj = item as Record<string, unknown>

      // Check required fields
      if (!obj.id && obj.id !== '') {
        errors.push(`Item ${index}: Missing required field: id`)
        hasSpecificErrors = true
      } else if (typeof obj.id !== 'string') {
        errors.push(`Item ${index}: Field "id" must be a string`)
        hasSpecificErrors = true
      } else if ((obj.id as string).trim() === '') {
        errors.push(`Item ${index}: Field "id" cannot be empty`)
        hasSpecificErrors = true
      }

      if (!obj.term && obj.term !== '') {
        errors.push(`Item ${index}: Missing required field: term`)
        hasSpecificErrors = true
      } else if (typeof obj.term !== 'string') {
        errors.push(`Item ${index}: Field "term" must be a string`)
        hasSpecificErrors = true
      } else if ((obj.term as string).trim() === '') {
        errors.push(`Item ${index}: Field "term" cannot be empty`)
        hasSpecificErrors = true
      }

      if (!obj.definition && obj.definition !== '') {
        errors.push(`Item ${index}: Missing required field: definition`)
        hasSpecificErrors = true
      } else if (typeof obj.definition !== 'string') {
        errors.push(`Item ${index}: Field "definition" must be a string`)
        hasSpecificErrors = true
      } else if ((obj.definition as string).trim() === '') {
        errors.push(`Item ${index}: Field "definition" cannot be empty`)
        hasSpecificErrors = true
      }

      // Check optional fields
      if (obj.source !== undefined && typeof obj.source !== 'string') {
        errors.push(`Item ${index}: Field "source" must be a string`)
        hasSpecificErrors = true
      }

      if (obj.example !== undefined && typeof obj.example !== 'string') {
        errors.push(`Item ${index}: Field "example" must be a string`)
        hasSpecificErrors = true
      }

      if (obj.distractors !== undefined && !Array.isArray(obj.distractors)) {
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
    console.log('parsedJSON', parsedJSON)
    return {
      isValid: true,
      parsedData: isArray ? parsedJSON[0] : parsedJSON, // Return in original format
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
