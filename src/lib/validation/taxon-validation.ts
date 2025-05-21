import { ValidationResult } from '@/types'
import { Taxon } from '@/types'

/**
 * Type guard to check if an object is a valid Taxon
 * @param obj - The object to check
 * @returns Boolean indicating whether the object conforms to the Taxon interface
 */
export const isTaxonObject = (obj: unknown): obj is Taxon => {
  // Check if obj is an object and not null
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return false
  }

  // Check required fields exist and have correct types
  const o = obj as Record<string, unknown>

  if (typeof o.id !== 'string' || (o.id as string).trim() === '') {
    return false
  }

  if (
    typeof o.vernacularName !== 'string' ||
    (o.vernacularName as string).trim() === ''
  ) {
    return false
  }

  if (typeof o.binomial !== 'string' || (o.binomial as string).trim() === '') {
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

  if (o.wikipediaUrl !== undefined && typeof o.wikipediaUrl !== 'string') {
    return false
  }

  if (o.inaturalistUrl !== undefined && typeof o.inaturalistUrl !== 'string') {
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
    itemsToValidate.forEach((item: unknown, index: number) => {
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

      if (!obj.vernacularName && obj.vernacularName !== '') {
        errors.push(`Item ${index}: Missing required field: vernacularName`)
        hasSpecificErrors = true
      } else if (typeof obj.vernacularName !== 'string') {
        errors.push(`Item ${index}: Field "vernacularName" must be a string`)
        hasSpecificErrors = true
      } else if ((obj.vernacularName as string).trim() === '') {
        errors.push(`Item ${index}: Field "vernacularName" cannot be empty`)
        hasSpecificErrors = true
      }

      if (!obj.binomial && obj.binomial !== '') {
        errors.push(`Item ${index}: Missing required field: binomial`)
        hasSpecificErrors = true
      } else if (typeof obj.binomial !== 'string') {
        errors.push(`Item ${index}: Field "binomial" must be a string`)
        hasSpecificErrors = true
      } else if ((obj.binomial as string).trim() === '') {
        errors.push(`Item ${index}: Field "binomial" cannot be empty`)
        hasSpecificErrors = true
      }

      if (
        obj.wikipediaUrl !== undefined &&
        typeof obj.wikipediaUrl !== 'string'
      ) {
        errors.push(`Item ${index}: Field "wikipediaUrl" must be a string`)
        hasSpecificErrors = true
      }

      if (
        obj.inaturalistUrl !== undefined &&
        typeof obj.inaturalistUrl !== 'string'
      ) {
        errors.push(`Item ${index}: Field "inaturalistUrl" must be a string`)
        hasSpecificErrors = true
      }

      if (obj.distractors !== undefined && !Array.isArray(obj.distractors)) {
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
