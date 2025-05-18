import { ValidationResult } from '@/types'
import { Taxon } from '@/types'

/**
 * Type guard to check if an object is a valid Taxon
 * @param obj - The object to check
 * @returns Boolean indicating whether the object conforms to the Taxon interface
 */
export const isTaxonObject = (obj: any): obj is Taxon => {
  // Check if obj is an object and not null
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return false
  }

  // Check required fields exist and have correct types
  if (typeof obj.id !== 'string' || obj.id.trim() === '') {
    return false
  }

  if (
    typeof obj.vernacularName !== 'string' ||
    obj.vernacularName.trim() === ''
  ) {
    return false
  }

  if (typeof obj.binomial !== 'string' || obj.binomial.trim() === '') {
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

  if (obj.wikipediaUrl !== undefined && typeof obj.wikipediaUrl !== 'string') {
    return false
  }

  if (
    obj.inaturalistUrl !== undefined &&
    typeof obj.inaturalistUrl !== 'string'
  ) {
    return false
  }

  // All checks passed
  return true
}

/**
 * Validates if a JSON string represents a valid Taxon object
 * @param jsonString - The JSON string to validate
 * @returns A ValidationResult object
 */
export function validateTaxonJson(jsonString: string): ValidationResult<Taxon> {
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
      // Use isTaxonObject directly - if valid, no need to check anything else
      if (isTaxonObject(item)) {
        return // This item is valid, continue to next item
      }

      // Item is invalid, collect specific errors
      let hasSpecificErrors = false

      // Check if it's even an object
      if (!item || typeof item !== 'object' || Array.isArray(item)) {
        errors.push(`Item ${index}: Not a valid object`)
        return // Skip further checks if not even an object
      }

      // Check required fields
      if (!item.id) {
        errors.push(`Item ${index}: Missing required field: id`)
        hasSpecificErrors = true
      } else if (typeof item.id !== 'string') {
        errors.push(`Item ${index}: Field "id" must be a string`)
        hasSpecificErrors = true
      } else if (item.id.trim() === '') {
        errors.push(`Item ${index}: Field "id" cannot be empty`)
        hasSpecificErrors = true
      }

      if (!item.vernacularName && item.vernacularName !== '') {
        errors.push(`Item ${index}: Missing required field: vernacularName`)
        hasSpecificErrors = true
      } else if (typeof item.vernacularName !== 'string') {
        errors.push(`Item ${index}: Field "vernacularName" must be a string`)
        hasSpecificErrors = true
      } else if (item.vernacularName.trim() === '') {
        errors.push(`Item ${index}: Field "vernacularName" cannot be empty`)
        hasSpecificErrors = true
      }

      if (!item.binomial && item.binomial !== '') {
        errors.push(`Item ${index}: Missing required field: binomial`)
        hasSpecificErrors = true
      } else if (typeof item.binomial !== 'string') {
        errors.push(`Item ${index}: Field "binomial" must be a string`)
        hasSpecificErrors = true
      } else if (item.binomial.trim() === '') {
        errors.push(`Item ${index}: Field "binomial" cannot be empty`)
        hasSpecificErrors = true
      }

      if (
        item.wikipediaUrl !== undefined &&
        typeof item.wikipediaUrl !== 'string'
      ) {
        errors.push(`Item ${index}: Field "wikipediaUrl" must be a string`)
        hasSpecificErrors = true
      }

      if (
        item.inaturalistUrl !== undefined &&
        typeof item.inaturalistUrl !== 'string'
      ) {
        errors.push(`Item ${index}: Field "inaturalistUrl" must be a string`)
        hasSpecificErrors = true
      }

      if (item.distractors !== undefined && !Array.isArray(item.distractors)) {
        errors.push(`Item ${index}: Field "distractors" must be an array`)
        hasSpecificErrors = true
      }

      // If no specific errors were found but isTaxonObject still failed, add generic error
      if (!hasSpecificErrors) {
        errors.push(
          `Item ${index}: Object does not match Taxon interface structure`
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
