import { ValidationResult } from '@/types'
import { Topic, Credit } from '@/types'

/**
 * Type guard to check if an object is a valid Topic
 * @param obj - The object to check
 * @returns Boolean indicating whether the object conforms to the Topic interface
 */
export const isCreditObject = (obj: any): obj is Credit => {
  // Check if obj is an object and not null or array
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return false
  }

  // Check Credit fields exist and have correct types
  if (typeof obj.title !== 'string') return false
  if (typeof obj.source !== 'string') return false
  if (!Array.isArray(obj.authors)) return false

  // All checks passed
  return true
}

/**
 * Type guard to check if an object is a valid Topic
 * @param obj - The object to check
 * @returns Boolean indicating whether the object conforms to the Topic interface
 */
export const isTopicObject = (obj: any): obj is Topic => {
  // Check if obj is an object and not null
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return false
  }

  // Check required fields exist and have correct types
  if (typeof obj.id !== 'string' || obj.id.trim() === '') {
    return false
  }

  if (typeof obj.topic !== 'string' || obj.topic.trim() === '') {
    return false
  }

  if (
    obj.text === undefined ||
    (obj.text !== undefined && !Array.isArray(obj.text))
  ) {
    return false
  }

  // Check optional fields have correct types if present
  // Check credit field if present
  if (obj.credit !== undefined) {
    if (!isCreditObject(obj.credit)) {
      return false
    }
  }

  if (obj.distractors !== undefined && !Array.isArray(obj.distractors)) {
    return false
  }

  // All checks passed
  return true
}

/**
 * Validates if a JSON string represents a valid Topic object
 * @param jsonString - The JSON string to validate
 * @returns A ValidationResult object
 */
export function validateTopicJson(jsonString: string): ValidationResult<Topic> {
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
      // Use isTopicObject directly - if valid, no need to check anything else
      if (isTopicObject(item)) {
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

      if (!item.topic && item.topic !== '') {
        errors.push(`Item ${index}: Missing required field: topic`)
        hasSpecificErrors = true
      } else if (typeof item.topic !== 'string') {
        errors.push(`Item ${index}: Field "topic" must be a string`)
        hasSpecificErrors = true
      } else if (item.topic.trim() === '') {
        errors.push(`Item ${index}: Field "topic" cannot be empty`)
        hasSpecificErrors = true
      }

      if (item.text === undefined) {
        errors.push(`Item ${index}: Missing required field: text`)
        hasSpecificErrors = true
      } else if (!Array.isArray(item.text)) {
        errors.push(`Item ${index}: Field "text" must be an array`)
        hasSpecificErrors = true
      }

      // Check optional fields

      if (item.distractors !== undefined && !Array.isArray(item.distractors)) {
        errors.push(`Item ${index}: Field "distractors" must be an array`)
        hasSpecificErrors = true
      }

      // Check credit object if present
      if (item.credit !== undefined) {
        if (typeof item.credit !== 'object' || Array.isArray(item.credit)) {
          errors.push(`Item ${index}: Field "credit" must be an object`)
          hasSpecificErrors = true
        } else {
          // Check each required property of the Credit type
          const credit = item.credit

          if (typeof credit.title !== 'string') {
            errors.push(`Item ${index}: Field "credit.title" must be a string`)
            hasSpecificErrors = true
          }

          if (typeof credit.source !== 'string') {
            errors.push(`Item ${index}: Field "credit.source" must be a string`)
            hasSpecificErrors = true
          }

          if (!Array.isArray(credit.authors)) {
            errors.push(
              `Item ${index}: Field "credit.authors" must be an array`
            )
            hasSpecificErrors = true
          }
        }
      }

      // If no specific errors were found but isTopicObject still failed, add generic error
      if (!hasSpecificErrors) {
        errors.push(
          `Item ${index}: Object does not match Topic interface structure`
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
