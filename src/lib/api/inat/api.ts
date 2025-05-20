import { mapInatSpeciesToLTP } from '@/api/inat/inat-species-map'
import { ContentHandlerType, LearningItem } from '@/types'

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
}: Props): Promise<LearningItem[] | undefined> => {
  switch (type) {
    case 'taxon':
      const ids = items.map(item => item.id)
      const url = `https://api.inaturalist.org/v1/taxa/${ids.join(',')}`
      const inatProperties = await getInatData(url)
      return items.map((item: LearningItem) => {
        return {
          ...inatProperties?.find(prop => prop.id === item.id),
          ...item,
        }
      })
    default:
      return items!
  }
}
