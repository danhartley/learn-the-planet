// whttps://api.inaturalist.org/v1/docs/#!/Taxa/get_taxa

import { Image, Taxon, InatTaxon } from '@/types'

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

export const mapInatSpeciesToLTP = ({
  results,
  locale,
}: InatMapProps): Taxon[] | undefined => {
  try {
    const species: Taxon[] = results.map(s => {
      return {
        id: s.id.toString(),
        rank: s.rank,
        iconicTaxon: s.iconic_taxon_name, // e.g. Plantae
        binomial: s.name,
        image: !!s.default_photo
          ? {
              id: s.default_photo.id.toString(),
              licenceCode: s.default_photo.license_code,
              attribution: s.default_photo.attribution,
              url: s.default_photo.url,
              attributionName: s.default_photo.attribution_name,
              squareUrl: s.default_photo.square_url,
              mediumUrl: s.default_photo.medium_url,
            }
          : (undefined as Image | undefined),
        wikipediaUrl: s.wikipedia_url,
        vernacularName: extractVernacularName({ species: s, locale }),
        ancestorIds: s.ancestor_ids,
      } as unknown as Taxon
    })
    return species
  } catch (error) {
    console.error((error as Error).message)
  }
}
