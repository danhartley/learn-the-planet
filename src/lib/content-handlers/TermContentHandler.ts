import { Term, Collection, DistractorType } from '@/types'
import { ContentHandlerBase } from './ContentHandlerBase'
import { shuffleArray } from '@/utils/strings'

export class TermContentHandler extends ContentHandlerBase<Term> {
  constructor() {
    super(generateTermDistractors)
  }
}

/**
 * Generate distractors for Term items
 */
function generateTermDistractors(
  collection: Collection<Term>,
  item: Term,
  count: number,
  distractorType: DistractorType
): unknown[] {
  // Implementation for Term distractors
  const allDefinitions = (collection.items ?? []).filter(
    def => def.id !== item.id
  )

  // Randomly select the requested number of distractors
  const selectedDistractors = shuffleArray(allDefinitions).slice(0, count)

  // Format the distractors as required
  return selectedDistractors.map(distractor => ({
    key: distractor.term,
    value: distractor[distractorType as keyof Term],
  }))
}
