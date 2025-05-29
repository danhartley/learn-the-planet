import { mapInatSpeciesToLTP } from '@/api/inat/inat-species-map'
import { ContentHandlerType, LearningItem, Taxon, Trait } from '@/types'

async function getInatData(url: string) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const json = await response.json()
    const species = mapInatSpeciesToLTP(json.results)
    return species
  } catch (error) {
    console.error((error as Error).message)
  }
}

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
    default:
      return items!
  }
}
