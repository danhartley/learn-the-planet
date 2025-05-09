import {
  Collection,
  DistractorType,
  Taxon,
  MultipleChoiceOption,
} from '@/types'
import { ContentHandlerBase } from './ContentHandlerBase'
import { shuffle, shuffleArray } from '@/utils/strings'

export class TaxonContentHandler extends ContentHandlerBase<Taxon> {
  constructor() {
    super(generateTaxonDistractors)
  }
}

export function generateTaxonDistractors(
  collection: Collection<Taxon>,
  item: Taxon,
  count: number,
  distractorType: DistractorType
): MultipleChoiceOption[] {
  const distractorBinomials =
    (item.distractors && item.distractors?.length > 0) || 0
      ? shuffle(item.distractors)
      : []
  const extras = count - distractorBinomials.length
  const collectionBinomials = shuffleArray(
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
