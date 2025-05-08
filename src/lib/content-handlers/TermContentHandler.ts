import { Definition, Collection, DistractorType } from '@/types'
import { ContentHandlerBase } from './ContentHandlerBase'
import { shuffleArray } from '@/utils/strings'

export class TermContentHandler extends ContentHandlerBase<Definition> {
  constructor() {
    super(generateTermDistractors)
  }
}

/**
 * Generate distractors for Definition items
 */
function generateTermDistractors(
  collection: Collection<Definition>,
  item: Definition,
  count: number,
  distractorType: DistractorType
): any[] {
  // Implementation for Definition distractors
  const allDefinitions = collection.items.filter(def => def.id !== item.id)

  // Randomly select the requested number of distractors
  const selectedDistractors = shuffleArray(allDefinitions).slice(0, count)

  // Format the distractors as required
  return selectedDistractors.map(distractor => ({
    key: distractor.term,
    value: distractor[distractorType as keyof Definition],
  }))
}
