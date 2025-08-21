// whttps://api.inaturalist.org/v1/docs/#!/Taxa/get_taxa

import { Image, Taxon, InatTaxon, InatPhoto } from '@/types'

const extractLocalePartFromLocale = (locale: string) => {
  // e.g. if locale is 'en-GB' return 'en'
  // Because many locales do not have the two part locale designation
  return locale?.split('-')[0] || locale
}

const extractVernacularName = ({
  species,
  locale,
}: {
  species: InatTaxon
  locale: string | undefined
}) => {
  return species.names
    ? species.names.find(
        name => name.locale === extractLocalePartFromLocale(locale || 'en')
      )?.name
    : species.preferred_common_name || species.english_common_name
}

type InatMapProps = {
  results: InatTaxon[]
  locale?: string
}

/**
 * Determines if a photo licence code is permissive (allows use without asking permission)
 * @param licenseCode - The licence code from iNaturalist photo data
 * @returns true if the licence is permissive, false otherwise
 */
export const isLicencePermissive = (licenseCode: string | null): boolean => {
  // Non-permissive licences: null and "All rights reserved"
  if (licenseCode === null || licenseCode === 'All rights reserved') {
    console.log('Non-permissive licence')
    return false
  }

  // All other licence codes are considered permissive
  // (CC0, CC-BY, CC-BY-SA, CC-BY-NC, CC-BY-ND, CC-BY-NC-SA, CC-BY-NC-ND)
  return true
}

export const getPhoto = async (
  photo: InatPhoto,
  id: string
): Promise<Image | undefined> => {
  let image: Image | undefined

  if (photo && !isLicencePermissive(photo.license_code)) {
    // Make API call to get alternative photos
    return await fetchAlternativePhoto(id, 'en')
  } else if (photo) {
    image = {
      id: photo.id,
      licenceCode: photo.license_code,
      attribution: photo.attribution,
      url: photo.url,
      attributionName: photo.attribution_name,
      squareUrl: photo.square_url,
      mediumUrl: photo.medium_url,
    }
  } else {
    // No default photo
    image = undefined
  }

  return image
}

export const mapInatSpeciesToLTP = async ({
  results,
  locale,
}: InatMapProps): Promise<Taxon[] | undefined> => {
  try {
    const species: Taxon[] = await Promise.all(
      results.map(async s => {
        const image = !!s.default_photo
          ? await getPhoto(s.default_photo as InatPhoto, s.id)
          : undefined

        return {
          id: s.id,
          rank: s.rank,
          iconicTaxon: s.iconic_taxon_name, // e.g. Plantae
          binomial: s.name,
          image,
          wikipediaUrl: s.wikipedia_url,
          vernacularName: extractVernacularName({ species: s, locale }),
          ancestorIds: s.ancestor_ids,
        } as unknown as Taxon
      })
    )
    return species
  } catch (error) {
    console.error((error as Error).message)
  }
}

/**
 * Fetches alternative photos for a taxon and returns the first one with a permissive license
 * @param taxonId - The ID of the taxon to fetch photos for
 * @param locale - The locale for the request
 * @returns Promise<Image | undefined> - First photo with permissive license, or undefined if none found
 */
export const fetchAlternativePhoto = async (
  taxonId: string,
  locale: string = 'en'
): Promise<Image | undefined> => {
  try {
    const url = `https://api.inaturalist.org/v1/taxa/${taxonId}`
    const response = await fetch(url)

    if (!response.ok) {
      console.error(`Failed to fetch taxon ${taxonId}: ${response.status}`)
      return undefined
    }

    const json = await response.json()
    const taxonPhotos = json.results?.[0]?.taxon_photos

    if (!taxonPhotos || !Array.isArray(taxonPhotos)) {
      return undefined
    }

    // Find first photo with permissive license
    for (const photoData of taxonPhotos) {
      const photo = photoData.photo || photoData // Handle potential nesting

      if (photo && isLicencePermissive(photo.license_code)) {
        return {
          id: photo.id.toString(),
          licenceCode: photo.license_code,
          attribution: photo.attribution,
          url: photo.url,
          attributionName: photo.attribution_name,
          squareUrl: photo.square_url,
          mediumUrl: photo.medium_url,
        }
      }
    }

    // No permissive photos found
    return undefined
  } catch (error) {
    console.error(
      `Error fetching alternative photo for taxon ${taxonId}:`,
      error
    )
    return undefined
  }
}
