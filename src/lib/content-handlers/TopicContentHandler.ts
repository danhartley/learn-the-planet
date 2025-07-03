import {
  Collection,
  DistractorType,
  Topic,
  Taxon,
  MultipleChoiceOption,
} from '@/types'
import { ContentHandlerBase } from './ContentHandlerBase'
import { shuffle, shuffleArray } from '@/utils/strings'

export class TopicContentHandler extends ContentHandlerBase<Topic> {
  constructor() {
    super(generateTopicDistractors)
  }

  // Override to extract examples from topics for testing
  getTestableItems(collection: Collection<Topic>): Taxon[] {
    const allExamples: Taxon[] = []

    collection.items?.forEach(topic => {
      if (topic.examples && topic.examples.length > 0) {
        allExamples.push(...topic.examples)
      }
    })

    return allExamples
  }
}

export function generateTopicDistractors(
  collection: Collection<Topic>,
  item: Topic,
  count: number,
  distractorType: DistractorType
): MultipleChoiceOption[] {
  // Since we're testing individual examples (Taxa) within topics,
  // we need to extract all examples from all topics to use as distractors
  const allExamples: Taxon[] = []

  collection.items?.forEach(topic => {
    if (topic.examples && topic.examples.length > 0) {
      allExamples.push(...topic.examples)
    }
  })

  // For a specific taxon example being tested, we need to find it
  // This function signature expects a Topic, but we're actually testing Taxon examples
  // We'll need to handle this in the content handler or modify the approach

  // For now, return distractors from all available examples
  const availableDistractors = shuffleArray(allExamples).slice(0, count)

  return availableDistractors.map(taxon => {
    return {
      key: taxon.binomial,
      value: taxon[distractorType as keyof Taxon] as string,
    }
  })
}

// Alternative function that works with individual Taxon examples
export function generateTopicTaxonDistractors(
  collection: Collection<Topic>,
  taxonExample: Taxon,
  count: number,
  distractorType: DistractorType
): MultipleChoiceOption[] {
  // Extract all examples from all topics
  const allExamples: Taxon[] = []

  collection.items?.forEach(topic => {
    if (topic.examples && topic.examples.length > 0) {
      allExamples.push(...topic.examples)
    }
  })

  // Use existing distractors if available
  const distractorBinomials =
    (taxonExample.distractors && taxonExample.distractors?.length > 0) || 0
      ? shuffle(taxonExample.distractors as Taxon[])
      : []

  const extras = count - distractorBinomials.length
  const collectionExamples = shuffleArray(
    allExamples.filter(d => d.binomial !== taxonExample.binomial)
  ).slice(0, extras)

  const distractors = [...distractorBinomials, ...collectionExamples]

  return distractors.map(d => {
    return {
      key: d.binomial,
      value: d[distractorType as keyof Taxon] as string,
    }
  })
}
