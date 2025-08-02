import { Taxon, ContentHandlerType } from '@/types'

export const generateGenusAndSpeciesFields = (taxa: Taxon[]): Taxon[] => {
  return taxa.map((taxon: Taxon) => {
    // Handle null/undefined binomial and single word cases
    const binomialParts = taxon.binomial?.split(' ') || []
    const [genus, species] = binomialParts

    const updatedTaxon: Taxon = {
      ...taxon,
      genus: genus || undefined,
      species: species || undefined,
      image: taxon.image || taxon.images?.[0],
    }

    // Handle distractors with the same null/single word logic
    if (updatedTaxon.distractors) {
      updatedTaxon.distractors = (updatedTaxon.distractors as Taxon[]).map(
        (distractor: Taxon) => {
          const distractorParts = distractor.binomial?.split(' ') || []
          const [dGenus, dSpecies] = distractorParts

          return {
            ...distractor,
            genus: dGenus || undefined,
            species: dSpecies || undefined,
            image: distractor.image || distractor.images?.[0],
          }
        }
      )
    }

    return updatedTaxon
  })
}

export const processCollectionTaxa = (
  type: ContentHandlerType,
  items: unknown[] | undefined
): Taxon[] | Array<{ examples?: Taxon[] }> | undefined => {
  if (!items) {
    return items
  }

  switch (type.toString()) {
    case 'taxon':
      return generateGenusAndSpeciesFields(items as Taxon[])

    case 'topic':
    case 'trait':
      return (items as Array<{ examples?: Taxon[] }>).map(item => ({
        ...item,
        examples: item.examples
          ? generateGenusAndSpeciesFields(item.examples)
          : item.examples,
      }))

    default:
      return items as Taxon[] | Array<{ examples?: Taxon[] }>
  }
}
