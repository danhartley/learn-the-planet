import {
  Trait,
  Collection,
  DistractorType,
  MultipleSelectOption,
} from '@/types'
import { ContentHandlerBase } from './ContentHandlerBase'
import { shuffle, shuffleArray } from '@/utils/strings'

export class TraitContentHandler extends ContentHandlerBase<Trait> {
  constructor() {
    super(generateTraitDistractors)
  }
}

/**
 * Generate distractors for Trait items
 */
function generateTraitDistractors(
  collection: Collection<Trait>,
  item: Trait,
  count: number,
  distractorType: DistractorType
): MultipleSelectOption[] {
  let collectionDistractorNames = [] as unknown[]
  const itemDistractorNames =
    item.distractors && item.distractors?.length > 0
      ? shuffle(item.distractors)
      : []
  const extras = count - itemDistractorNames.length

  switch (distractorType) {
    case 'morphology':
    case 'phenology':
      return shuffleArray(
        (collection.items ?? []).filter(d => d.trait !== item.trait)
      )
        .slice(0, extras)
        .map(d => {
          return {
            key: d.trait,
            value: d[distractorType as keyof Trait],
          }
        }) as MultipleSelectOption[]
    default:
      collectionDistractorNames = shuffleArray(
        (collection.items ?? []).filter(d => d.trait !== item.trait)
      ).slice(0, extras) as Trait[]
      const distractorItems = [
        ...itemDistractorNames,
        ...collectionDistractorNames,
      ]

      return distractorItems.map(item => ({
        key: item.trait,
        value: item[distractorType as keyof Trait],
      })) as MultipleSelectOption[]
  }
}
