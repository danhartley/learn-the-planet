import { Collection, Taxon } from '@/types'
import { shuffle } from '@/utils/shuffle'

type Distractor = {
  collection: Collection
  item: Taxon
  count: number
}

const getBinomialDistractors = ({ collection, item, count }: Distractor) => {
  const distractorBinomials =
    (item.distractors && item.distractors?.length > 0) || 0
      ? shuffle(item.distractors).map((d: Taxon) => d.binomial)
      : []
  const extras = count - distractorBinomials.length
  const collectionBinomials = shuffle(
    collection.items
      .filter(d => d.binomial !== item.binomial)
      .map(i => i.binomial)
  ).slice(0, extras)

  return [...distractorBinomials, ...collectionBinomials]
}

const getGenusDistractors = ({ collection, item, count }: Distractor) => {
  return ['']
}

const getSpeciesDistractors = ({ collection, item, count }: Distractor) => {
  return ['']
}

const getImageDistractors = ({ collection, item, count }: Distractor) => {
  return ['']
}

export const generateDistractors = (
  collection: Collection,
  item: Taxon,
  count: number,
  distractorType: string
): string[] => {
  switch (distractorType) {
    case 'binomial':
      return getBinomialDistractors({ collection, item, count })
    case 'genus':
      return getGenusDistractors({ collection, item, count })
    case 'species':
      return getSpeciesDistractors({ collection, item, count })
    case 'image':
      return getImageDistractors({ collection, item, count })
    // Add other distractor types
    default:
      throw new Error(`Unknown distractor type: ${distractorType}`)
  }
}
