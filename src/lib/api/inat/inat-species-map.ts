type Photo = {
  inatId: number
  licenceCode: string
  attribution: string
  url: string
  attributionName: string
  squareUrl: string
  mediumUrl: string
}

type InatSpecies = {
  inatId: number
  iconicTaxonId: number
  binomial: string
  defaultPhoto: Photo
  observationsCount: number
  taxonPhotos: Photo[]
  wikipediaUrl: string
  iconicTaxonName: string
  vernacularName: string
}

export const mapInatSpeciesToLTP = (results: any[]): InatSpecies[] => {
  const species: InatSpecies[] = results.map(s => {
    return {
      inatId: s.id,
      iconicTaxonId: s.iconic_taxon_id,
      binomial: s.name,
      defaultPhoto: {
        inatId: s.default_photo.id,
        licenceCode: s.default_photo.license_code,
        attribution: s.default_photo.attribution,
        url: s.default_photo.url,
        attributionName: s.default_photo.attribution_name,
        squareUrl: s.default_photo.square_url,
        mediumUrl: s.default_photo.medium_url,
      } as Photo,
      observationsCount: s.observations_count,
      taxonPhotos: s.taxon_photos.map((item: any) => {
        console.log('item', item)
        return {
          id: item.photo.id,
          licenceCode: item.photo.license_code,
          attribution: item.photo.attribution,
          url: item.photo.url,
          attributionName: item.photo.attribution_name,
          squareUrl: item.photo.square_url,
          mediumUrl: item.photo.medium_url,
        }
      }),
      wikipediaUrl: s.wikipedia_url,
      iconicTaxonName: s.iconic_taxon_name, // e.g. Plantae
      vernacularName: s.preferred_common_name,
    } as InatSpecies
  })
  return species
}

const input = [
  {
    total_results: 1,
    page: 1,
    per_page: 30,
    results: [
      {
        id: 77479,
        rank: 'species',
        rank_level: 10,
        iconic_taxon_id: 47126,
        name: 'Hyparrhenia hirta',
        default_photo: {
          id: 256086487,
          license_code: 'cc-by-nc',
          attribution:
            '(c) Alba Rovira, some rights reserved (CC BY-NC), uploaded by Alba Rovira',
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/square.jpeg',
          original_dimensions: {
            height: 1365,
            width: 2048,
          },
          flags: [],
          attribution_name: 'Alba Rovira',
          square_url:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/square.jpeg',
          medium_url:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/medium.jpeg',
        },
        observations_count: 3471,
        taxon_photos: [
          {
            taxon_id: 77479,
            photo: {
              id: 256086487,
              license_code: 'cc-by-nc',
              attribution:
                '(c) Alba Rovira, some rights reserved (CC BY-NC), uploaded by Alba Rovira',
              url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/square.jpeg',
              original_dimensions: {
                height: 1365,
                width: 2048,
              },
              flags: [],
              native_page_url: null,
              native_photo_id: null,
              type: 'LocalPhoto',
              attribution_name: 'Alba Rovira',
              square_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/square.jpeg',
              small_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/small.jpeg',
              medium_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/medium.jpeg',
              large_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/large.jpeg',
              original_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/original.jpeg',
            },
            taxon: {
              id: 77479,
              rank: 'species',
              rank_level: 10,
              iconic_taxon_id: 47126,
              ancestor_ids: [
                48460, 47126, 211194, 47125, 47163, 47162, 47434, 326013,
                635417, 1138097, 71939, 77479,
              ],
              is_active: true,
              name: 'Hyparrhenia hirta',
              parent_id: 71939,
              ancestry:
                '48460/47126/211194/47125/47163/47162/47434/326013/635417/1138097/71939',
              extinct: false,
              default_photo: {
                id: 256086487,
                license_code: 'cc-by-nc',
                attribution:
                  '(c) Alba Rovira, some rights reserved (CC BY-NC), uploaded by Alba Rovira',
                url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/square.jpeg',
                original_dimensions: {
                  height: 1365,
                  width: 2048,
                },
                flags: [],
                attribution_name: 'Alba Rovira',
                square_url:
                  'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/square.jpeg',
                medium_url:
                  'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/medium.jpeg',
              },
              taxon_changes_count: 1,
              taxon_schemes_count: 4,
              observations_count: 3471,
              photos_locked: false,
              flag_counts: {
                resolved: 0,
                unresolved: 0,
              },
              current_synonymous_taxon_ids: null,
              atlas_id: null,
              complete_species_count: null,
              wikipedia_url: 'http://en.wikipedia.org/wiki/Hyparrhenia_hirta',
              iconic_taxon_name: 'Plantae',
              preferred_common_name: 'thatching grass',
            },
          },
          {
            taxon_id: 77479,
            photo: {
              id: 22811339,
              license_code: null,
              attribution:
                '(c) mjcorreia, all rights reserved, uploaded by mjcorreia',
              url: 'https://static.inaturalist.org/photos/22811339/square.jpeg',
              original_dimensions: {
                height: 533,
                width: 800,
              },
              flags: [],
              native_page_url: null,
              native_photo_id: null,
              type: 'LocalPhoto',
              attribution_name: 'mjcorreia',
              square_url:
                'https://static.inaturalist.org/photos/22811339/square.jpeg',
              small_url:
                'https://static.inaturalist.org/photos/22811339/small.jpeg',
              medium_url:
                'https://static.inaturalist.org/photos/22811339/medium.jpeg',
              large_url:
                'https://static.inaturalist.org/photos/22811339/large.jpeg',
              original_url:
                'https://static.inaturalist.org/photos/22811339/original.jpeg',
            },
            taxon: {
              id: 77479,
              rank: 'species',
              rank_level: 10,
              iconic_taxon_id: 47126,
              ancestor_ids: [
                48460, 47126, 211194, 47125, 47163, 47162, 47434, 326013,
                635417, 1138097, 71939, 77479,
              ],
              is_active: true,
              name: 'Hyparrhenia hirta',
              parent_id: 71939,
              ancestry:
                '48460/47126/211194/47125/47163/47162/47434/326013/635417/1138097/71939',
              extinct: false,
              default_photo: {
                id: 256086487,
                license_code: 'cc-by-nc',
                attribution:
                  '(c) Alba Rovira, some rights reserved (CC BY-NC), uploaded by Alba Rovira',
                url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/square.jpeg',
                original_dimensions: {
                  height: 1365,
                  width: 2048,
                },
                flags: [],
                attribution_name: 'Alba Rovira',
                square_url:
                  'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/square.jpeg',
                medium_url:
                  'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/medium.jpeg',
              },
              taxon_changes_count: 1,
              taxon_schemes_count: 4,
              observations_count: 3471,
              photos_locked: false,
              flag_counts: {
                resolved: 0,
                unresolved: 0,
              },
              current_synonymous_taxon_ids: null,
              atlas_id: null,
              complete_species_count: null,
              wikipedia_url: 'http://en.wikipedia.org/wiki/Hyparrhenia_hirta',
              iconic_taxon_name: 'Plantae',
              preferred_common_name: 'thatching grass',
            },
          },
          {
            taxon_id: 77479,
            photo: {
              id: 283214327,
              license_code: 'cc-by-nc',
              attribution: '(c) teresa_jardim, some rights reserved (CC BY-NC)',
              url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/283214327/square.jpeg',
              original_dimensions: {
                height: 2048,
                width: 1152,
              },
              flags: [],
              native_page_url: null,
              native_photo_id: null,
              type: 'LocalPhoto',
              attribution_name: 'teresa_jardim',
              square_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/283214327/square.jpeg',
              small_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/283214327/small.jpeg',
              medium_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/283214327/medium.jpeg',
              large_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/283214327/large.jpeg',
              original_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/283214327/original.jpeg',
            },
            taxon: {
              id: 77479,
              rank: 'species',
              rank_level: 10,
              iconic_taxon_id: 47126,
              ancestor_ids: [
                48460, 47126, 211194, 47125, 47163, 47162, 47434, 326013,
                635417, 1138097, 71939, 77479,
              ],
              is_active: true,
              name: 'Hyparrhenia hirta',
              parent_id: 71939,
              ancestry:
                '48460/47126/211194/47125/47163/47162/47434/326013/635417/1138097/71939',
              extinct: false,
              default_photo: {
                id: 256086487,
                license_code: 'cc-by-nc',
                attribution:
                  '(c) Alba Rovira, some rights reserved (CC BY-NC), uploaded by Alba Rovira',
                url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/square.jpeg',
                original_dimensions: {
                  height: 1365,
                  width: 2048,
                },
                flags: [],
                attribution_name: 'Alba Rovira',
                square_url:
                  'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/square.jpeg',
                medium_url:
                  'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/medium.jpeg',
              },
              taxon_changes_count: 1,
              taxon_schemes_count: 4,
              observations_count: 3471,
              photos_locked: false,
              flag_counts: {
                resolved: 0,
                unresolved: 0,
              },
              current_synonymous_taxon_ids: null,
              atlas_id: null,
              complete_species_count: null,
              wikipedia_url: 'http://en.wikipedia.org/wiki/Hyparrhenia_hirta',
              iconic_taxon_name: 'Plantae',
              preferred_common_name: 'thatching grass',
            },
          },
          {
            taxon_id: 77479,
            photo: {
              id: 288137046,
              license_code: 'cc-by-nc',
              attribution:
                '(c) David Hoare, some rights reserved (CC BY-NC), uploaded by David Hoare',
              url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/288137046/square.jpeg',
              original_dimensions: {
                height: 2048,
                width: 1536,
              },
              flags: [],
              native_page_url: null,
              native_photo_id: null,
              type: 'LocalPhoto',
              attribution_name: 'David Hoare',
              square_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/288137046/square.jpeg',
              small_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/288137046/small.jpeg',
              medium_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/288137046/medium.jpeg',
              large_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/288137046/large.jpeg',
              original_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/288137046/original.jpeg',
            },
            taxon: {
              id: 77479,
              rank: 'species',
              rank_level: 10,
              iconic_taxon_id: 47126,
              ancestor_ids: [
                48460, 47126, 211194, 47125, 47163, 47162, 47434, 326013,
                635417, 1138097, 71939, 77479,
              ],
              is_active: true,
              name: 'Hyparrhenia hirta',
              parent_id: 71939,
              ancestry:
                '48460/47126/211194/47125/47163/47162/47434/326013/635417/1138097/71939',
              extinct: false,
              default_photo: {
                id: 256086487,
                license_code: 'cc-by-nc',
                attribution:
                  '(c) Alba Rovira, some rights reserved (CC BY-NC), uploaded by Alba Rovira',
                url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/square.jpeg',
                original_dimensions: {
                  height: 1365,
                  width: 2048,
                },
                flags: [],
                attribution_name: 'Alba Rovira',
                square_url:
                  'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/square.jpeg',
                medium_url:
                  'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/medium.jpeg',
              },
              taxon_changes_count: 1,
              taxon_schemes_count: 4,
              observations_count: 3471,
              photos_locked: false,
              flag_counts: {
                resolved: 0,
                unresolved: 0,
              },
              current_synonymous_taxon_ids: null,
              atlas_id: null,
              complete_species_count: null,
              wikipedia_url: 'http://en.wikipedia.org/wiki/Hyparrhenia_hirta',
              iconic_taxon_name: 'Plantae',
              preferred_common_name: 'thatching grass',
            },
          },
          {
            taxon_id: 77479,
            photo: {
              id: 1646295,
              license_code: null,
              attribution: '(c) Tig, all rights reserved, uploaded by Tig',
              url: 'https://static.inaturalist.org/photos/1646295/square.jpg',
              original_dimensions: {
                height: 1103,
                width: 800,
              },
              flags: [],
              native_page_url: null,
              native_photo_id: null,
              type: 'LocalPhoto',
              attribution_name: 'Tig',
              square_url:
                'https://static.inaturalist.org/photos/1646295/square.jpg',
              small_url:
                'https://static.inaturalist.org/photos/1646295/small.jpg',
              medium_url:
                'https://static.inaturalist.org/photos/1646295/medium.jpg',
              large_url:
                'https://static.inaturalist.org/photos/1646295/large.jpg',
              original_url:
                'https://static.inaturalist.org/photos/1646295/original.jpg',
            },
            taxon: {
              id: 77479,
              rank: 'species',
              rank_level: 10,
              iconic_taxon_id: 47126,
              ancestor_ids: [
                48460, 47126, 211194, 47125, 47163, 47162, 47434, 326013,
                635417, 1138097, 71939, 77479,
              ],
              is_active: true,
              name: 'Hyparrhenia hirta',
              parent_id: 71939,
              ancestry:
                '48460/47126/211194/47125/47163/47162/47434/326013/635417/1138097/71939',
              extinct: false,
              default_photo: {
                id: 256086487,
                license_code: 'cc-by-nc',
                attribution:
                  '(c) Alba Rovira, some rights reserved (CC BY-NC), uploaded by Alba Rovira',
                url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/square.jpeg',
                original_dimensions: {
                  height: 1365,
                  width: 2048,
                },
                flags: [],
                attribution_name: 'Alba Rovira',
                square_url:
                  'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/square.jpeg',
                medium_url:
                  'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/medium.jpeg',
              },
              taxon_changes_count: 1,
              taxon_schemes_count: 4,
              observations_count: 3471,
              photos_locked: false,
              flag_counts: {
                resolved: 0,
                unresolved: 0,
              },
              current_synonymous_taxon_ids: null,
              atlas_id: null,
              complete_species_count: null,
              wikipedia_url: 'http://en.wikipedia.org/wiki/Hyparrhenia_hirta',
              iconic_taxon_name: 'Plantae',
              preferred_common_name: 'thatching grass',
            },
          },
          {
            taxon_id: 77479,
            photo: {
              id: 2861556,
              license_code: 'cc-by',
              attribution:
                '(c) Drepanostoma, some rights reserved (CC BY), uploaded by Drepanostoma',
              url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/2861556/square.jpg',
              original_dimensions: {
                height: 800,
                width: 1200,
              },
              flags: [],
              native_page_url: null,
              native_photo_id: null,
              type: 'LocalPhoto',
              attribution_name: 'Drepanostoma',
              square_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/2861556/square.jpg',
              small_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/2861556/small.jpg',
              medium_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/2861556/medium.jpg',
              large_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/2861556/large.jpg',
              original_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/2861556/original.jpg',
            },
            taxon: {
              id: 77479,
              rank: 'species',
              rank_level: 10,
              iconic_taxon_id: 47126,
              ancestor_ids: [
                48460, 47126, 211194, 47125, 47163, 47162, 47434, 326013,
                635417, 1138097, 71939, 77479,
              ],
              is_active: true,
              name: 'Hyparrhenia hirta',
              parent_id: 71939,
              ancestry:
                '48460/47126/211194/47125/47163/47162/47434/326013/635417/1138097/71939',
              extinct: false,
              default_photo: {
                id: 256086487,
                license_code: 'cc-by-nc',
                attribution:
                  '(c) Alba Rovira, some rights reserved (CC BY-NC), uploaded by Alba Rovira',
                url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/square.jpeg',
                original_dimensions: {
                  height: 1365,
                  width: 2048,
                },
                flags: [],
                attribution_name: 'Alba Rovira',
                square_url:
                  'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/square.jpeg',
                medium_url:
                  'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/medium.jpeg',
              },
              taxon_changes_count: 1,
              taxon_schemes_count: 4,
              observations_count: 3471,
              photos_locked: false,
              flag_counts: {
                resolved: 0,
                unresolved: 0,
              },
              current_synonymous_taxon_ids: null,
              atlas_id: null,
              complete_species_count: null,
              wikipedia_url: 'http://en.wikipedia.org/wiki/Hyparrhenia_hirta',
              iconic_taxon_name: 'Plantae',
              preferred_common_name: 'thatching grass',
            },
          },
          {
            taxon_id: 77479,
            photo: {
              id: 48606063,
              license_code: 'cc-by-nc',
              attribution:
                '(c) Hedi Stummer, some rights reserved (CC BY-NC), uploaded by Hedi Stummer',
              url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/48606063/square.jpeg',
              original_dimensions: {
                height: 2048,
                width: 1536,
              },
              flags: [],
              native_page_url: null,
              native_photo_id: null,
              type: 'LocalPhoto',
              attribution_name: 'Hedi Stummer',
              square_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/48606063/square.jpeg',
              small_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/48606063/small.jpeg',
              medium_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/48606063/medium.jpeg',
              large_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/48606063/large.jpeg',
              original_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/48606063/original.jpeg',
            },
            taxon: {
              id: 77479,
              rank: 'species',
              rank_level: 10,
              iconic_taxon_id: 47126,
              ancestor_ids: [
                48460, 47126, 211194, 47125, 47163, 47162, 47434, 326013,
                635417, 1138097, 71939, 77479,
              ],
              is_active: true,
              name: 'Hyparrhenia hirta',
              parent_id: 71939,
              ancestry:
                '48460/47126/211194/47125/47163/47162/47434/326013/635417/1138097/71939',
              extinct: false,
              default_photo: {
                id: 256086487,
                license_code: 'cc-by-nc',
                attribution:
                  '(c) Alba Rovira, some rights reserved (CC BY-NC), uploaded by Alba Rovira',
                url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/square.jpeg',
                original_dimensions: {
                  height: 1365,
                  width: 2048,
                },
                flags: [],
                attribution_name: 'Alba Rovira',
                square_url:
                  'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/square.jpeg',
                medium_url:
                  'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/medium.jpeg',
              },
              taxon_changes_count: 1,
              taxon_schemes_count: 4,
              observations_count: 3471,
              photos_locked: false,
              flag_counts: {
                resolved: 0,
                unresolved: 0,
              },
              current_synonymous_taxon_ids: null,
              atlas_id: null,
              complete_species_count: null,
              wikipedia_url: 'http://en.wikipedia.org/wiki/Hyparrhenia_hirta',
              iconic_taxon_name: 'Plantae',
              preferred_common_name: 'thatching grass',
            },
          },
        ],
        wikipedia_url: 'https://en.wikipedia.org/wiki/Hyparrhenia hirta',
        iconic_taxon_name: 'Plantae',
        preferred_common_name: 'thatching grass',
      },
    ],
  },
]

const species = mapInatSpeciesToLTP(input.map(i => i.results).flat())
console.log(species)
