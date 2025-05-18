import { ValidationResult } from '@/types'
import { Trait } from '@/types'

/**
 * Type guard to check if an object is a valid Trait
 * @param obj - The object to check
 * @returns Boolean indicating whether the object conforms to the Trait interface
 */
export const isTraitObject = (obj: any): obj is Trait => {
  // Check if obj is an object and not null
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return false
  }

  // Check required fields exist and have correct types
  if (typeof obj.id !== 'string' || obj.id.trim() === '') {
    return false
  }

  if (typeof obj.trait !== 'string' || obj.trait.trim() === '') {
    return false
  }

  if (typeof obj.definition !== 'string' || obj.definition.trim() === '') {
    return false
  }

  // Check optional fields have correct types if present
  if (obj.source !== undefined && typeof obj.source !== 'string') {
    return false
  }

  if (obj.distractors !== undefined && !Array.isArray(obj.distractors)) {
    return false
  }

  if (obj.morphology !== undefined && !Array.isArray(obj.morphology)) {
    return false
  }

  if (obj.phenology !== undefined && !Array.isArray(obj.phenology)) {
    return false
  }

  if (obj.examples !== undefined && !Array.isArray(obj.examples)) {
    return false
  }

  // All checks passed
  return true
}

/**
 * Validates if a JSON string represents a valid Trait object
 * @param jsonString - The JSON string to validate
 * @returns A ValidationResult object
 */
export function validateTraitJson(jsonString: string): ValidationResult<Trait> {
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
      // Use isTraitObject directly - if valid, no need to check anything else
      if (isTraitObject(item)) {
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

      if (!item.trait && item.trait !== '') {
        errors.push(`Item ${index}: Missing required field: trait`)
        hasSpecificErrors = true
      } else if (typeof item.trait !== 'string') {
        errors.push(`Item ${index}: Field "trait" must be a string`)
        hasSpecificErrors = true
      } else if (item.trait.trim() === '') {
        errors.push(`Item ${index}: Field "trait" cannot be empty`)
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

      if (item.distractors !== undefined && !Array.isArray(item.distractors)) {
        errors.push(`Item ${index}: Field "distractors" must be an array`)
        hasSpecificErrors = true
      }

      if (item.morphology !== undefined && !Array.isArray(item.morphology)) {
        errors.push(`Item ${index}: Field "morphology" must be an array`)
        hasSpecificErrors = true
      }

      if (item.phenology !== undefined && !Array.isArray(item.phenology)) {
        errors.push(`Item ${index}: Field "phenology" must be an array`)
        hasSpecificErrors = true
      }

      if (item.examples !== undefined && !Array.isArray(item.examples)) {
        errors.push(`Item ${index}: Field "examples" must be an array`)
        hasSpecificErrors = true
      }

      // If no specific errors were found but isTraitObject still failed, add generic error
      if (!hasSpecificErrors) {
        errors.push(
          `Item ${index}: Object does not match Trait interface structure`
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
