// whttps://api.inaturalist.org/v1/docs/#!/Taxa/get_taxa

import { Image, Taxon, InatTaxon } from '@/types'

export const mapInatSpeciesToLTP = (
  results: InatTaxon[],
  locale?: string
): Taxon[] | undefined => {
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
        vernacularName: s.names
          ? s.names.find(name => name.locale === locale)?.name
          : s.preferred_common_name || s.english_common_name,
        ancestorIds: s.ancestor_ids,
      } as unknown as Taxon
    })
    return species
  } catch (error) {
    console.error((error as Error).message)
  }
}
