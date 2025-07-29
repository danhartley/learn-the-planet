import { mapInatSpeciesToLTP } from '@/api/inat/inat-species-map'
import {
  ContentHandlerType,
  LearningItem,
  Taxon,
  Trait,
  Topic,
  InatTaxon,
  InatObservationFilters,
  InatObservation,
  UserLocale,
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
              (d: InatTaxon) =>
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

export const getIdByAutocomplete = async ({
  by,
  toComplete,
}: {
  by: string
  toComplete: string
}) => {
  const url = `https://api.inaturalist.org/v1/${by}/autocomplete?q=${toComplete}&per_page=12`
  const response = await fetch(url)
  const json = await response.json()
  return json.results
}

const getUniqueTaxa = (array: Taxon[]) => {
  return Array.from(new Map(array.map(item => [item.id, item])).values())
}

export const getInatObservations = async ({
  user_key = 'user_id',
  user_id,
  place_key = 'place_id',
  place_id,
  project_key = 'project_id',
  project_id,
  iconic_taxa,
  per_page = 12,
  page = 1,
  locale = 'en',
  species_count = false,
  d1,
  d2,
}: InatObservationFilters): Promise<Taxon[]> => {
  const params = new URLSearchParams({
    order: 'desc',
    photos: 'true',
    page: page.toString(),
    per_page: per_page.toString(),
    locale,
  })

  // Add conditional parameters
  if (user_id) params.append(user_key, user_id)
  if (place_id) params.append(place_key, place_id)
  if (project_id) params.append(project_key, project_id)
  if (iconic_taxa?.length) params.append('iconic_taxa', iconic_taxa.join(','))
  if (d1) params.append('d1', d1)
  if (d2) params.append('d2', d2)
  if (locale) params.append(locale, locale)

  params.append('rank', 'species')

  const base = species_count
    ? 'https://api.inaturalist.org/v1/observations/species_counts'
    : 'https://api.inaturalist.org/v1/observations'

  const url = `${base}?${params.toString()}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const json = await response.json()

  const species: Taxon[] =
    mapInatSpeciesToLTP(
      json.results.map((observation: InatObservation) => observation.taxon)
    ) || []

  return getUniqueTaxa(species)
}

export const getUserLocales = () => {
  return [
    { code: 'ar', language: 'العربية' },
    { code: 'be', language: 'Беларуская' },
    { code: 'bg', language: 'български' },
    { code: 'br', language: 'Breton' },
    { code: 'ca', language: 'Català' },
    { code: 'cs', language: 'česky' },
    { code: 'da', language: 'Dansk' },
    { code: 'de', language: 'Deutsch' },
    { code: 'el', language: 'Ελληνικά' },
    { code: 'en', language: 'English' },
    { code: 'en-GB', language: 'English (UK)' },
    { code: 'eo', language: 'Esperanto' },
    { code: 'es', language: 'Español' },
    { code: 'es-AR', language: 'Español (Argentina)' },
    { code: 'es-CO', language: 'Spanish (Colombia)' },
    { code: 'es-CR', language: 'Spanish (Costa Rica)' },
    { code: 'es-MX', language: 'Español (México)' },
    { code: 'et', language: 'Eesti' },
    { code: 'eu', language: 'Euskara' },
    { code: 'fi', language: 'suomi' },
    { code: 'fr', language: 'français' },
    { code: 'fr-CA', language: 'French (Canada)' },
    { code: 'gl', language: 'Galego' },
    { code: 'he', language: 'עברית' },
    { code: 'hr', language: 'Hrvatski' },
    { code: 'hu', language: 'magyar' },
    { code: 'id', language: 'Indonesia' },
    { code: 'it', language: 'Italiano' },
    { code: 'ja', language: '日本語' },
    { code: 'ka', language: 'Georgian' },
    { code: 'kk', language: 'Қазақша' },
    { code: 'kn', language: 'ಕನ್ನಡ' },
    { code: 'ko', language: '한국어' },
    { code: 'lb', language: 'Lëtzebuergesch' },
    { code: 'lt', language: 'Lietuvių' },
    { code: 'lv', language: 'Latviešu' },
    { code: 'mi', language: 'Te reo Māori' },
    { code: 'mk', language: 'македонски' },
    { code: 'ml', language: 'Malayalam' },
    { code: 'mr', language: 'मराठी' },
    { code: 'nb', language: 'Norsk Bokmål' },
    { code: 'nl', language: 'Nederlands' },
    { code: 'oc', language: 'Occitan' },
    { code: 'pl', language: 'Polski' },
    { code: 'pt', language: 'Portuguese' },
    { code: 'pt-BR', language: 'Português (Brasil)' },
    { code: 'ru', language: 'Русский' },
    { code: 'sat', language: 'Santali' },
    { code: 'sk', language: 'Slovenský' },
    { code: 'sl', language: 'Slovenščina' },
    { code: 'sq', language: 'Shqip' },
    { code: 'sr', language: 'srpski' },
    { code: 'sv', language: 'Svenska' },
    { code: 'ta', language: 'தமிழ்' },
    { code: 'th', language: 'ภาษาไทย' },
    { code: 'tr', language: 'Türkçe' },
    { code: 'uk', language: 'Українська' },
    { code: 'zh-CN', language: '简体中文' },
    { code: 'zh-TW', language: '繁體中文' },
  ] as UserLocale[]
}
