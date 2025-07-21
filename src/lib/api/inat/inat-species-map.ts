// whttps://api.inaturalist.org/v1/docs/#!/Taxa/get_taxa

import { Image, Taxon, iNaturalistTaxon } from '@/types'

export const mapInatSpeciesToLTP = (
  results: iNaturalistTaxon[]
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
        // observationsCount: s.observations_count,
        // images: s.taxon_photos.map((item: inatItem) => {
        //   return {
        //     id: item.photo.id.toString(),
        //     licenceCode: item.photo.license_code,
        //     attribution: item.photo.attribution,
        //     url: item.photo.url,
        //     attributionName: item.photo.attribution_name,
        //     squareUrl: item.photo.square_url,
        //     mediumUrl: item.photo.medium_url,
        //   }
        // }),
        wikipediaUrl: s.wikipedia_url,
        vernacularName: s.preferred_common_name,
        ancestorIds: s.ancestor_ids,
      } as unknown as Taxon
    })
    return species
  } catch (error) {
    console.error((error as Error).message)
  }
}
