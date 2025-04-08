import { Taxon } from './types'

type Distractor = {
  item: Taxon
  count: number
}

const getBinomialDistractors = ({ item, count }: Distractor) => {
  return ['']
}

const getGenusDistractors = ({ item, count }: Distractor) => {
  return ['']
}

const getSpeciesDistractors = ({ item, count }: Distractor) => {
  return ['']
}

const getImageDistractors = ({ item, count }: Distractor) => {
  return ['']
}

export const generateDistractors = (
  item: Taxon,
  count: number,
  distractorType: string
): string[] => {
  switch (distractorType) {
    case 'binomial':
      return getBinomialDistractors({ item, count })
    case 'genus':
      return getGenusDistractors({ item, count })
    case 'species':
      return getSpeciesDistractors({ item, count })
    case 'image':
      return getImageDistractors({ item, count })
    // Add other distractor types
    default:
      throw new Error(`Unknown distractor type: ${distractorType}`)
  }
}
