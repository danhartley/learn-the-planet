import { mapInatSpeciesToLTP } from '@/api/inat/inat-species-map'
import {
  ContentHandlerType,
  LearningItem,
  Taxon,
  Trait,
  Topic,
  iNaturalistTaxon,
} from '@/types'

type Props = {
  items: LearningItem[]
  type: ContentHandlerType
}

export const getInatTaxonProperties = async ({
  items,
  type,
}: Props): Promise<unknown[] | undefined> => {
  let ids: string[], url: string, inatProperties: Taxon[] | undefined
  switch (type) {
    case 'taxon':
      ids = items.map(item => item.id)
      url = `https://api.inaturalist.org/v1/taxa/${ids.join(',')}`
      inatProperties = await getInatData(url)
      if (!inatProperties) {
        return items
      }
      return (items as Taxon[]).map((item: Taxon) => {
        return {
          ...inatProperties?.find(prop => prop.id === item.id),
          ...item,
        }
      })
    case 'trait':
      ids = (items as Trait[]).flatMap(i => i.examples?.map(e => e.id) ?? [])
      url = `https://api.inaturalist.org/v1/taxa/${ids.join(',')}`
      inatProperties = await getInatData(url)
      if (!inatProperties) {
        return items
      }
      return (items as Trait[]).map((item: Trait) => {
        return {
          ...item,
          examples: item.examples?.map((example: Taxon) => {
            return {
              ...example,
              ...inatProperties?.find(prop => prop.id === example.id),
            }
          }),
        }
      })
    case 'topic':
      ids = (items as Topic[]).flatMap(i => i.examples?.map(e => e.id) ?? [])
      url = `https://api.inaturalist.org/v1/taxa/${ids.join(',')}`
      inatProperties = await getInatData(url)
      if (!inatProperties) {
        return items
      }
      return (items as Topic[]).map((item: Topic) => {
        return {
          ...item,
          examples: item.examples?.map((example: Taxon) => {
            return {
              ...example,
              ...inatProperties?.find(
                prop => prop.id.toString() === example.id.toString()
              ),
            }
          }),
        }
      })
    default:
      return items!
  }
}

type TaxaProps = {
  taxaIds: string[]
  locale: string
  per_page: number
}

export const getInatTaxa = async ({
  taxaIds,
  locale = 'en',
  per_page,
}: TaxaProps) => {
  const buffer = 50 // request more records than species count to ensure we don't miss one…
  const url =
    `https://api.inaturalist.org/v1/taxa?locale=${locale}&per_page=${per_page + buffer}&taxon_id=` +
    taxaIds.join('%2C')
  const response = await fetch(url)
  const json = await response.json()
  return json
}

type AutoCompleteProps = {
  by: string // taxa
  toComplete: string // taxon name
}

async function getInatData(url: string) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const json = await response.json()
    const species = mapInatSpeciesToLTP(json.results)

    // Add distractors to each species
    if (species) {
      const speciesWithDistractors = await Promise.all(
        species.map(async (taxon: Taxon) => {
          try {
            if (taxon.ancestorIds && taxon.ancestorIds.length > 0) {
              const distractorsResult = await getDistractors({
                ancestorIds: taxon.ancestorIds.map(id => id.toString()),
              })

              return {
                ...taxon,
                distractors: distractorsResult?.results || [],
              }
            }

            return {
              ...taxon,
              distractors: [],
            }
          } catch (error) {
            console.error(
              `Failed to get distractors for taxon ${taxon.id}:`,
              error
            )
            return {
              ...taxon,
              distractors: [],
            }
          }
        })
      )

      return speciesWithDistractors
    }

    return species
  } catch (error) {
    console.error((error as Error).message)
  }
}

export const getTaxaByAutocomplete = async ({
  by,
  toComplete,
}: AutoCompleteProps) => {
  const url = `https://api.inaturalist.org/v1/${by}/autocomplete?q=${toComplete}&per_page=10&rank=species`
  const response = await fetch(url)
  const json = await response.json()
  const species: Taxon[] = mapInatSpeciesToLTP(json.results) || []

  if (species) {
    return {
      results: species,
    }
  }

  return json
}
type AncestorProps = {
  ancestorIds: string[]
}

export const getDistractors = async ({ ancestorIds }: AncestorProps) => {
  const url = `https://api.inaturalist.org/v1/taxa?parent_id=${ancestorIds.join(',')}&rank=species`
  const response = await fetch(url)
  const json = await response.json()
  return json
}

export const getTaxaDistractors = async ({
  species,
}: {
  species: Taxon[]
}): Promise<Taxon[]> => {
  const resultsWithDistractors = await Promise.all(
    species.map(async (taxon: Taxon) => {
      try {
        if (taxon.ancestorIds && taxon.ancestorIds.length > 0) {
          const distractorsResult = await getDistractors({
            ancestorIds: taxon.ancestorIds.map((id: number) => id.toString()),
          })

          const distractors = distractorsResult?.results
            .filter(
              (d: iNaturalistTaxon) =>
                d.id.toString() !== taxon.id.toString() &&
                d.preferred_common_name !== undefined
            )
            .slice(0, 3)

          return {
            ...taxon,
            distractors: mapInatSpeciesToLTP(distractors) || [],
          }
        }

        return {
          ...taxon,
          distractors: [],
        }
      } catch (error) {
        console.error(
          `Failed to get distractors for autocomplete result ${taxon.id}:`,
          error
        )
        return {
          ...taxon,
          distractors: [],
        }
      }
    })
  )
  return resultsWithDistractors
}
