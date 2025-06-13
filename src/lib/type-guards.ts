import { TextType, Taxon, NextCloudImage } from '@/types'

// Check type field if present (assuming TextType validation exists)
export const isTextType = (obj: unknown): obj is TextType => {
  return typeof obj === 'string' && ['aside', 'article'].includes(obj as string)
}

export const isTaxon = (obj: unknown): obj is Taxon => {
  // Check if obj is an object and not null or array
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return false
  }

  const taxon = obj as any

  // Check required fields from LearningItem (assuming id is required)
  if (typeof taxon.id !== 'string' || taxon.id.trim() === '') {
    return false
  }

  // Check required fields from Taxon
  if (typeof taxon.binomial !== 'string') {
    return false
  }

  if (typeof taxon.vernacularName !== 'string') {
    return false
  }

  // Check optional fields have correct types if present
  if (
    taxon.iconicTaxon !== undefined &&
    typeof taxon.iconicTaxon !== 'string'
  ) {
    return false
  }

  if (taxon.names !== undefined) {
    if (!Array.isArray(taxon.names)) return false
    // Check each name object structure
    for (const name of taxon.names) {
      if (!name || typeof name !== 'object' || Array.isArray(name)) return false
      if (
        name.vernacularName !== undefined &&
        typeof name.vernacularName !== 'string'
      )
        return false
      if (name.language !== undefined && typeof name.language !== 'string')
        return false
      if (
        name.wikiSearchTerm !== undefined &&
        typeof name.wikiSearchTerm !== 'string'
      )
        return false
    }
  }

  // Check string fields
  const stringFields = [
    'rank',
    'order',
    'genus',
    'species',
    'observationURL',
    'wikipediaUrl',
    'inaturalistUrl',
  ]
  for (const field of stringFields) {
    if (taxon[field] !== undefined && typeof taxon[field] !== 'string') {
      return false
    }
  }

  // Check array fields
  if (taxon.images !== undefined && !Array.isArray(taxon.images)) {
    return false
  }

  // Check taxonomy object if present
  if (taxon.taxonomy !== undefined) {
    if (
      !taxon.taxonomy ||
      typeof taxon.taxonomy !== 'object' ||
      Array.isArray(taxon.taxonomy)
    ) {
      return false
    }
    const taxonomyFields = [
      'phylum',
      'class',
      'kingdom',
      'order',
      'genus',
      'species',
    ]
    for (const field of taxonomyFields) {
      if (
        taxon.taxonomy[field] !== undefined &&
        typeof taxon.taxonomy[field] !== 'string'
      ) {
        return false
      }
    }
  }

  // Check number field
  if (
    taxon.observationsCount !== undefined &&
    typeof taxon.observationsCount !== 'number'
  ) {
    return false
  }

  return true
}

export const isNextCloudImage = (obj: unknown): obj is NextCloudImage => {
  // Check if obj is an object and not null or array
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return false
  }

  const image = obj as any

  // Check required fields
  if (typeof image.src !== 'string') {
    return false
  }

  if (typeof image.alt !== 'string') {
    return false
  }

  if (typeof image.caption !== 'string') {
    return false
  }

  // Check optional fields have correct types if present
  if (image.width !== undefined && typeof image.width !== 'number') {
    return false
  }

  if (image.height !== undefined && typeof image.height !== 'number') {
    return false
  }

  if (image.sizes !== undefined && typeof image.sizes !== 'string') {
    return false
  }

  return true
}
