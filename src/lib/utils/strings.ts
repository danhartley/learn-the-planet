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
export const getPropByPath = (obj: any, path: string): any => {
  // Return undefined for null/undefined objects
  if (obj == null) {
    return undefined
  }

  // Handle simple property access
  if (!path.includes('.') && !path.includes('[')) {
    return obj[path]
  }

  // Split by dots but preserve array notation
  const pathArray = path.match(/[^\.\[\]]+|\[\d+\]/g)

  // Start with the object
  let current = obj

  // Navigate through the path
  for (let i = 0; i < pathArray!.length && current != null; i++) {
    let key = pathArray![i]

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
      current = current[key]
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

export const isEqual = (a: string, b: string) => {
  // Normalise both strings for comparison (lowercase, trim whitespace)
  const normalisedKey = a.toLowerCase().trim()
  const normalisedAnswer = b.toLowerCase().trim()

  return normalisedKey === normalisedAnswer
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
