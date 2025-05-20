import { Collection, Taxon } from '@/types'

export const generateGenusAndSpeciesFields = (
  collection: Collection<Taxon>
) => {
  collection?.items.forEach(i => {
    const [genus, species] = i.binomial.split(' ')
    i.genus = genus
    i.species = species
    i.image = i.image || i.images?.[0]
    i?.distractors?.forEach(d => {
      const [genus, species] = d.binomial.split(' ')
      d.genus = genus
      d.species = species
      d.image = d.images?.[0]
    })
  })

  return collection
}
