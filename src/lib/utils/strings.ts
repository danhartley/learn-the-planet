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
