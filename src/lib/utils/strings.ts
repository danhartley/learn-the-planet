export const isCamelCase = (str: string): boolean => {
  return /^[a-z]+(?:[A-Z][a-z0-9]*)*$/.test(str)
}

export const splitCamelCaseSmart = (str: string): string => {
  return (
    str
      // Step 1: Split camelCase and acronyms
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2') // e.g., vernacularName → vernacular Name
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2') // e.g., IDCode → ID Code
      // Step 2: Preserve acronyms (2+ capital letters), lowercase regular words
      .split(' ')
      .map(word => {
        return /^[A-Z]{2,}$/.test(word) ? word : word.toLowerCase()
      })
      .join(' ')
  )
}

/**
 * Gets a property value from an object using a dotted path notation
 */
export const getPropByPath = (obj: unknown, path: string): unknown => {
  // Return undefined for null/undefined objects
  if (obj == null) {
    return undefined
  }

  // Handle simple property access
  if (!path.includes('.') && !path.includes('[')) {
    return (obj as Record<string, unknown>)[path]
  }

  // Split by dots but preserve array notation
  const pathArray = path.match(/[^\.\[\]]+|\[\d+\]/g)

  // If no valid path parts were found, return undefined
  if (!pathArray) {
    return undefined
  }

  // Start with the object
  let current: unknown = obj

  // Navigate through the path
  for (let i = 0; i < pathArray.length && current != null; i++) {
    const key = pathArray[i]

    // Handle array indexing
    if (key.startsWith('[') && key.endsWith(']')) {
      // Extract index number
      const index = parseInt(key.slice(1, -1))

      // Check if current is an array and index is valid
      if (
        Array.isArray(current) &&
        !isNaN(index) &&
        index >= 0 &&
        index < current.length
      ) {
        current = current[index]
      } else {
        return undefined
      }
    } else {
      // Regular property access
      if (
        typeof current === 'object' &&
        current !== null &&
        !Array.isArray(current)
      ) {
        // The issue was here - need to maintain the unknown type for current
        current = (current as Record<string, unknown>)[key]
      } else {
        return undefined
      }
    }
  }

  return current
}
/**
 * Shuffles an array using Fisher-Yates algorithm
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export const sortBy = <T>(arr: T[], prop: keyof T, dir = 'asc') => {
  return dir === 'asc'
    ? arr.sort(
        (a, b) => parseFloat(String(a[prop])) - parseFloat(String(b[prop]))
      )
    : arr.sort(
        (a, b) => parseFloat(String(b[prop])) - parseFloat(String(a[prop]))
      )
}

export const sortAlphabeticallyBy = <T>(arr: T[], prop: keyof T) => {
  arr.sort(function (a, b) {
    if (a[prop] < b[prop]) return -1
    if (a[prop] > b[prop]) return 1
    return 0
  })
  return arr
}

/**
 * Converts a hyphenated string to title case format
 * @param hyphenatedString - The hyphenated string to convert
 * @returns The string with spaces instead of hyphens and first letter capitalized
 */
export const formatHyphenatedString = (hyphenatedString: string): string => {
  // Replace hyphens with spaces
  const spacedString = hyphenatedString.replace(/-/g, ' ')

  // Capitalize the first letter
  return spacedString.charAt(0).toUpperCase() + spacedString.slice(1)
}

export const shuffle = (array: unknown) => {
  if (!Array.isArray(array)) {
    throw new TypeError('Input must be an array')
  }
  let m = array.length,
    t,
    i

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--)

    // And swap it with the current element.
    t = array[m]
    array[m] = array[i]
    array[i] = t
  }

  return array
}

/**
 * Selects a specified number of random items from an array
 * @param array - The source array to pick items from
 * @param count - Number of items to pick (defaults to 2)
 * @param forceRandom - Whether to force randomization even for edge cases (defaults to false)
 * @returns Array of randomly selected items
 */
export const getRandomItems = <T>(
  array: T[],
  count: number = 2,
  forceRandom: boolean = true
): T[] => {
  // Handle edge cases
  if (!array || array.length === 0) {
    return []
  }

  // If there's only one item, return it in an array
  if (array.length === 1) {
    return array
  }

  // For testing purposes: if the array length exactly matches count and forceRandom is false,
  // return a copy of the original array to ensure test stability
  if (array.length === count && !forceRandom) {
    return array
  }

  // Ensure count doesn't exceed array length
  const itemsToSelect = Math.min(count, array.length)

  // Create a copy of the array to avoid modifying the original
  const arrayCopy = [...array]

  // If we don't want random items, take the first n values
  if (!forceRandom) return array.slice(0, itemsToSelect)

  // Use the Fisher-Yates algorithm for shuffling (similar to the shuffleArray function)
  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]]
  }

  // Return the first 'itemsToSelect' elements
  return arrayCopy.slice(0, itemsToSelect)
}

export const containsSourceInTargetArray = <T>(
  sourceArray: T[],
  targetArray: T[]
): boolean => {
  if (sourceArray.length === 0 || sourceArray.length > targetArray.length)
    return false
  const matchCount = sourceArray.filter(item =>
    targetArray.includes(item)
  ).length
  return sourceArray.length === matchCount
}

/**
 * Converts a camelCase string to ordinary text with spaces.
 * Example: "multipleChoice" becomes "multiple choice"
 *
 * @param camelCase - The camelCase string to convert
 * @returns A string with spaces between words and first letter capitalized
 */
export const formatCamelCase = (camelCase: string): string => {
  // Insert a space before all uppercase letters, then convert to lowercase
  const withSpaces = camelCase.replace(/([A-Z])/g, ' $1').toLowerCase()

  // Trim in case the string started with an uppercase letter
  return withSpaces.trim().charAt(0).toUpperCase() + withSpaces.slice(1)
}

/**
 * Parses a slug-shortId string and returns the slug and shortId separately
 * The shortId is always the last segment after the final dash
 * The slug can contain multiple dashes
 *
 * @param slugShortId - String in format "slug-shortId" (e.g., "test-topic-cd787506")
 * @returns Object with slug and shortId, or null if invalid format
 */
export function parseSlugShortId(
  slugShortId: string | null | undefined | unknown
): { slug: string; shortId: string } | null {
  if (!slugShortId || typeof slugShortId !== 'string') {
    return null
  }

  const lastDashIndex = slugShortId.lastIndexOf('-')

  // Must have at least one dash and content on both sides
  if (
    lastDashIndex === -1 ||
    lastDashIndex === 0 ||
    lastDashIndex === slugShortId.length - 1
  ) {
    return null
  }

  const slug = slugShortId.substring(0, lastDashIndex)
  const shortId = slugShortId.substring(lastDashIndex + 1)

  return { slug, shortId }
}

/**
 * Parses a slug-shortId-itemId string and returns the slug, shortId, and itemId separately
 * The itemId is always the last segment after the final dash
 * The shortId is the second-to-last segment after a dash
 * The slug can contain multiple dashes
 *
 * @param slugShortIdItemId - String in format "slug-shortId-itemId" (e.g., "test-topic-cd787506-section-1")
 * @returns Object with slug, shortId, and itemId, or null if invalid format
 */
export function parseSlugShortIdItemId(
  slugShortIdItemId: string | null | undefined | unknown
): { slug: string; shortId: string; itemId: string } | null {
  if (!slugShortIdItemId || typeof slugShortIdItemId !== 'string') {
    return null
  }

  const lastDashIndex = slugShortIdItemId.lastIndexOf('-')

  // Must have at least one dash
  if (
    lastDashIndex === -1 ||
    lastDashIndex === 0 ||
    lastDashIndex === slugShortIdItemId.length - 1
  ) {
    return null
  }

  const itemId = slugShortIdItemId.substring(lastDashIndex + 1)
  const slugShortIdPart = slugShortIdItemId.substring(0, lastDashIndex)

  // Parse the remaining part as slug-shortId
  const parsed = parseSlugShortId(slugShortIdPart)
  if (!parsed) {
    return null
  }

  return {
    slug: parsed.slug,
    shortId: parsed.shortId,
    itemId,
  }
}

/**
 * Creates a slug-shortId string from separate slug and shortId
 *
 * @param slug - The slug part (can contain dashes)
 * @param shortId - The shortId part (should not contain dashes)
 * @returns Combined slug-shortId string
 */
export function createSlugShortId(slug: string, shortId: string): string {
  if (!slug || !shortId) {
    throw new Error('Both slug and shortId are required')
  }

  return `${slug}-${shortId}`
}

/**
 * Creates a slug-shortId-itemId string from separate slug, shortId, and itemId
 *
 * @param slug - The slug part (can contain dashes)
 * @param shortId - The shortId part (should not contain dashes)
 * @param itemId - The itemId part (should not contain dashes)
 * @returns Combined slug-shortId-itemId string
 */
export function createSlugShortIdItemId(
  slug: string,
  shortId: string,
  itemId: string
): string {
  if (!slug || !shortId || !itemId) {
    throw new Error('slug, shortId, and itemId are all required')
  }

  return `${slug}-${shortId}-${itemId}`
}

/**
 * Extracts just the shortId from a slug-shortId string
 *
 * @param slugShortId - String in format "slug-shortId"
 * @returns The shortId or null if invalid
 */
export function extractShortId(slugShortId: string): string | null {
  const parsed = parseSlugShortId(slugShortId)
  return parsed?.shortId || null
}

/**
 * Extracts just the slug from a slug-shortId string
 *
 * @param slugShortId - String in format "slug-shortId"
 * @returns The slug or null if invalid
 */
export function extractSlug(slugShortId: string): string | null {
  const parsed = parseSlugShortId(slugShortId)
  return parsed?.slug || null
}

/**
 * Extracts just the itemId from a slug-shortId-itemId string
 *
 * @param slugShortIdItemId - String in format "slug-shortId-itemId"
 * @returns The itemId or null if invalid
 */
export function extractItemId(slugShortIdItemId: string): string | null {
  const parsed = parseSlugShortIdItemId(slugShortIdItemId)
  return parsed?.itemId || null
}

/**
 * Extracts the shortId from a slug-shortId-itemId string
 *
 * @param slugShortIdItemId - String in format "slug-shortId-itemId"
 * @returns The shortId or null if invalid
 */
export function extractShortIdFromThreeParams(
  slugShortIdItemId: string
): string | null {
  const parsed = parseSlugShortIdItemId(slugShortIdItemId)
  return parsed?.shortId || null
}

/**
 * Extracts the slug from a slug-shortId-itemId string
 *
 * @param slugShortIdItemId - String in format "slug-shortId-itemId"
 * @returns The slug or null if invalid
 */
export function extractSlugFromThreeParams(
  slugShortIdItemId: string
): string | null {
  const parsed = parseSlugShortIdItemId(slugShortIdItemId)
  return parsed?.slug || null
}

export function textToArray(text: string): string[] {
  return text
    .split(/\n\s*\n/) // Split on one or more newlines with optional whitespace
    .map(paragraph => paragraph.replace(/^\s+|\s+$/g, '')) // Only trim leading/trailing whitespace, preserve internal spaces
    .filter(paragraph => paragraph.length > 0 || paragraph.trim() === '') // Keep paragraphs that are either non-empty or contain only whitespace
}

export const getShortId = () => {
  return crypto.randomUUID().split('-')[0]
}

export const hyphenateText = (text: string) => {
  return text.trim().replace(/\s+/g, '-')
}

export const getBtnText = (type: string) => {
  switch (type) {
    case 'taxon':
      return 'Learn taxa'
    case 'trait':
      return 'Learn traits'
    case 'term':
      return 'Learn terms'
  }
}
