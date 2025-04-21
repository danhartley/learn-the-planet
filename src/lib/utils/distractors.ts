import {
  Collection,
  Taxon,
  DistractorType,
  MultipleChoiceOption,
} from '@/types'
import { shuffle } from '@/utils/shuffle'

type Distractor<T> = {
  collection: Collection<T>
  item: T
  count: number
}

export const generateDistractors = (
  collection: Collection<Taxon>,
  item: Taxon,
  count: number,
  distractorType: DistractorType
): MultipleChoiceOption[] => {
  const distractorBinomials =
    (item.distractors && item.distractors?.length > 0) || 0
      ? shuffle(item.distractors)
      : []
  const extras = count - distractorBinomials.length
  const collectionBinomials = shuffle(
    collection.items.filter(d => d.binomial !== item.binomial)
  ).slice(0, extras)

  const distractors = [...distractorBinomials, ...collectionBinomials]

  return distractors.map(d => {
    return {
      key: d.binomial,
      value: d[distractorType],
    }
  })
}
