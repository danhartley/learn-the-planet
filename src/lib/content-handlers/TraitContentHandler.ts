import {
  Trait,
  Collection,
  DistractorType,
  MultipleChoiceOption,
} from '@/types'
import { ContentHandlerBase } from './ContentHandlerBase'
import { shuffle, shuffleArray } from '@/utils/strings'

export class TraitContentHandler extends ContentHandlerBase<Trait> {
  constructor() {
    super(generateTraitDistractors)
  }
}

/**
 * Generate distractors for Term items
 */
function generateTraitDistractors(
  collection: Collection<Trait>,
  item: Trait,
  count: number,
  distractorType: DistractorType
): MultipleChoiceOption[] {
  const distractorNames =
    (item.distractors && item.distractors?.length > 0) || 0
      ? shuffle(item.distractors)
      : []
  const extras = count - distractorNames.length
  const collectionNames = shuffleArray(
    collection.items.filter(d => d.trait !== item.trait)
  ).slice(0, extras)

  const distractors = [...distractorNames, ...collectionNames]

  return distractors.map(d => {
    return {
      key: d.trait,
      value: d[distractorType],
    }
  })
}
