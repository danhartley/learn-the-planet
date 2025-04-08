import { Collection, Taxon } from '@/types'
import { shuffle } from '@/utils/shuffle'

type Distractor = {
  collection: Collection
  item: Taxon
  count: number
}

export const generateDistractors = (
  collection: Collection,
  item: Taxon,
  count: number,
  distractorType: string
): Taxon[] => {
  const distractorBinomials =
    (item.distractors && item.distractors?.length > 0) || 0
      ? shuffle(item.distractors)
      : []
  const extras = count - distractorBinomials.length
  const collectionBinomials = shuffle(
    collection.items.filter(d => d.binomial !== item.binomial)
  ).slice(0, extras)

  return [...distractorBinomials, ...collectionBinomials]
}
