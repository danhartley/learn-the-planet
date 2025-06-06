'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.mapInatSpeciesToLTP = void 0
var mapInatSpeciesToLTP = function (results) {
  var species = results.map(function (s) {
    return {
      id: s.id,
      iconicTaxonId: s.iconic_taxon_id,
      binomial: s.name,
      defaultPhoto: {
        id: s.default_photo.id,
        licenceCode: s.default_photo.license_code,
        attribution: s.default_photo.attribution,
        url: s.default_photo.url,
        attributionName: s.default_photo.attribution_name,
        squareUrl: s.default_photo.square_url,
        mediumUrl: s.default_photo.medium_url,
      },
      observationsCount: s.observations_count,
      taxonPhotos: s.taxon_photos.map(function (item) {
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
    }
  })
  return species
}
exports.mapInatSpeciesToLTP = mapInatSpeciesToLTP
var input = [
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
        ancestor_ids: [
          48460, 47126, 211194, 47125, 47163, 47162, 47434, 326013, 635417,
          1138097, 71939,
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
        atlas_id: null,
        complete_species_count: null,
        wikipedia_url: 'https://en.wikipedia.org/wiki/Hyparrhenia hirta',
        iconic_taxon_name: 'Plantae',
        preferred_common_name: 'thatching grass',
        ancestors: [
          {
            id: 47126,
            rank: 'kingdom',
            rank_level: 70,
            iconic_taxon_id: 47126,
            ancestor_ids: [48460, 47126],
            is_active: true,
            name: 'Plantae',
            parent_id: 48460,
            ancestry: '48460',
            extinct: false,
            default_photo: {
              id: 221143410,
              license_code: null,
              attribution:
                '(c) Rocío Ramírez Barrios, all rights reserved, uploaded by Rocío Ramírez Barrios',
              url: 'https://static.inaturalist.org/photos/221143410/square.jpeg',
              original_dimensions: {
                height: 2048,
                width: 1462,
              },
              flags: [],
              attribution_name: 'Rocío Ramírez Barrios',
              square_url:
                'https://static.inaturalist.org/photos/221143410/square.jpeg',
              medium_url:
                'https://static.inaturalist.org/photos/221143410/medium.jpeg',
            },
            taxon_changes_count: 7,
            taxon_schemes_count: 2,
            observations_count: 112111513,
            flag_counts: {
              resolved: 20,
              unresolved: 3,
            },
            current_synonymous_taxon_ids: null,
            atlas_id: null,
            complete_species_count: null,
            wikipedia_url: 'https://en.wikipedia.org/wiki/Plant',
            complete_rank: 'phylum',
            iconic_taxon_name: 'Plantae',
            preferred_common_name: 'plants',
          },
          {
            id: 211194,
            rank: 'phylum',
            rank_level: 60,
            iconic_taxon_id: 47126,
            ancestor_ids: [48460, 47126, 211194],
            is_active: true,
            name: 'Tracheophyta',
            parent_id: 47126,
            ancestry: '48460/47126',
            extinct: false,
            default_photo: {
              id: 78650848,
              license_code: 'cc-by-nd',
              attribution:
                '(c) harrylurling, some rights reserved (CC BY-ND), uploaded by harrylurling',
              url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/78650848/square.jpeg',
              original_dimensions: {
                height: 1536,
                width: 2048,
              },
              flags: [],
              attribution_name: 'harrylurling',
              square_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/78650848/square.jpeg',
              medium_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/78650848/medium.jpeg',
            },
            taxon_changes_count: 3,
            taxon_schemes_count: 2,
            observations_count: 108561148,
            flag_counts: {
              resolved: 7,
              unresolved: 1,
            },
            current_synonymous_taxon_ids: null,
            atlas_id: null,
            complete_species_count: null,
            wikipedia_url: 'https://en.wikipedia.org/wiki/Vascular_plant',
            iconic_taxon_name: 'Plantae',
            preferred_common_name: 'vascular plants',
          },
          {
            id: 47125,
            rank: 'subphylum',
            rank_level: 57,
            iconic_taxon_id: 47126,
            ancestor_ids: [48460, 47126, 211194, 47125],
            is_active: true,
            name: 'Angiospermae',
            parent_id: 211194,
            ancestry: '48460/47126/211194',
            extinct: false,
            default_photo: {
              id: 102229489,
              license_code: 'cc-by-nc',
              attribution: '(c) mateoalmada, some rights reserved (CC BY-NC)',
              url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/102229489/square.jpg',
              original_dimensions: {
                height: 2048,
                width: 1536,
              },
              flags: [],
              attribution_name: 'mateoalmada',
              square_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/102229489/square.jpg',
              medium_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/102229489/medium.jpg',
            },
            taxon_changes_count: 5,
            taxon_schemes_count: 2,
            observations_count: 102455470,
            flag_counts: {
              resolved: 13,
              unresolved: 0,
            },
            current_synonymous_taxon_ids: null,
            atlas_id: null,
            complete_species_count: null,
            wikipedia_url: 'https://en.wikipedia.org/wiki/Flowering_plant',
            iconic_taxon_name: 'Plantae',
            preferred_common_name: 'flowering plants',
          },
          {
            id: 47163,
            rank: 'class',
            rank_level: 50,
            iconic_taxon_id: 47126,
            ancestor_ids: [48460, 47126, 211194, 47125, 47163],
            is_active: true,
            name: 'Liliopsida',
            parent_id: 47125,
            ancestry: '48460/47126/211194/47125',
            extinct: false,
            default_photo: {
              id: 274224,
              license_code: 'cc-by-nc',
              attribution:
                '(c) J. Maughn, some rights reserved (CC BY-NC), uploaded by J. Maughn',
              url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/274224/square.jpg',
              original_dimensions: {
                height: 1536,
                width: 2048,
              },
              flags: [],
              attribution_name: 'J. Maughn',
              square_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/274224/square.jpg',
              medium_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/274224/medium.jpg',
            },
            taxon_changes_count: 1,
            taxon_schemes_count: 2,
            observations_count: 15947544,
            flag_counts: {
              resolved: 3,
              unresolved: 0,
            },
            current_synonymous_taxon_ids: null,
            atlas_id: null,
            complete_species_count: null,
            wikipedia_url: 'http://en.wikipedia.org/wiki/Liliopsida',
            iconic_taxon_name: 'Plantae',
            preferred_common_name: 'monocots',
          },
          {
            id: 47162,
            rank: 'order',
            rank_level: 40,
            iconic_taxon_id: 47126,
            ancestor_ids: [48460, 47126, 211194, 47125, 47163, 47162],
            is_active: true,
            name: 'Poales',
            parent_id: 47163,
            ancestry: '48460/47126/211194/47125/47163',
            extinct: false,
            default_photo: {
              id: 54589881,
              license_code: 'cc-by-nc-sa',
              attribution:
                '(c) Arthur Chapman, some rights reserved (CC BY-NC-SA)',
              url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/54589881/square.jpg',
              original_dimensions: {
                height: 2048,
                width: 1365,
              },
              flags: [],
              attribution_name: 'Arthur Chapman',
              square_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/54589881/square.jpg',
              medium_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/54589881/medium.jpg',
            },
            taxon_changes_count: 1,
            taxon_schemes_count: 2,
            observations_count: 5461882,
            flag_counts: {
              resolved: 0,
              unresolved: 0,
            },
            current_synonymous_taxon_ids: null,
            atlas_id: null,
            complete_species_count: null,
            wikipedia_url: 'http://en.wikipedia.org/wiki/Poales',
            iconic_taxon_name: 'Plantae',
            preferred_common_name: 'grasses, sedges, cattails, and allies',
          },
          {
            id: 47434,
            rank: 'family',
            rank_level: 30,
            iconic_taxon_id: 47126,
            ancestor_ids: [48460, 47126, 211194, 47125, 47163, 47162, 47434],
            is_active: true,
            name: 'Poaceae',
            parent_id: 47162,
            ancestry: '48460/47126/211194/47125/47163/47162',
            extinct: false,
            default_photo: {
              id: 76692662,
              license_code: 'cc-by-nc',
              attribution:
                '(c) Konstantin Romanov, some rights reserved (CC BY-NC), uploaded by Konstantin Romanov',
              url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/76692662/square.jpg',
              original_dimensions: {
                height: 1350,
                width: 1800,
              },
              flags: [],
              attribution_name: 'Konstantin Romanov',
              square_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/76692662/square.jpg',
              medium_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/76692662/medium.jpg',
            },
            taxon_changes_count: 0,
            taxon_schemes_count: 2,
            observations_count: 3335059,
            flag_counts: {
              resolved: 3,
              unresolved: 0,
            },
            current_synonymous_taxon_ids: null,
            atlas_id: 95954,
            complete_species_count: null,
            wikipedia_url: 'http://en.wikipedia.org/wiki/Poaceae',
            iconic_taxon_name: 'Plantae',
            preferred_common_name: 'grasses',
          },
          {
            id: 326013,
            rank: 'subfamily',
            rank_level: 27,
            iconic_taxon_id: 47126,
            ancestor_ids: [
              48460, 47126, 211194, 47125, 47163, 47162, 47434, 326013,
            ],
            is_active: true,
            name: 'Panicoideae',
            parent_id: 47434,
            ancestry: '48460/47126/211194/47125/47163/47162/47434',
            extinct: false,
            default_photo: {
              id: 9424017,
              license_code: 'cc-by-nc',
              attribution:
                '(c) rayrob, some rights reserved (CC BY-NC), uploaded by rayrob',
              url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/9424017/square.jpeg',
              original_dimensions: {
                height: 1296,
                width: 1936,
              },
              flags: [],
              attribution_name: 'rayrob',
              square_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/9424017/square.jpeg',
              medium_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/9424017/medium.jpeg',
            },
            taxon_changes_count: 0,
            taxon_schemes_count: 1,
            observations_count: 906473,
            flag_counts: {
              resolved: 0,
              unresolved: 0,
            },
            current_synonymous_taxon_ids: null,
            atlas_id: null,
            complete_species_count: null,
            wikipedia_url: 'http://en.wikipedia.org/wiki/Panicoideae',
            iconic_taxon_name: 'Plantae',
            preferred_common_name:
              'bristlegrasses, bluestems, paspalums, and allies',
          },
          {
            id: 635417,
            rank: 'tribe',
            rank_level: 25,
            iconic_taxon_id: 47126,
            ancestor_ids: [
              48460, 47126, 211194, 47125, 47163, 47162, 47434, 326013, 635417,
            ],
            is_active: true,
            name: 'Andropogoneae',
            parent_id: 326013,
            ancestry: '48460/47126/211194/47125/47163/47162/47434/326013',
            extinct: false,
            default_photo: {
              id: 57161132,
              license_code: 'cc-by-nc-sa',
              attribution:
                '(c) Peter Gorman, some rights reserved (CC BY-NC-SA)',
              url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/57161132/square.jpg',
              original_dimensions: {
                height: 2048,
                width: 1366,
              },
              flags: [],
              attribution_name: 'Peter Gorman',
              square_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/57161132/square.jpg',
              medium_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/57161132/medium.jpg',
            },
            taxon_changes_count: 0,
            taxon_schemes_count: 0,
            observations_count: 332124,
            flag_counts: {
              resolved: 0,
              unresolved: 0,
            },
            current_synonymous_taxon_ids: null,
            atlas_id: null,
            complete_species_count: null,
            wikipedia_url: 'http://en.wikipedia.org/wiki/Andropogoneae',
            iconic_taxon_name: 'Plantae',
            preferred_common_name:
              'bluestems, lemon grasses, silvergrasses, and allies',
          },
          {
            id: 1138097,
            rank: 'subtribe',
            rank_level: 24,
            iconic_taxon_id: 47126,
            ancestor_ids: [
              48460, 47126, 211194, 47125, 47163, 47162, 47434, 326013, 635417,
              1138097,
            ],
            is_active: true,
            name: 'Andropogoninae',
            parent_id: 635417,
            ancestry:
              '48460/47126/211194/47125/47163/47162/47434/326013/635417',
            extinct: false,
            default_photo: {
              id: 178573399,
              license_code: 'cc-by-sa',
              attribution:
                '(c) Douglas Goldman, some rights reserved (CC BY-SA), uploaded by Douglas Goldman',
              url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/178573399/square.jpg',
              original_dimensions: {
                height: 1371,
                width: 2048,
              },
              flags: [],
              attribution_name: 'Douglas Goldman',
              square_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/178573399/square.jpg',
              medium_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/178573399/medium.jpg',
            },
            taxon_changes_count: 0,
            taxon_schemes_count: 0,
            observations_count: 96181,
            flag_counts: {
              resolved: 0,
              unresolved: 0,
            },
            current_synonymous_taxon_ids: null,
            atlas_id: null,
            complete_species_count: null,
            wikipedia_url: null,
            iconic_taxon_name: 'Plantae',
            preferred_common_name: 'bluestems, thatching grasses, and allies',
          },
          {
            id: 71939,
            rank: 'genus',
            rank_level: 20,
            iconic_taxon_id: 47126,
            ancestor_ids: [
              48460, 47126, 211194, 47125, 47163, 47162, 47434, 326013, 635417,
              1138097, 71939,
            ],
            is_active: true,
            name: 'Hyparrhenia',
            parent_id: 1138097,
            ancestry:
              '48460/47126/211194/47125/47163/47162/47434/326013/635417/1138097',
            extinct: false,
            default_photo: {
              id: 1646291,
              license_code: 'cc-by-nc-sa',
              attribution: '(c) Luis Mata, some rights reserved (CC BY-NC-SA)',
              url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/1646291/square.jpg',
              original_dimensions: {
                height: 1361,
                width: 2048,
              },
              flags: [],
              attribution_name: 'Luis Mata',
              square_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/1646291/square.jpg',
              medium_url:
                'https://inaturalist-open-data.s3.amazonaws.com/photos/1646291/medium.jpg',
            },
            taxon_changes_count: 0,
            taxon_schemes_count: 1,
            observations_count: 5380,
            flag_counts: {
              resolved: 0,
              unresolved: 0,
            },
            current_synonymous_taxon_ids: null,
            atlas_id: null,
            complete_species_count: null,
            wikipedia_url: 'http://en.wikipedia.org/wiki/Hyparrhenia',
            iconic_taxon_name: 'Plantae',
            preferred_common_name: 'Thatching Grasses',
          },
        ],
        conservation_statuses: [
          {
            id: 247192,
            taxon_id: 77479,
            taxon_name: 'Hyparrhenia hirta',
            taxon_rank: 'species',
            status: 'Least Concern',
            authority: 'Red List of South African Plants (SANBI)',
            iucn: 10,
            url: 'http://redlist.sanbi.org/species.php?species=1217-14',
            description: 'Open Access: not in National Sensitive Species List',
            source_id: null,
            geoprivacy: 'open',
            updater_id: null,
            created_at: '2022-02-11T19:29:38+00:00',
            updated_at: '2022-02-11T19:29:38+00:00',
            user: {
              id: 383144,
              login: 'tonyrebelo',
              icon_url: null,
              orcid: null,
            },
            place: {
              id: 6986,
              name: 'South Africa',
              display_name: 'South Africa',
              admin_level: 0,
              ancestor_place_ids: [97392, 113055, 6986],
            },
          },
        ],
        conservation_status: null,
        listed_taxa_count: 205,
        listed_taxa: [
          {
            id: 3396929,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 6793,
              name: 'Mexico',
              display_name: 'Mexico',
              admin_level: 0,
              ancestor_place_ids: [97394, 6793],
            },
            list: {
              id: 7116,
              title: 'Mexico Check List',
            },
          },
          {
            id: 24166851,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 6744,
              name: 'Australia',
              display_name: 'Australia',
              admin_level: 0,
              ancestor_place_ids: [97393, 6744],
            },
            list: {
              id: 7060,
              title: 'Australia Check List',
            },
          },
          {
            id: 24166852,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 12986,
              name: 'Australian Capital Territory',
              display_name: 'Australian Capital Territory, AU',
              admin_level: 10,
              ancestor_place_ids: [97393, 6744, 12986],
            },
            list: {
              id: 15747,
              title: 'Australian Capital Territory Check List',
            },
          },
          {
            id: 84782977,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 7830,
              name: 'Victoria',
              display_name: 'Victoria, AU',
              admin_level: 10,
              ancestor_place_ids: [97393, 6744, 7830],
            },
            list: {
              id: 8221,
              title: 'Victoria Check List',
            },
          },
          {
            id: 3126996,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 14,
              name: 'California',
              display_name: 'California, US',
              admin_level: 10,
              ancestor_place_ids: [97394, 1, 14],
            },
            list: {
              id: 68176,
              title: 'Poaceae of California, US',
            },
          },
          {
            id: 5501692,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 11,
              name: 'Hawaii',
              display_name: 'Hawaii, US',
              admin_level: 10,
              ancestor_place_ids: [97394, 1, 11],
            },
            list: {
              id: 187046,
              title: 'Hawaii NatureServe',
            },
          },
          {
            id: 91866063,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 11166,
              name: 'Durango',
              display_name: 'Durango, MX',
              admin_level: 10,
              ancestor_place_ids: [97394, 6793, 11166],
            },
            list: {
              id: 13927,
              title: 'Durango Check List',
            },
          },
          {
            id: 24166922,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 6825,
              name: 'New South Wales',
              display_name: 'New South Wales, AU',
              admin_level: 10,
              ancestor_place_ids: [97393, 6744, 6825],
            },
            list: {
              id: 7154,
              title: 'New South Wales Check List',
            },
          },
          {
            id: 50120080,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 6827,
              name: 'Western Australia',
              display_name: 'Western Australia, AU',
              admin_level: 10,
              ancestor_place_ids: [97393, 6744, 6827],
            },
            list: {
              id: 7156,
              title: 'Western Australia Check List',
            },
          },
          {
            id: 50208663,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 7308,
              name: 'Queensland',
              display_name: 'Queensland, AU',
              admin_level: 10,
              ancestor_place_ids: [97393, 6744, 7308],
            },
            list: {
              id: 7655,
              title: 'Queensland Check List',
            },
          },
          {
            id: 69524743,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 6899,
              name: 'South Australia',
              display_name: 'South Australia, AU',
              admin_level: 10,
              ancestor_place_ids: [97393, 6744, 6899],
            },
            list: {
              id: 7235,
              title: 'South Australia Check List',
            },
          },
          {
            id: 124717954,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18615,
              name: 'Coffs Harbour - Pt A',
              display_name: 'Coffs Harbour - Pt A, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 18615],
            },
            list: {
              id: 21378,
              title: 'Coffs Harbour - Pt A Check List',
            },
          },
          {
            id: 114079030,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18622,
              name: 'Fairfield - West',
              display_name: 'Fairfield - West, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 18622],
            },
            list: {
              id: 21385,
              title: 'Fairfield - West Check List',
            },
          },
          {
            id: 111067125,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 1607,
              name: 'Maui',
              display_name: 'Maui County, US, HI',
              admin_level: 20,
              ancestor_place_ids: [97394, 1, 11, 1607],
            },
            list: {
              id: 4582,
              title: 'Maui Check List',
            },
          },
          {
            id: 110778403,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 19103,
              name: 'Ormeau-Yatala',
              display_name: 'Ormeau-Yatala, QL, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 7308, 19103],
            },
            list: {
              id: 21866,
              title: 'Ormeau-Yatala Check List',
            },
          },
          {
            id: 105980092,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 19312,
              name: 'Port Adel. Enfield - East',
              display_name: 'Port Adel. Enfield - East, SA, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6899, 19312],
            },
            list: {
              id: 22075,
              title: 'Port Adel. Enfield - East Check List',
            },
          },
          {
            id: 116446973,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18586,
              name: 'Auburn',
              display_name: 'Auburn, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 18586],
            },
            list: {
              id: 21349,
              title: 'Auburn Check List',
            },
          },
          {
            id: 124039822,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 19250,
              name: 'Burnside  - South-West',
              display_name: 'Burnside  - South-West, SA, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6899, 19250],
            },
            list: {
              id: 22013,
              title: 'Burnside  - South-West Check List',
            },
          },
          {
            id: 123053751,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18666,
              name: 'Parramatta - North-East',
              display_name: 'Parramatta - North-East, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 18666],
            },
            list: {
              id: 21429,
              title: 'Parramatta - North-East Check List',
            },
          },
          {
            id: 125213953,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18672,
              name: 'Port Macquarie-Hastings - Pt A',
              display_name: 'Port Macquarie-Hastings - Pt A, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 18672],
            },
            list: {
              id: 21435,
              title: 'Port Macquarie-Hastings - Pt A Check List',
            },
          },
          {
            id: 123552857,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18700,
              name: 'Wyong - North-East',
              display_name: 'Wyong - North-East, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 18700],
            },
            list: {
              id: 21463,
              title: 'Wyong - North-East Check List',
            },
          },
          {
            id: 88781442,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18874,
              name: 'Calliope - Pt A',
              display_name: 'Calliope - Pt A, QL, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 7308, 18874],
            },
            list: {
              id: 21637,
              title: 'Calliope - Pt A Check List',
            },
          },
          {
            id: 106580293,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 19286,
              name: 'Mitcham - Hills',
              display_name: 'Mitcham - Hills, SA, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6899, 19286],
            },
            list: {
              id: 22049,
              title: 'Mitcham - Hills Check List',
            },
          },
          {
            id: 88428676,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 19200,
              name: 'Wacol',
              display_name: 'Wacol, QL, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 7308, 19200],
            },
            list: {
              id: 21963,
              title: 'Wacol Check List',
            },
          },
          {
            id: 121366875,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18686,
              name: 'Sydney - West',
              display_name: 'Sydney - West, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 18686],
            },
            list: {
              id: 21449,
              title: 'Sydney - West Check List',
            },
          },
          {
            id: 73523723,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18516,
              name: 'Gungahlin-Hall - SSD Bal',
              display_name: 'Gungahlin-Hall - SSD Bal, CT, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 12986, 18516],
            },
            list: {
              id: 21279,
              title: 'Gungahlin-Hall - SSD Bal Check List',
            },
          },
          {
            id: 119750981,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18674,
              name: 'Randwick',
              display_name: 'Randwick, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 18674],
            },
            list: {
              id: 21437,
              title: 'Randwick Check List',
            },
          },
          {
            id: 107620844,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 14774,
              name: 'Belmont',
              display_name: 'Belmont, WA, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6827, 14774],
            },
            list: {
              id: 17537,
              title: 'Belmont Check List',
            },
          },
          {
            id: 50208664,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 49092,
              name: 'Livingstone - Pt B',
              display_name: 'Livingstone - Pt B, QL, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 7308, 49092],
            },
            list: {
              id: 51856,
              title: 'Livingstone - Pt B Check List',
            },
          },
          {
            id: 90309841,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 49048,
              name: 'Singleton',
              display_name: 'Singleton, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 49048],
            },
            list: {
              id: 51812,
              title: 'Singleton Check List',
            },
          },
          {
            id: 90115959,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18642,
              name: 'Lake Macquarie - West',
              display_name: 'Lake Macquarie - West, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 18642],
            },
            list: {
              id: 21405,
              title: 'Lake Macquarie - West Check List',
            },
          },
          {
            id: 33399301,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18580,
              name: 'Weston Creek-Stromlo - SSD Bal',
              display_name: 'Weston Creek-Stromlo - SSD Bal, CT, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 12986, 18580],
            },
            list: {
              id: 21343,
              title: 'Weston Creek-Stromlo - SSD Bal Check List',
            },
          },
          {
            id: 109102998,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18589,
              name: 'Bankstown  - South',
              display_name: 'Bankstown  - South, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 18589],
            },
            list: {
              id: 21352,
              title: 'Bankstown  - South Check List',
            },
          },
          {
            id: 3126995,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 829,
              name: 'San Diego',
              display_name: 'San Diego County, CA, US',
              admin_level: 20,
              ancestor_place_ids: [97394, 1, 14, 829],
            },
            list: {
              id: 68187,
              title: 'Poaceae of San Diego County, CA, US',
            },
          },
          {
            id: 107583499,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 49026,
              name: 'Hornsby - North',
              display_name: 'Hornsby - North, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 49026],
            },
            list: {
              id: 51790,
              title: 'Hornsby - North Check List',
            },
          },
          {
            id: 99186962,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 49036,
              name: 'Moree Plains',
              display_name: 'Moree Plains, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 49036],
            },
            list: {
              id: 51800,
              title: 'Moree Plains Check List',
            },
          },
          {
            id: 103529175,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18842,
              name: 'Bribie Island',
              display_name: 'Bribie Island, QL, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 7308, 18842],
            },
            list: {
              id: 21605,
              title: 'Bribie Island Check List',
            },
          },
          {
            id: 84782978,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 14756,
              name: 'Wodonga',
              display_name: 'Wodonga, VI, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 7830, 14756],
            },
            list: {
              id: 17519,
              title: 'Wodonga Check List',
            },
          },
          {
            id: 93718313,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 49063,
              name: 'Warringah',
              display_name: 'Warringah, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 49063],
            },
            list: {
              id: 51827,
              title: 'Warringah Check List',
            },
          },
          {
            id: 115803256,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 19013,
              name: 'Kilkivan',
              display_name: 'Kilkivan, QL, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 7308, 19013],
            },
            list: {
              id: 21776,
              title: 'Kilkivan Check List',
            },
          },
          {
            id: 116196061,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 19332,
              name: 'Tea Tree Gully  - Hills',
              display_name: 'Tea Tree Gully  - Hills, SA, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6899, 19332],
            },
            list: {
              id: 22095,
              title: 'Tea Tree Gully  - Hills Check List',
            },
          },
          {
            id: 112003369,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18667,
              name: 'Parramatta - North-West',
              display_name: 'Parramatta - North-West, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 18667],
            },
            list: {
              id: 21430,
              title: 'Parramatta - North-West Check List',
            },
          },
          {
            id: 118447482,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18908,
              name: 'Cooloola (excl. Gympie)',
              display_name: 'Cooloola (excl. Gympie), QL, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 7308, 18908],
            },
            list: {
              id: 21671,
              title: 'Cooloola (excl. Gympie) Check List',
            },
          },
          {
            id: 90533838,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18820,
              name: 'Beaudesert  - Pt B',
              display_name: 'Beaudesert  - Pt B, QL, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 7308, 18820],
            },
            list: {
              id: 21583,
              title: 'Beaudesert  - Pt B Check List',
            },
          },
          {
            id: 67583186,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18950,
              name: 'Fitzroy - Pt B',
              display_name: 'Fitzroy - Pt B, QL, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 7308, 18950],
            },
            list: {
              id: 21713,
              title: 'Fitzroy - Pt B Check List',
            },
          },
          {
            id: 113237232,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 49045,
              name: 'Port Stephens',
              display_name: 'Port Stephens, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 49045],
            },
            list: {
              id: 51809,
              title: 'Port Stephens Check List',
            },
          },
          {
            id: 3126994,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 962,
              name: 'Los Angeles',
              display_name: 'Los Angeles County, US, CA',
              admin_level: 20,
              ancestor_place_ids: [97394, 1, 14, 962],
            },
            list: {
              id: 68183,
              title: 'Poaceae of Los Angeles County, CA, US',
            },
          },
          {
            id: 93514195,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 19003,
              name: 'Jondaryan - Pt B',
              display_name: 'Jondaryan - Pt B, QL, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 7308, 19003],
            },
            list: {
              id: 21766,
              title: 'Jondaryan - Pt B Check List',
            },
          },
          {
            id: 126485152,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 19209,
              name: 'Warwick - West',
              display_name: 'Warwick - West, QL, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 7308, 19209],
            },
            list: {
              id: 21972,
              title: 'Warwick - West Check List',
            },
          },
          {
            id: 77815842,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 19334,
              name: 'Tea Tree Gully - North',
              display_name: 'Tea Tree Gully - North, SA, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6899, 19334],
            },
            list: {
              id: 22097,
              title: 'Tea Tree Gully - North Check List',
            },
          },
          {
            id: 59222391,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 49057,
              name: 'Uralla',
              display_name: 'Uralla, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 49057],
            },
            list: {
              id: 51821,
              title: 'Uralla Check List',
            },
          },
          {
            id: 115691021,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18859,
              name: 'Burnett  - Pt B',
              display_name: 'Burnett  - Pt B, QL, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 7308, 18859],
            },
            list: {
              id: 21622,
              title: 'Burnett  - Pt B Check List',
            },
          },
          {
            id: 123714670,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 49067,
              name: 'Wingecarribee',
              display_name: 'Wingecarribee, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 49067],
            },
            list: {
              id: 51831,
              title: 'Wingecarribee Check List',
            },
          },
          {
            id: 61679759,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18880,
              name: 'Cambooya - Pt A',
              display_name: 'Cambooya - Pt A, QL, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 7308, 18880],
            },
            list: {
              id: 21643,
              title: 'Cambooya - Pt A Check List',
            },
          },
          {
            id: 74682830,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 49050,
              name: 'Tamworth Regional - Pt B',
              display_name: 'Tamworth Regional - Pt B, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 49050],
            },
            list: {
              id: 51814,
              title: 'Tamworth Regional - Pt B Check List',
            },
          },
          {
            id: 101637040,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18588,
              name: 'Bankstown  - North-West',
              display_name: 'Bankstown  - North-West, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 18588],
            },
            list: {
              id: 21351,
              title: 'Bankstown  - North-West Check List',
            },
          },
          {
            id: 65053072,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 19223,
              name: 'Woocoo',
              display_name: 'Woocoo, QL, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 7308, 19223],
            },
            list: {
              id: 21986,
              title: 'Woocoo Check List',
            },
          },
          {
            id: 126423824,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 49068,
              name: 'Wollondilly',
              display_name: 'Wollondilly, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 49068],
            },
            list: {
              id: 51832,
              title: 'Wollondilly Check List',
            },
          },
          {
            id: 24806852,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 52355,
              name: 'City of Cape Town',
              display_name: 'City of Cape Town, WC, ZA',
              admin_level: 20,
              ancestor_place_ids: [97392, 113055, 6986, 6987, 52355],
            },
            list: {
              id: 63740,
              title: 'City of Cape Town Check List',
            },
          },
          {
            id: 111786202,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 49098,
              name: 'Redland Bal',
              display_name: 'Redland Bal, QL, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 7308, 49098],
            },
            list: {
              id: 51862,
              title: 'Redland Bal Check List',
            },
          },
          {
            id: 101462734,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18993,
              name: 'Ipswich - South-West',
              display_name: 'Ipswich - South-West, QL, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 7308, 18993],
            },
            list: {
              id: 21756,
              title: 'Ipswich - South-West Check List',
            },
          },
          {
            id: 88685535,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18944,
              name: 'Esk',
              display_name: 'Esk, QL, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 7308, 18944],
            },
            list: {
              id: 21707,
              title: 'Esk Check List',
            },
          },
          {
            id: 91866064,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 36659,
              name: 'Mezquital',
              display_name: 'Mezquital, MX, DU',
              admin_level: 20,
              ancestor_place_ids: [97394, 6793, 11166, 36659],
            },
            list: {
              id: 39422,
              title: 'Mezquital Check List',
            },
          },
          {
            id: 64691915,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 19059,
              name: 'Miriam Vale',
              display_name: 'Miriam Vale, QL, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 7308, 19059],
            },
            list: {
              id: 21822,
              title: 'Miriam Vale Check List',
            },
          },
          {
            id: 30756224,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 49013,
              name: 'Eurobodalla',
              display_name: 'Eurobodalla, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 49013],
            },
            list: {
              id: 51777,
              title: 'Eurobodalla Check List',
            },
          },
          {
            id: 97384527,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18583,
              name: 'Albury',
              display_name: 'Albury, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 18583],
            },
            list: {
              id: 21346,
              title: 'Albury Check List',
            },
          },
          {
            id: 65962523,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 49090,
              name: 'Hervey Bay - Pt B',
              display_name: 'Hervey Bay - Pt B, QL, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 7308, 49090],
            },
            list: {
              id: 51854,
              title: 'Hervey Bay - Pt B Check List',
            },
          },
          {
            id: 118772446,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18659,
              name: 'Newcastle - Inner City',
              display_name: 'Newcastle - Inner City, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 18659],
            },
            list: {
              id: 21422,
              title: 'Newcastle - Inner City Check List',
            },
          },
          {
            id: 89657337,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18819,
              name: 'Beaudesert  - Pt A',
              display_name: 'Beaudesert  - Pt A, QL, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 7308, 18819],
            },
            list: {
              id: 21582,
              title: 'Beaudesert  - Pt A Check List',
            },
          },
          {
            id: 103757735,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 19307,
              name: 'Playford - Elizabeth',
              display_name: 'Playford - Elizabeth, SA, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6899, 19307],
            },
            list: {
              id: 22070,
              title: 'Playford - Elizabeth Check List',
            },
          },
          {
            id: 53041430,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 49008,
              name: 'Cooma-Monaro',
              display_name: 'Cooma-Monaro, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 49008],
            },
            list: {
              id: 51772,
              title: 'Cooma-Monaro Check List',
            },
          },
          {
            id: 119538655,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 19203,
              name: 'Wambo',
              display_name: 'Wambo, QL, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 7308, 19203],
            },
            list: {
              id: 21966,
              title: 'Wambo Check List',
            },
          },
          {
            id: 84108899,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18937,
              name: 'Eidsvold',
              display_name: 'Eidsvold, QL, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 7308, 18937],
            },
            list: {
              id: 21700,
              title: 'Eidsvold Check List',
            },
          },
          {
            id: 95160616,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 19165,
              name: 'Stanthorpe',
              display_name: 'Stanthorpe, QL, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 7308, 19165],
            },
            list: {
              id: 21928,
              title: 'Stanthorpe Check List',
            },
          },
          {
            id: 74309701,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 49031,
              name: 'Lake Macquarie  - North',
              display_name: 'Lake Macquarie  - North, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 49031],
            },
            list: {
              id: 51795,
              title: 'Lake Macquarie  - North Check List',
            },
          },
          {
            id: 122831712,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 14816,
              name: 'Gosnells',
              display_name: 'Gosnells, WA, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6827, 14816],
            },
            list: {
              id: 17579,
              title: 'Gosnells Check List',
            },
          },
          {
            id: 69524744,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 19327,
              name: 'Salisbury - North-East',
              display_name: 'Salisbury - North-East, SA, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6899, 19327],
            },
            list: {
              id: 22090,
              title: 'Salisbury - North-East Check List',
            },
          },
          {
            id: 126131282,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 49051,
              name: 'Tenterfield',
              display_name: 'Tenterfield, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 49051],
            },
            list: {
              id: 51815,
              title: 'Tenterfield Check List',
            },
          },
          {
            id: 108576213,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 19190,
              name: 'Townsville - Pt B',
              display_name: 'Townsville - Pt B, QL, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 7308, 19190],
            },
            list: {
              id: 21953,
              title: 'Townsville - Pt B Check List',
            },
          },
          {
            id: 106584919,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18991,
              name: 'Ipswich - East',
              display_name: 'Ipswich - East, QL, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 7308, 18991],
            },
            list: {
              id: 21754,
              title: 'Ipswich - East Check List',
            },
          },
          {
            id: 119123892,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18988,
              name: 'Inglewood',
              display_name: 'Inglewood, QL, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 7308, 18988],
            },
            list: {
              id: 21751,
              title: 'Inglewood Check List',
            },
          },
          {
            id: 50120081,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 49114,
              name: 'Manjimup',
              display_name: 'Manjimup, WA, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6827, 49114],
            },
            list: {
              id: 51878,
              title: 'Manjimup Check List',
            },
          },
          {
            id: 116403568,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18699,
              name: 'Woollahra',
              display_name: 'Woollahra, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 18699],
            },
            list: {
              id: 21462,
              title: 'Woollahra Check List',
            },
          },
          {
            id: 69173601,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 49077,
              name: 'Broadsound',
              display_name: 'Broadsound, QL, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 7308, 49077],
            },
            list: {
              id: 51841,
              title: 'Broadsound Check List',
            },
          },
          {
            id: 124444633,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 48996,
              name: 'Blue Mountains',
              display_name: 'Blue Mountains, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 48996],
            },
            list: {
              id: 51760,
              title: 'Blue Mountains Check List',
            },
          },
          {
            id: 73611191,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 49028,
              name: 'Kempsey',
              display_name: 'Kempsey, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 49028],
            },
            list: {
              id: 51792,
              title: 'Kempsey Check List',
            },
          },
          {
            id: 112687089,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 19188,
              name: 'Toowoomba - South-East',
              display_name: 'Toowoomba - South-East, QL, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 7308, 19188],
            },
            list: {
              id: 21951,
              title: 'Toowoomba - South-East Check List',
            },
          },
          {
            id: 116095065,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 19309,
              name: 'Playford - West',
              display_name: 'Playford - West, SA, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6899, 19309],
            },
            list: {
              id: 22072,
              title: 'Playford - West Check List',
            },
          },
          {
            id: 117799455,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 49027,
              name: 'Inverell - Pt A',
              display_name: 'Inverell - Pt A, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 49027],
            },
            list: {
              id: 51791,
              title: 'Inverell - Pt A Check List',
            },
          },
          {
            id: 101615369,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 19287,
              name: 'Mitcham - North-East',
              display_name: 'Mitcham - North-East, SA, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6899, 19287],
            },
            list: {
              id: 22050,
              title: 'Mitcham - North-East Check List',
            },
          },
          {
            id: 113484701,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 19139,
              name: 'Rockhampton',
              display_name: 'Rockhampton, QL, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 7308, 19139],
            },
            list: {
              id: 21902,
              title: 'Rockhampton Check List',
            },
          },
          {
            id: 113515109,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 19207,
              name: 'Warwick - East',
              display_name: 'Warwick - East, QL, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 7308, 19207],
            },
            list: {
              id: 21970,
              title: 'Warwick - East Check List',
            },
          },
          {
            id: 112973978,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18682,
              name: 'Sutherland Shire - West',
              display_name: 'Sutherland Shire - West, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 18682],
            },
            list: {
              id: 21445,
              title: 'Sutherland Shire - West Check List',
            },
          },
          {
            id: 112302557,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 49003,
              name: 'Clarence Valley Bal',
              display_name: 'Clarence Valley Bal, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 49003],
            },
            list: {
              id: 51767,
              title: 'Clarence Valley Bal Check List',
            },
          },
          {
            id: 113515015,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 19308,
              name: 'Playford - Hills',
              display_name: 'Playford - Hills, SA, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6899, 19308],
            },
            list: {
              id: 22071,
              title: 'Playford - Hills Check List',
            },
          },
          {
            id: 105562710,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18671,
              name: 'Pittwater',
              display_name: 'Pittwater, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 18671],
            },
            list: {
              id: 21434,
              title: 'Pittwater Check List',
            },
          },
          {
            id: 75669129,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 14771,
              name: 'Augusta-Margaret River',
              display_name: 'Augusta-Margaret River, WA, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6827, 14771],
            },
            list: {
              id: 17534,
              title: 'Augusta-Margaret River Check List',
            },
          },
          {
            id: 113488190,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18632,
              name: 'Hornsby - South',
              display_name: 'Hornsby - South, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 18632],
            },
            list: {
              id: 21395,
              title: 'Hornsby - South Check List',
            },
          },
          {
            id: 120321858,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18687,
              name: 'Tamworth Regional - Pt A',
              display_name: 'Tamworth Regional - Pt A, NS, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 6825, 18687],
            },
            list: {
              id: 21450,
              title: 'Tamworth Regional - Pt A Check List',
            },
          },
          {
            id: 95159882,
            taxon_id: 77479,
            establishment_means: 'introduced',
            place: {
              id: 18834,
              name: 'Boonah',
              display_name: 'Boonah, QL, AU',
              admin_level: 20,
              ancestor_place_ids: [97393, 6744, 7308, 18834],
            },
            list: {
              id: 21597,
              title: 'Boonah Check List',
            },
          },
        ],
        wikipedia_summary:
          '\u003Ci\u003E\u003Cb\u003EHyparrhenia hirta\u003C/b\u003E\u003C/i\u003E is a species of grass known by the common names \u003Cb\u003Ecommon thatching grass\u003C/b\u003E and \u003Cb\u003ECoolatai grass\u003C/b\u003E. It is native to much of Africa and Eurasia, and it is known on other continents as an introduced species. In eastern Australia it is a tenacious noxious weed. In South Africa, where it is native, it is very common and one of the most widely used thatching grasses. It is also used for grazing livestock and weaving...',
        vision: true,
      },
    ],
  },
]
var species = (0, exports.mapInatSpeciesToLTP)(
  input
    .map(function (i) {
      return i.results
    })
    .flat()
)
console.log(species)
