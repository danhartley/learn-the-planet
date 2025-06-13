import { ValidationResult } from '@/types'
import { Topic, Credit } from '@/types'
import { isTextType, isTaxon, isNextCloudImage } from '@/type-guards'

/**
 * Type guard to check if an object is a valid Credit
 * @param obj - The object to check
 * @returns Boolean indicating whether the object conforms to the Credit interface
 */
export const isCreditObject = (obj: unknown): obj is Credit => {
  // Check if obj is an object and not null or array
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return false
  }

  // Check Credit fields exist and have correct types
  if (typeof (obj as { title?: unknown }).title !== 'string') return false
  if (typeof (obj as { source?: unknown }).source !== 'string') return false
  // The authors field is optional, but if present must be an array
  if (
    (obj as { authors?: unknown }).authors !== undefined &&
    !Array.isArray((obj as { authors?: unknown }).authors)
  )
    return false

  // All checks passed
  return true
}

/**
 * Type guard to check if an object is a valid Topic
 * @param obj - The object to check
 * @returns Boolean indicating whether the object conforms to the Topic interface
 */
export const isTopicObject = (obj: unknown): obj is Topic => {
  // Check if obj is an object and not null
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return false
  }

  // Check required fields from LearningItem (assuming id is required)
  if (
    !('id' in obj) ||
    typeof (obj as { id: unknown }).id !== 'string' ||
    (obj as { id: string }).id.trim() === ''
  ) {
    return false
  }

  // Check optional fields have correct types if present
  if (
    (obj as { name?: unknown }).name !== undefined &&
    typeof (obj as { name?: unknown }).name !== 'string'
  ) {
    return false
  }

  if (
    (obj as { topic?: unknown }).topic !== undefined &&
    typeof (obj as { topic?: unknown }).topic !== 'string'
  ) {
    return false
  }

  if (
    (obj as { text?: unknown }).text !== undefined &&
    !Array.isArray((obj as { text?: unknown }).text)
  ) {
    return false
  }

  // Check credit field if present
  if ((obj as { credit?: unknown }).credit !== undefined) {
    if (!isCreditObject((obj as { credit?: unknown }).credit)) {
      return false
    }
  }

  // Check type field if present
  if (
    (obj as { type?: unknown }).type !== undefined &&
    !isTextType((obj as { type?: unknown }).type)
  ) {
    return false
  }

  // Check examples field if present
  if ((obj as { examples?: unknown }).examples !== undefined) {
    const examples = (obj as { examples?: unknown }).examples
    if (!Array.isArray(examples)) {
      return false
    }
    // Check each example is a valid Taxon
    for (const example of examples) {
      if (!isTaxon(example)) {
        return false
      }
    }
  }

  // Check images field if present
  if ((obj as { images?: unknown }).images !== undefined) {
    const images = (obj as { images?: unknown }).images
    if (!Array.isArray(images)) {
      return false
    }
    // Check each image is a valid NextCloudImage
    for (const image of images) {
      if (!isNextCloudImage(image)) {
        return false
      }
    }
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
    itemsToValidate.forEach((item: unknown, index: number) => {
      // Use isTopicObject directly - if valid, no need to check anything else
      if (isTopicObject(item)) {
        return // This item is valid, continue to next item
      }

      // Item is invalid, collect specific errors
      let hasSpecificErrors = false

      // Check if it's a valid object
      if (!item || typeof item !== 'object' || Array.isArray(item)) {
        errors.push(`Item ${index}: Not a valid object`)
        return // Skip further checks if not even an object
      }

      // Check required field (id from LearningItem)
      if (
        !(item as { id?: unknown }).id &&
        (item as { id?: unknown }).id !== ''
      ) {
        errors.push(`Item ${index}: Missing required field: id`)
        hasSpecificErrors = true
      } else if (typeof (item as { id?: unknown }).id !== 'string') {
        errors.push(`Item ${index}: Field "id" must be a string`)
        hasSpecificErrors = true
      } else if ((item as { id: string }).id.trim() === '') {
        errors.push(`Item ${index}: Field "id" cannot be empty`)
        hasSpecificErrors = true
      }

      // Check optional fields
      if (
        (item as { name?: unknown }).name !== undefined &&
        typeof (item as { name?: unknown }).name !== 'string'
      ) {
        errors.push(`Item ${index}: Field "name" must be a string`)
        hasSpecificErrors = true
      }

      if (
        (item as { topic?: unknown }).topic !== undefined &&
        typeof (item as { topic?: unknown }).topic !== 'string'
      ) {
        errors.push(`Item ${index}: Field "topic" must be a string`)
        hasSpecificErrors = true
      }

      if (
        (item as { text?: unknown }).text !== undefined &&
        !Array.isArray((item as { text?: unknown }).text)
      ) {
        errors.push(`Item ${index}: Field "text" must be an array`)
        hasSpecificErrors = true
      }

      if ((item as { examples?: unknown }).examples !== undefined) {
        const examples = (item as { examples?: unknown }).examples
        if (!Array.isArray(examples)) {
          errors.push(`Item ${index}: Field "examples" must be an array`)
          hasSpecificErrors = true
        } else {
          // Check each example
          examples.forEach((example, exampleIndex) => {
            if (!isTaxon(example)) {
              errors.push(
                `Item ${index}: examples[${exampleIndex}] is not a valid Taxon object`
              )
              hasSpecificErrors = true
            }
          })
        }
      }

      if ((item as { images?: unknown }).images !== undefined) {
        const images = (item as { images?: unknown }).images
        if (!Array.isArray(images)) {
          errors.push(`Item ${index}: Field "images" must be an array`)
          hasSpecificErrors = true
        } else {
          // Check each image
          images.forEach((image, imageIndex) => {
            if (!isNextCloudImage(image)) {
              errors.push(
                `Item ${index}: images[${imageIndex}] is not a valid NextCloudImage object`
              )
              hasSpecificErrors = true
            }
          })
        }
      }

      // Check credit object if present
      if ((item as { credit?: unknown }).credit !== undefined) {
        const credit = (item as { credit?: unknown }).credit
        if (typeof credit !== 'object' || Array.isArray(credit)) {
          errors.push(`Item ${index}: Field "credit" must be an object`)
          hasSpecificErrors = true
        } else {
          // Check each required property of the Credit type
          if (typeof (credit as { title?: unknown }).title !== 'string') {
            errors.push(`Item ${index}: Field "credit.title" must be a string`)
            hasSpecificErrors = true
          }

          if (typeof (credit as { source?: unknown }).source !== 'string') {
            errors.push(`Item ${index}: Field "credit.source" must be a string`)
            hasSpecificErrors = true
          }

          if (
            (credit as { authors?: unknown }).authors !== undefined &&
            !Array.isArray((credit as { authors?: unknown }).authors)
          ) {
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
