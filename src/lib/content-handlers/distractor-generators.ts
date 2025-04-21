import {
  Collection,
  DistractorType,
  Taxon,
  Definition,
  MultipleChoiceOption,
} from '@/types'
import { shuffle } from '@/utils/shuffle'

/**
 * Generate distractors for Taxon items
 */
export function generateTaxonomyDistractors(
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

/**
 * Generate distractors for Definition items
 */
export function generateDefinitionDistractors(
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

// Helper function if not imported from utils
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}
