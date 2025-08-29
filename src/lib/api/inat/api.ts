import { mapInatSpeciesToLTP } from '@/api/inat/inat-species-map'
import { sortedArrayByRank } from '@/utils/arrays'
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
  Country,
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
  switch (type.toString()) {
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
  locale?: string
}

async function getInatData(url: string) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const json = await response.json()
    const species = await mapInatSpeciesToLTP({ results: json.results })

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
                distractors: distractorsResult || [],
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
  locale = 'en',
}: AutoCompleteProps) => {
  const baseUrl = `https://api.inaturalist.org/v1/${by}/autocomplete`
  const params = new URLSearchParams({
    q: toComplete,
    per_page: '10',
    rank: 'genus,species',
    all_names: 'true',
    locale,
  })

  const url = `${baseUrl}?${params.toString()}`

  const response = await fetch(url)
  const json = await response.json()
  const species: Taxon[] =
    (await mapInatSpeciesToLTP({ results: json.results, locale })) || []
  console.log('species', species)
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
  const url = `https://api.inaturalist.org/v1/taxa?parent_id=${ancestorIds.join(',')}&rank=species,genus&all_names=true`
  const response = await fetch(url)
  const json = await response.json()
  // sort array to return members with rank of species first, genus second
  return sortedArrayByRank(json.results)
}

type TaxaDistractorProps = {
  species: Taxon[]
}

export const getTaxaDistractors = async ({
  species,
}: TaxaDistractorProps): Promise<Taxon[]> => {
  const resultsWithDistractors = await Promise.all(
    species.map(async (taxon: Taxon) => {
      try {
        if (taxon.ancestorIds && taxon.ancestorIds.length > 0) {
          const distractorsResult = await getDistractors({
            ancestorIds: taxon.ancestorIds.map((id: number) => id.toString()),
          })
          const distractors = distractorsResult
            ?.filter(
              (d: InatTaxon) =>
                d.id.toString() !== taxon.id.toString() &&
                d.preferred_common_name !== undefined
            )
            .slice(0, 3)

          return {
            ...taxon,
            distractors:
              (await mapInatSpeciesToLTP({
                results: distractors,
              })) || [],
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
    (await mapInatSpeciesToLTP({
      results: json.results.map(
        (observation: InatObservation) => observation.taxon
      ),
    })) || []

  return getUniqueTaxa(species)
}

export const getUserLocales = () => {
  return [
    {
      code: 'ar',
      language: 'العربية',
    },
    {
      code: 'be',
      language: 'Беларуская',
    },
    {
      code: 'bg',
      language: 'Български',
    },
    {
      code: 'br',
      language: 'Breton',
    },
    {
      code: 'ca',
      language: 'Català',
    },
    {
      code: 'cs',
      language: 'Česky',
    },
    {
      code: 'da',
      language: 'Dansk',
    },
    {
      code: 'de',
      language: 'Deutsch',
    },
    {
      code: 'el',
      language: 'Ελληνικά',
    },
    {
      code: 'en',
      language: 'English (US)',
    },
    {
      code: 'en-GB',
      language: 'English (UK)',
    },
    {
      code: 'eo',
      language: 'Esperanto',
    },
    {
      code: 'es',
      language: 'Español (España)',
    },
    {
      code: 'es-AR',
      language: 'Español (Argentina)',
    },
    {
      code: 'es-CO',
      language: 'Spanish (Colombia)',
    },
    {
      code: 'es-CR',
      language: 'Spanish (Costa Rica)',
    },
    {
      code: 'es-MX',
      language: 'Español (México)',
    },
    {
      code: 'et',
      language: 'Eesti',
    },
    {
      code: 'eu',
      language: 'Euskara',
    },
    {
      code: 'fi',
      language: 'Suomi',
    },
    {
      code: 'fr',
      language: 'Français (France)',
    },
    {
      code: 'fr-CA',
      language: 'French (Canada)',
    },
    {
      code: 'gl',
      language: 'Galego',
    },
    {
      code: 'he',
      language: 'עברית',
    },
    {
      code: 'hr',
      language: 'Hrvatski',
    },
    {
      code: 'hu',
      language: 'Magyar',
    },
    {
      code: 'id',
      language: 'Indonesia',
    },
    {
      code: 'it',
      language: 'Italiano',
    },
    {
      code: 'ja',
      language: '日本語',
    },
    {
      code: 'ka',
      language: 'Georgian',
    },
    {
      code: 'kk',
      language: 'Қазақша',
    },
    {
      code: 'kn',
      language: 'ಕನ್ನಡ',
    },
    {
      code: 'ko',
      language: '한국어',
    },
    {
      code: 'lb',
      language: 'Lëtzebuergesch',
    },
    {
      code: 'lt',
      language: 'Lietuvių',
    },
    {
      code: 'lv',
      language: 'Latviešu',
    },
    {
      code: 'mi',
      language: 'Te reo Māori',
    },
    {
      code: 'mk',
      language: 'Македонски',
    },
    {
      code: 'ml',
      language: 'Malayalam',
    },
    {
      code: 'mr',
      language: 'मराठी',
    },
    {
      code: 'nb',
      language: 'Norsk Bokmål',
    },
    {
      code: 'nl',
      language: 'Nederlands',
    },
    {
      code: 'oc',
      language: 'Occitan',
    },
    {
      code: 'pl',
      language: 'Polski',
    },
    {
      code: 'pt',
      language: 'Portuguese (Portugal)',
    },
    {
      code: 'pt-BR',
      language: 'Português (Brasil)',
    },
    {
      code: 'ru',
      language: 'Русский',
    },
    {
      code: 'sat',
      language: 'Santali',
    },
    {
      code: 'sk',
      language: 'Slovenský',
    },
    {
      code: 'sl',
      language: 'Slovenščina',
    },
    {
      code: 'sq',
      language: 'Shqip',
    },
    {
      code: 'sr',
      language: 'Srpski',
    },
    {
      code: 'sv',
      language: 'Svenska',
    },
    {
      code: 'ta',
      language: 'தமிழ்',
    },
    {
      code: 'th',
      language: 'ภาษาไทย',
    },
    {
      code: 'tr',
      language: 'Türkçe',
    },
    {
      code: 'uk',
      language: 'Українська',
    },
    {
      code: 'zh-CN',
      language: '简体中文',
    },
    {
      code: 'zh-TW',
      language: '繁體中文',
    },
  ] as UserLocale[]
}

export const getCountries = () => {
  return [
    {
      code: 'ar',
      countryCode: 'SA', // Saudi Arabia
      name: 'السعودية',
    },
    {
      code: 'be',
      countryCode: 'BY', // Belarus
      name: 'Беларусь',
    },
    {
      code: 'bg',
      countryCode: 'BG', // Bulgaria
      name: 'България',
    },
    {
      code: 'br',
      countryCode: 'FR', // France (Brittany region)
      name: 'Frañs', // France in Breton
    },
    {
      code: 'ca',
      countryCode: 'ES', // Spain (Catalonia region)
      name: 'Espanya', // Spain in Catalan
    },
    {
      code: 'cs',
      countryCode: 'CZ', // Czech Republic
      name: 'Česká republika',
    },
    {
      code: 'da',
      countryCode: 'DK', // Denmark
      name: 'Danmark',
    },
    {
      code: 'de',
      countryCode: 'DE', // Germany
      name: 'Deutschland',
    },
    {
      code: 'el',
      countryCode: 'GR', // Greece
      name: 'Ελλάδα',
    },
    {
      code: 'en',
      countryCode: 'US', // United States
      name: 'United States',
    },
    {
      code: 'en-GB',
      countryCode: 'GB', // United Kingdom
      name: 'United Kingdom',
    },
    {
      code: 'eo',
      countryCode: null, // Esperanto has no specific country
      name: 'Esperantujo',
    },
    {
      code: 'es',
      countryCode: 'ES', // Spain
      name: 'España',
    },
    {
      code: 'es-AR',
      countryCode: 'AR', // Argentina
      name: 'Argentina',
    },
    {
      code: 'es-CO',
      countryCode: 'CO', // Colombia
      name: 'Colombia',
    },
    {
      code: 'es-CR',
      countryCode: 'CR', // Costa Rica
      name: 'Costa Rica',
    },
    {
      code: 'es-MX',
      countryCode: 'MX', // Mexico
      name: 'México',
    },
    {
      code: 'et',
      countryCode: 'EE', // Estonia
      name: 'Eesti',
    },
    {
      code: 'eu',
      countryCode: 'ES', // Spain (Basque region)
      name: 'Espainia', // Spain in Basque
    },
    {
      code: 'fi',
      countryCode: 'FI', // Finland
      name: 'Suomi',
    },
    {
      code: 'fr',
      countryCode: 'FR', // France
      name: 'France',
    },
    {
      code: 'fr-CA',
      countryCode: 'CA', // Canada
      name: 'Canada',
    },
    {
      code: 'gl',
      countryCode: 'ES', // Spain (Galicia region)
      name: 'España', // Spain in Galician
    },
    {
      code: 'he',
      countryCode: 'IL', // Israel
      name: 'ישראל',
    },
    {
      code: 'hr',
      countryCode: 'HR', // Croatia
      name: 'Hrvatska',
    },
    {
      code: 'hu',
      countryCode: 'HU', // Hungary
      name: 'Magyarország',
    },
    {
      code: 'id',
      countryCode: 'ID', // Indonesia
      name: 'Indonesia',
    },
    {
      code: 'it',
      countryCode: 'IT', // Italy
      name: 'Italia',
    },
    {
      code: 'ja',
      countryCode: 'JP', // Japan
      name: '日本',
    },
    {
      code: 'ka',
      countryCode: 'GE', // Georgia
      name: 'საქართველო',
    },
    {
      code: 'kk',
      countryCode: 'KZ', // Kazakhstan
      name: 'Қазақстан',
    },
    {
      code: 'kn',
      countryCode: 'IN', // India
      name: 'ಭಾರತ',
    },
    {
      code: 'ko',
      countryCode: 'KR', // South Korea
      name: '대한민국',
    },
    {
      code: 'lb',
      countryCode: 'LU', // Luxembourg
      name: 'Lëtzebuerg',
    },
    {
      code: 'lt',
      countryCode: 'LT', // Lithuania
      name: 'Lietuva',
    },
    {
      code: 'lv',
      countryCode: 'LV', // Latvia
      name: 'Latvija',
    },
    {
      code: 'mi',
      countryCode: 'NZ', // New Zealand
      name: 'Aotearoa',
    },
    {
      code: 'mk',
      countryCode: 'MK', // North Macedonia
      name: 'Северна Македонија',
    },
    {
      code: 'ml',
      countryCode: 'IN', // India
      name: 'ഭാരതം',
    },
    {
      code: 'mr',
      countryCode: 'IN', // India
      name: 'भारत',
    },
    {
      code: 'nb',
      countryCode: 'NO', // Norway
      name: 'Norge',
    },
    {
      code: 'nl',
      countryCode: 'NL', // Netherlands
      name: 'Nederland',
    },
    {
      code: 'oc',
      countryCode: 'FR', // France (Occitan regions)
      name: 'França', // France in Occitan
    },
    {
      code: 'pl',
      countryCode: 'PL', // Poland
      name: 'Polska',
    },
    {
      code: 'pt',
      countryCode: 'PT', // Portugal
      name: 'Portugal',
    },
    {
      code: 'pt-BR',
      countryCode: 'BR', // Brazil
      name: 'Brasil',
    },
    {
      code: 'ru',
      countryCode: 'RU', // Russia
      name: 'Россия',
    },
    {
      code: 'sat',
      countryCode: 'IN', // India
      name: 'ᱵᱷᱟᱨᱚᱛ',
    },
    {
      code: 'sk',
      countryCode: 'SK', // Slovakia
      name: 'Slovensko',
    },
    {
      code: 'sl',
      countryCode: 'SI', // Slovenia
      name: 'Slovenija',
    },
    {
      code: 'sq',
      countryCode: 'AL', // Albania
      name: 'Shqipëria',
    },
    {
      code: 'sr',
      countryCode: 'RS', // Serbia
      name: 'Србија',
    },
    {
      code: 'sv',
      countryCode: 'SE', // Sweden
      name: 'Sverige',
    },
    {
      code: 'ta',
      countryCode: 'IN', // India
      name: 'இந்தியா',
    },
    {
      code: 'th',
      countryCode: 'TH', // Thailand
      name: 'ประเทศไทย',
    },
    {
      code: 'tr',
      countryCode: 'TR', // Turkey
      name: 'Türkiye',
    },
    {
      code: 'uk',
      countryCode: 'UA', // Ukraine
      name: 'Україна',
    },
    {
      code: 'zh-CN',
      countryCode: 'CN', // China
      name: '中国',
    },
    {
      code: 'zh-TW',
      countryCode: 'TW', // Taiwan
      name: '台灣',
    },
  ] as Country[]
}
