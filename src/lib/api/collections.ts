import { Collection, Taxon } from '@/types'

export const getCollections = (): Promise<Collection<Taxon>[]> => {
  const collection1 = {
    id: '1',
    type: 'taxonomy',
    name: 'Arrábida field notes',
    date: 'Fri May 03 2024',
    location: 'São Simão, Portugal',
    items: [
      {
        id: 77479,
        iconicTaxon: 'Plantae',
        binomial: 'Hyparrhenia hirta',
        rank: 'species',
        vernacularName: 'thatching grass',
        images: [
          {
            id: 377244087,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377244087/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377244679,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377244679/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 256086487,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/square.jpeg',
          licenceCode: 'cc-by-nc',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/medium.jpeg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/square.jpeg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213460255',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Hyparrhenia_hirta',
      },
      {
        id: 77479,
        iconicTaxon: 'Plantae',
        binomial: 'Hyparrhenia hirta',
        rank: 'species',
        vernacularName: 'thatching grass',
        images: [
          {
            id: 377244104,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377244104/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 256086487,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/square.jpeg',
          licenceCode: 'cc-by-nc',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/medium.jpeg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/square.jpeg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213460253',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Hyparrhenia_hirta',
      },
      {
        id: 636795,
        iconicTaxon: 'Plantae',
        binomial: 'Salvia rosmarinus',
        rank: 'species',
        vernacularName: 'Rosemary',
        images: [
          {
            id: 377234354,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377234354/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377234042,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377234042/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 87326219,
          url: 'https://static.inaturalist.org/photos/87326219/square.jpg',
          licenceCode: '',
          mediumUrl:
            'https://static.inaturalist.org/photos/87326219/medium.jpg',
          squareUrl:
            'https://static.inaturalist.org/photos/87326219/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213454717',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Rosemary',
      },
      {
        id: 60218,
        iconicTaxon: 'Plantae',
        binomial: 'Ficus carica',
        rank: 'species',
        vernacularName: 'common fig',
        images: [
          {
            id: 377233239,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377233239/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 425438609,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/425438609/square.jpeg',
          licenceCode: 'cc-by-nc',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/425438609/medium.jpeg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/425438609/square.jpeg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213454235',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Common_fig',
      },
      {
        id: 82864,
        iconicTaxon: 'Plantae',
        binomial: 'Plantago serraria',
        rank: 'species',
        vernacularName: 'Toothed Plantain',
        images: [
          {
            id: 377230447,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377230447/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377232283,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377232283/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377232812,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377232812/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 35504905,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/35504905/square.jpg',
          licenceCode: 'cc-by-nc-sa',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/35504905/medium.jpg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/35504905/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213452551',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Plantago_serraria',
      },
      {
        id: 82850,
        iconicTaxon: 'Plantae',
        binomial: 'Ruta montana',
        rank: 'species',
        vernacularName: 'Mountain Rue',
        images: [
          {
            id: 377230418,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377230418/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377231893,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377231893/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 2075742,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/2075742/square.jpg',
          licenceCode: 'cc-by-nc-sa',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/2075742/medium.jpg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/2075742/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213452550',
        wikipediaUrl: null,
      },
      {
        id: 57076,
        iconicTaxon: 'Plantae',
        binomial: 'Trifolium campestre',
        rank: 'species',
        vernacularName: 'hop trefoil',
        images: [
          {
            id: 377230413,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377230413/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377230847,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377230847/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377230849,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377230849/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 73248929,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/73248929/square.jpg',
          licenceCode: 'cc-by',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/73248929/medium.jpg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/73248929/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213452548',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Trifolium_campestre',
      },
      {
        id: 55653,
        iconicTaxon: 'Insecta',
        binomial: 'Maniola jurtina',
        rank: 'species',
        vernacularName: 'Meadow Brown',
        images: [
          {
            id: 377220327,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377220327/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 455965,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/455965/square.jpg',
          licenceCode: 'cc-by-nc-nd',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/455965/medium.jpg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/455965/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213447029',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Meadow_brown',
      },
      {
        id: 333932,
        iconicTaxon: 'Insecta',
        binomial: 'Euchloe belemia',
        rank: 'species',
        vernacularName: 'Green-striped White',
        images: [
          {
            id: 377215889,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377215889/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377217196,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377217196/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377217214,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377217214/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 175391070,
          url: 'https://static.inaturalist.org/photos/175391070/square.jpg',
          licenceCode: '',
          mediumUrl:
            'https://static.inaturalist.org/photos/175391070/medium.jpg',
          squareUrl:
            'https://static.inaturalist.org/photos/175391070/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213444925',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Euchloe_belemia',
      },
      {
        id: 76363,
        iconicTaxon: 'Plantae',
        binomial: 'Cistus monspeliensis',
        rank: 'species',
        vernacularName: 'Montpelier Cistus',
        images: [
          {
            id: 377211260,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377211260/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377212931,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377212931/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377212941,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377212941/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377213234,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377213234/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 345720885,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/345720885/square.jpeg',
          licenceCode: 'cc-by-sa',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/345720885/medium.jpeg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/345720885/square.jpeg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213442948',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Cistus_monspeliensis',
      },
      {
        id: 118535,
        iconicTaxon: 'Plantae',
        binomial: 'Drimia maritima',
        rank: 'species',
        vernacularName: 'sea squill',
        images: [
          {
            id: 377211233,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377211233/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 433502522,
          url: 'https://static.inaturalist.org/photos/433502522/square.jpeg',
          licenceCode: '',
          mediumUrl:
            'https://static.inaturalist.org/photos/433502522/medium.jpeg',
          squareUrl:
            'https://static.inaturalist.org/photos/433502522/square.jpeg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213442947',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Drimia_maritima',
      },
      {
        id: 82672,
        iconicTaxon: 'Plantae',
        binomial: 'Cistus crispus',
        rank: 'species',
        vernacularName: 'curly rockrose',
        images: [
          {
            id: 377211281,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377211281/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377213960,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377213960/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377213983,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377213983/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377213985,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377213985/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377213989,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377213989/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377213986,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377213986/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 5552917,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/5552917/square.jpeg',
          licenceCode: 'cc-by-nc',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/5552917/medium.jpeg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/5552917/square.jpeg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213442946',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Cistus_crispus',
      },
      {
        id: 82634,
        iconicTaxon: 'Plantae',
        binomial: 'Santolina rosmarinifolia',
        rank: 'species',
        vernacularName: 'Holy-flax',
        images: [
          {
            id: 377211222,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377211222/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377215015,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377215015/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 116668473,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/116668473/square.jpg',
          licenceCode: 'cc-by-nc',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/116668473/medium.jpg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/116668473/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213442945',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Santolina_rosmarinifolia',
      },
      {
        id: 64103,
        iconicTaxon: 'Plantae',
        binomial: 'Agave americana',
        rank: 'species',
        vernacularName: 'American century plant',
        images: [
          {
            id: 377211220,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377211220/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 333174371,
          url: 'https://static.inaturalist.org/photos/333174371/square.jpg',
          licenceCode: '',
          mediumUrl:
            'https://static.inaturalist.org/photos/333174371/medium.jpg',
          squareUrl:
            'https://static.inaturalist.org/photos/333174371/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213442943',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Agave_americana',
      },
      {
        id: 82942,
        iconicTaxon: 'Plantae',
        binomial: 'Quercus coccifera',
        rank: 'species',
        vernacularName: 'Kermes oak',
        images: [
          {
            id: 377211197,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377211197/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377233523,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377233523/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 113483275,
          url: 'https://static.inaturalist.org/photos/113483275/square.jpg',
          licenceCode: '',
          mediumUrl:
            'https://static.inaturalist.org/photos/113483275/medium.jpg',
          squareUrl:
            'https://static.inaturalist.org/photos/113483275/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213442941',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Quercus_coccifera',
      },
      {
        id: 208988,
        iconicTaxon: 'Insecta',
        binomial: 'Satyrium spini',
        rank: 'species',
        vernacularName: 'Blue-spot Hairstreak',
        images: [
          {
            id: 377207330,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377207330/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377209450,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377209450/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377209464,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377209464/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377209466,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377209466/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 51689606,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/51689606/square.jpg',
          licenceCode: 'cc-by',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/51689606/medium.jpg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/51689606/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213440456',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Satyrium_spini',
      },
      {
        id: 71173,
        iconicTaxon: 'Plantae',
        binomial: 'Gladiolus illyricus',
        rank: 'species',
        vernacularName: 'Wild Gladiolus',
        images: [
          {
            id: 377207333,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377207333/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377208821,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377208821/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377208835,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377208835/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377208841,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377208841/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 31452,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/31452/square.jpg',
          licenceCode: 'cc-by-nc',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/31452/medium.jpg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/31452/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213440455',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Gladiolus_illyricus',
      },
      {
        id: 734833,
        iconicTaxon: 'Plantae',
        binomial: 'Petrosedum sediforme',
        rank: 'species',
        vernacularName: 'Pale Stonecrop',
        images: [
          {
            id: 377207332,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377207332/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377208424,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377208424/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 144898541,
          url: 'https://static.inaturalist.org/photos/144898541/square.jpeg',
          licenceCode: '',
          mediumUrl:
            'https://static.inaturalist.org/photos/144898541/medium.jpeg',
          squareUrl:
            'https://static.inaturalist.org/photos/144898541/square.jpeg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213440450',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Petrosedum_sediforme',
      },
      {
        id: 707889,
        iconicTaxon: 'Plantae',
        binomial: 'Lysimachia monelli',
        rank: 'species',
        vernacularName: 'Flax-leaved Blue Pimpernel',
        images: [
          {
            id: 377201511,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377201511/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377202959,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377202959/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 106501291,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/106501291/square.jpg',
          licenceCode: 'cc-by',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/106501291/medium.jpg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/106501291/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213436828',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Lysimachia_monelli',
      },
      {
        id: 123815,
        iconicTaxon: 'Insecta',
        binomial: 'Gonepteryx cleopatra',
        rank: 'species',
        vernacularName: 'Cleopatra Butterfly',
        images: [
          {
            id: 377203761,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377203761/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377201459,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377201459/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 31308671,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/31308671/square.jpg',
          licenceCode: 'cc-by-nc',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/31308671/medium.jpg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/31308671/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213436824',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Gonepteryx_cleopatra',
      },
      {
        id: 82664,
        iconicTaxon: 'Plantae',
        binomial: 'Lonicera implexa',
        rank: 'species',
        vernacularName: 'Mediterranean Honeysuckle',
        images: [
          {
            id: 377201423,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377201423/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 37591,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/37591/square.jpg',
          licenceCode: 'cc-by-nc-sa',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/37591/medium.jpg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/37591/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213436823',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Lonicera_implexa',
      },
      {
        id: 56236,
        iconicTaxon: 'Plantae',
        binomial: 'Centaurium erythraea',
        rank: 'species',
        vernacularName: 'Common centaury',
        images: [
          {
            id: 377201420,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377201420/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377204927,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377204927/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 20424700,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/20424700/square.jpg',
          licenceCode: 'cc-by',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/20424700/medium.jpg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/20424700/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213436822',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Centaurium_erythraea',
      },
      {
        id: 164139,
        iconicTaxon: 'Plantae',
        binomial: 'Iris xiphium',
        rank: 'species',
        vernacularName: 'Spanish Iris',
        images: [
          {
            id: 377201421,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377201421/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377214491,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377214491/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377214512,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377214512/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377214513,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377214513/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 3008054,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/3008054/square.jpg',
          licenceCode: 'pd',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/3008054/medium.jpg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/3008054/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213436819',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Iris_xiphium',
      },
      {
        id: 132892,
        iconicTaxon: 'Insecta',
        binomial: 'Anacridium aegyptium',
        rank: 'species',
        vernacularName: 'Egyptian Bird Grasshopper',
        images: [
          {
            id: 377196300,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377196300/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377199066,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377199066/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377199068,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377199068/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377199072,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377199072/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377199075,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377199075/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377199074,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377199074/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 70331970,
          url: 'https://static.inaturalist.org/photos/70331970/square.jpg',
          licenceCode: '',
          mediumUrl:
            'https://static.inaturalist.org/photos/70331970/medium.jpg',
          squareUrl:
            'https://static.inaturalist.org/photos/70331970/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213434768',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Anacridium_aegyptium',
      },
      {
        id: 82644,
        iconicTaxon: 'Plantae',
        binomial: 'Cynara humilis',
        rank: 'species',
        vernacularName: 'Dwarf Artichoke',
        images: [
          {
            id: 377196315,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377196315/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 22221301,
          url: 'https://static.inaturalist.org/photos/22221301/square.jpeg',
          licenceCode: '',
          mediumUrl:
            'https://static.inaturalist.org/photos/22221301/medium.jpeg',
          squareUrl:
            'https://static.inaturalist.org/photos/22221301/square.jpeg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213434765',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Cynara_humilis',
      },
      {
        id: 54404,
        iconicTaxon: 'Plantae',
        binomial: 'Papaver rhoeas',
        rank: 'species',
        vernacularName: 'common poppy',
        images: [
          {
            id: 377196271,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377196271/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 234132991,
          url: 'https://static.inaturalist.org/photos/234132991/square.jpg',
          licenceCode: '',
          mediumUrl:
            'https://static.inaturalist.org/photos/234132991/medium.jpg',
          squareUrl:
            'https://static.inaturalist.org/photos/234132991/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213434763',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Papaver_rhoeas',
      },
      {
        id: 76434,
        iconicTaxon: 'Plantae',
        binomial: 'Convolvulus tricolor',
        rank: 'species',
        vernacularName: 'Dwarf Morning-glory',
        images: [
          {
            id: 377196274,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377196274/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377200200,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377200200/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377200215,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377200215/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 219623979,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/219623979/square.jpeg',
          licenceCode: 'cc-by-nc',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/219623979/medium.jpeg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/219623979/square.jpeg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213434760',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Convolvulus_tricolor',
      },
      {
        id: 83085,
        iconicTaxon: 'Plantae',
        binomial: 'Anacamptis pyramidalis',
        rank: 'species',
        vernacularName: 'pyramidal orchid',
        images: [
          {
            id: 377196268,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377196268/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377200036,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377200036/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 128723699,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/128723699/square.jpg',
          licenceCode: 'cc-by-sa',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/128723699/medium.jpg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/128723699/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213434759',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Anacamptis_pyramidalis',
      },
      {
        id: 540328,
        iconicTaxon: 'Reptilia',
        binomial: 'Zamenis scalaris',
        rank: 'species',
        vernacularName: 'Ladder Snake',
        images: [
          {
            id: 377196252,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377196252/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377199677,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377199677/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377199687,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377199687/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377199690,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377199690/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377199689,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377199689/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377199691,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377199691/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377199713,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377199713/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377199729,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377199729/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 477396359,
          url: 'https://static.inaturalist.org/photos/477396359/square.jpeg',
          licenceCode: '',
          mediumUrl:
            'https://static.inaturalist.org/photos/477396359/medium.jpeg',
          squareUrl:
            'https://static.inaturalist.org/photos/477396359/square.jpeg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213434758',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Ladder_snake',
      },
      {
        id: 71192,
        iconicTaxon: 'Plantae',
        binomial: 'Linum strictum',
        rank: 'species',
        vernacularName: 'Upright Yellow-flax',
        images: [
          {
            id: 377191530,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377191530/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377193953,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377193953/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377193958,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377193958/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 287038339,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/287038339/square.jpeg',
          licenceCode: 'cc-by-nc',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/287038339/medium.jpeg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/287038339/square.jpeg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213431852',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Linum_strictum',
      },
      {
        id: 64265,
        iconicTaxon: 'Plantae',
        binomial: 'Medicago orbicularis',
        rank: 'species',
        vernacularName: 'button medick',
        images: [
          {
            id: 377191529,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377191529/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 17680491,
          url: 'https://static.inaturalist.org/photos/17680491/square.jpg',
          licenceCode: '',
          mediumUrl:
            'https://static.inaturalist.org/photos/17680491/medium.jpg',
          squareUrl:
            'https://static.inaturalist.org/photos/17680491/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213431851',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Medicago_orbicularis',
      },
      {
        id: 82895,
        iconicTaxon: 'Plantae',
        binomial: 'Allium roseum',
        rank: 'species',
        vernacularName: 'rosy garlic',
        images: [
          {
            id: 377191526,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377191526/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 1783048,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/1783048/square.JPG',
          licenceCode: 'cc-by-nc',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/1783048/medium.JPG',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/1783048/square.JPG',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213431850',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Allium_roseum',
      },
      {
        id: 791928,
        iconicTaxon: 'Plantae',
        binomial: 'Lysimachia arvensis',
        rank: 'species',
        vernacularName: 'scarlet pimpernel',
        images: [
          {
            id: 377191500,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377191500/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 223278664,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/223278664/square.jpg',
          licenceCode: 'cc-by-sa',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/223278664/medium.jpg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/223278664/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213431846',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Anagallis_arvensis',
      },
      {
        id: 58300,
        iconicTaxon: 'Plantae',
        binomial: 'Punica granatum',
        rank: 'species',
        vernacularName: 'pomegranate',
        images: [
          {
            id: 377191499,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377191499/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377195664,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377195664/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377195675,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377195675/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 4956594,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/4956594/square.jpeg',
          licenceCode: 'cc-by-sa',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/4956594/medium.jpeg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/4956594/square.jpeg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213431845',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Pomegranate',
      },
      {
        id: 133250,
        iconicTaxon: 'Insecta',
        binomial: 'Tettigonia viridissima',
        rank: 'species',
        vernacularName: 'Great Green Bush-cricket',
        images: [
          {
            id: 377191496,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377191496/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 98388966,
          url: 'https://static.inaturalist.org/photos/98388966/square.jpg',
          licenceCode: '',
          mediumUrl:
            'https://static.inaturalist.org/photos/98388966/medium.jpg',
          squareUrl:
            'https://static.inaturalist.org/photos/98388966/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213431840',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Tettigonia_viridissima',
      },
      {
        id: 82867,
        iconicTaxon: 'Plantae',
        binomial: 'Plantago lagopus',
        rank: 'species',
        vernacularName: "Hare's-foot Plantain",
        images: [
          {
            id: 377123346,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377123346/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377125341,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377125341/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377125348,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377125348/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 22157444,
          url: 'https://static.inaturalist.org/photos/22157444/square.jpeg',
          licenceCode: '',
          mediumUrl:
            'https://static.inaturalist.org/photos/22157444/medium.jpeg',
          squareUrl:
            'https://static.inaturalist.org/photos/22157444/square.jpeg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213392196',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Plantago_lagopus',
      },
      {
        id: 55401,
        iconicTaxon: 'Insecta',
        binomial: 'Pieris brassicae',
        rank: 'species',
        vernacularName: 'Large White',
        images: [
          {
            id: 377123350,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377123350/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377125588,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377125588/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 51458201,
          url: 'https://static.inaturalist.org/photos/51458201/square.jpeg',
          licenceCode: '',
          mediumUrl:
            'https://static.inaturalist.org/photos/51458201/medium.jpeg',
          squareUrl:
            'https://static.inaturalist.org/photos/51458201/square.jpeg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213392194',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Pieris_brassicae',
      },
      {
        id: 59904,
        iconicTaxon: 'Plantae',
        binomial: 'Glebionis coronaria',
        rank: 'species',
        vernacularName: 'Garland Daisy',
        images: [
          {
            id: 377123353,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377123353/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377125738,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377125738/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 14080027,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/14080027/square.jpeg',
          licenceCode: 'cc-by-nc',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/14080027/medium.jpeg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/14080027/square.jpeg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213392193',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Glebionis_coronaria',
      },
      {
        id: 55653,
        iconicTaxon: 'Insecta',
        binomial: 'Maniola jurtina',
        rank: 'species',
        vernacularName: 'Meadow Brown',
        images: [
          {
            id: 377122777,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377122777/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377123015,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377123015/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 455965,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/455965/square.jpg',
          licenceCode: 'cc-by-nc-nd',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/455965/medium.jpg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/455965/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213391260',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Meadow_brown',
      },
      {
        id: 1467819,
        iconicTaxon: 'Plantae',
        binomial: 'Lysimachia loeflingii',
        rank: 'species',
        vernacularName: 'Blue Scarlet Pimpernel',
        images: [
          {
            id: 377119953,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377119953/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377120865,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377120865/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 281291207,
          url: 'https://static.inaturalist.org/photos/281291207/square.jpeg',
          licenceCode: '',
          mediumUrl:
            'https://static.inaturalist.org/photos/281291207/medium.jpeg',
          squareUrl:
            'https://static.inaturalist.org/photos/281291207/square.jpeg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213389990',
        wikipediaUrl: null,
      },
      {
        id: 82850,
        iconicTaxon: 'Plantae',
        binomial: 'Ruta montana',
        rank: 'species',
        vernacularName: 'Mountain Rue',
        images: [
          {
            id: 377119956,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377119956/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 2075742,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/2075742/square.jpg',
          licenceCode: 'cc-by-nc-sa',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/2075742/medium.jpg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/2075742/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213389989',
        wikipediaUrl: null,
      },
      {
        id: 82631,
        iconicTaxon: 'Plantae',
        binomial: 'Phagnalon saxatile',
        rank: 'species',
        vernacularName: 'Mediterranean Phagnalon',
        images: [
          {
            id: 377119946,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377119946/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377121117,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377121117/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377121123,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377121123/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 1999988,
          url: 'https://static.inaturalist.org/photos/1999988/square.jpg',
          licenceCode: '',
          mediumUrl: 'https://static.inaturalist.org/photos/1999988/medium.jpg',
          squareUrl: 'https://static.inaturalist.org/photos/1999988/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213389988',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Phagnalon_saxatile',
      },
      {
        id: 61904,
        iconicTaxon: 'Plantae',
        binomial: 'Lavandula stoechas',
        rank: 'species',
        vernacularName: 'topped lavender',
        images: [
          {
            id: 377119927,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377119927/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377121411,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377121411/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377121417,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377121417/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377121418,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377121418/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377121423,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377121423/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 181554951,
          url: 'https://static.inaturalist.org/photos/181554951/square.jpg',
          licenceCode: '',
          mediumUrl:
            'https://static.inaturalist.org/photos/181554951/medium.jpg',
          squareUrl:
            'https://static.inaturalist.org/photos/181554951/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213389984',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Lavandula_stoechas',
      },
      {
        id: 57140,
        iconicTaxon: 'Plantae',
        binomial: 'Olea europaea',
        rank: 'species',
        vernacularName: 'Olive',
        images: [
          {
            id: 377119924,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377119924/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377122421,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377122421/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 87194494,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/87194494/square.jpg',
          licenceCode: 'cc-by-nc-nd',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/87194494/medium.jpg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/87194494/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213389983',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Olive',
      },
      {
        id: 633980,
        iconicTaxon: 'Plantae',
        binomial: 'Pallenis spinosa',
        rank: 'species',
        vernacularName: 'Spiny Starwort',
        images: [
          {
            id: 377119923,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377119923/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377231379,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377231379/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 123647584,
          url: 'https://static.inaturalist.org/photos/123647584/square.jpg',
          licenceCode: '',
          mediumUrl:
            'https://static.inaturalist.org/photos/123647584/medium.jpg',
          squareUrl:
            'https://static.inaturalist.org/photos/123647584/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213389979',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Pallenis_spinosa',
      },
      {
        id: 53052,
        iconicTaxon: 'Plantae',
        binomial: 'Foeniculum vulgare',
        rank: 'species',
        vernacularName: 'fennel',
        images: [
          {
            id: 377115979,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377115979/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377119179,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377119179/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 50868492,
          url: 'https://static.inaturalist.org/photos/50868492/square.jpg',
          licenceCode: '',
          mediumUrl:
            'https://static.inaturalist.org/photos/50868492/medium.jpg',
          squareUrl:
            'https://static.inaturalist.org/photos/50868492/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213388402',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Fennel',
      },
      {
        id: 467566,
        iconicTaxon: 'Plantae',
        binomial: 'Micromeria graeca',
        rank: 'species',
        vernacularName: 'Greek Savory',
        images: [
          {
            id: 377115978,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377115978/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 369599952,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/369599952/square.jpeg',
          licenceCode: 'cc-by-nc',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/369599952/medium.jpeg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/369599952/square.jpeg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213388401',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Micromeria_graeca',
      },
      {
        id: 633980,
        iconicTaxon: 'Plantae',
        binomial: 'Pallenis spinosa',
        rank: 'species',
        vernacularName: 'Spiny Starwort',
        images: [
          {
            id: 377115956,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377115956/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377118896,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377118896/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377118902,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377118902/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 123647584,
          url: 'https://static.inaturalist.org/photos/123647584/square.jpg',
          licenceCode: '',
          mediumUrl:
            'https://static.inaturalist.org/photos/123647584/medium.jpg',
          squareUrl:
            'https://static.inaturalist.org/photos/123647584/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213388397',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Pallenis_spinosa',
      },
      {
        id: 76610,
        iconicTaxon: 'Plantae',
        binomial: 'Daucus carota',
        rank: 'species',
        vernacularName: 'wild carrot',
        images: [
          {
            id: 377115955,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377115955/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377118267,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377118267/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 84336733,
          url: 'https://static.inaturalist.org/photos/84336733/square.jpeg',
          licenceCode: '',
          mediumUrl:
            'https://static.inaturalist.org/photos/84336733/medium.jpeg',
          squareUrl:
            'https://static.inaturalist.org/photos/84336733/square.jpeg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213388395',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Daucus_carota',
      },
      {
        id: 76610,
        iconicTaxon: 'Plantae',
        binomial: 'Daucus carota',
        rank: 'species',
        vernacularName: 'wild carrot',
        images: [
          {
            id: 377115959,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377115959/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 84336733,
          url: 'https://static.inaturalist.org/photos/84336733/square.jpeg',
          licenceCode: '',
          mediumUrl:
            'https://static.inaturalist.org/photos/84336733/medium.jpeg',
          squareUrl:
            'https://static.inaturalist.org/photos/84336733/square.jpeg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213388393',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Daucus_carota',
      },
      {
        id: 82850,
        iconicTaxon: 'Plantae',
        binomial: 'Ruta montana',
        rank: 'species',
        vernacularName: 'Mountain Rue',
        images: [
          {
            id: 377112567,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377112567/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377113952,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377113952/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377113960,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377113960/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 2075742,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/2075742/square.jpg',
          licenceCode: 'cc-by-nc-sa',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/2075742/medium.jpg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/2075742/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213386207',
        wikipediaUrl: null,
      },
      {
        id: 75771,
        iconicTaxon: 'Plantae',
        binomial: 'Bituminaria bituminosa',
        rank: 'species',
        vernacularName: 'arabian pea',
        images: [
          {
            id: 377112568,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377112568/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377114557,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377114557/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377114575,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377114575/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 385551323,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/385551323/square.jpeg',
          licenceCode: 'cc-by-nc',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/385551323/medium.jpeg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/385551323/square.jpeg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213386206',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Bituminaria_bituminosa',
      },
      {
        id: 1521906,
        iconicTaxon: 'Plantae',
        binomial: 'Convolvulus althaeoides',
        rank: 'species',
        vernacularName: 'Mallow Bindweed',
        images: [
          {
            id: 377112563,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377112563/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377114823,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377114823/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 125738750,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/125738750/square.jpeg',
          licenceCode: 'cc-by-sa',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/125738750/medium.jpeg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/125738750/square.jpeg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213386201',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Convolvulus_althaeoides',
      },
      {
        id: 707889,
        iconicTaxon: 'Plantae',
        binomial: 'Lysimachia monelli',
        rank: 'species',
        vernacularName: 'Flax-leaved Blue Pimpernel',
        images: [
          {
            id: 377112537,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377112537/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 106501291,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/106501291/square.jpg',
          licenceCode: 'cc-by',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/106501291/medium.jpg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/106501291/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213386197',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Lysimachia_monelli',
      },
      {
        id: 537967,
        iconicTaxon: 'Plantae',
        binomial: 'Bellardia viscosa',
        rank: 'species',
        vernacularName: 'Yellow Glandweed',
        images: [
          {
            id: 377112532,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377112532/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377115135,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377115135/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 31449,
          url: 'https://static.inaturalist.org/photos/31449/square.jpg',
          licenceCode: '',
          mediumUrl: 'https://static.inaturalist.org/photos/31449/medium.jpg',
          squareUrl: 'https://static.inaturalist.org/photos/31449/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213386196',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Parentucellia_viscosa',
      },
      {
        id: 545482,
        iconicTaxon: 'Plantae',
        binomial: 'Galactites tomentosus',
        rank: 'species',
        vernacularName: 'Boar Thistle',
        images: [
          {
            id: 377112533,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377112533/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377115296,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377115296/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 364524152,
          url: 'https://static.inaturalist.org/photos/364524152/square.jpg',
          licenceCode: '',
          mediumUrl:
            'https://static.inaturalist.org/photos/364524152/medium.jpg',
          squareUrl:
            'https://static.inaturalist.org/photos/364524152/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213386192',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Galactites_tomentosus',
      },
      {
        id: 59417,
        iconicTaxon: 'Plantae',
        binomial: 'Trifolium stellatum',
        rank: 'species',
        vernacularName: 'Star Clover',
        images: [
          {
            id: 377111365,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377111365/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 70928027,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/70928027/square.jpg',
          licenceCode: 'cc-by-nc-nd',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/70928027/medium.jpg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/70928027/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213385321',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Trifolium_stellatum',
      },
      {
        id: 82644,
        iconicTaxon: 'Plantae',
        binomial: 'Cynara humilis',
        rank: 'species',
        vernacularName: 'Dwarf Artichoke',
        images: [
          {
            id: 377111327,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377111327/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 22221301,
          url: 'https://static.inaturalist.org/photos/22221301/square.jpeg',
          licenceCode: '',
          mediumUrl:
            'https://static.inaturalist.org/photos/22221301/medium.jpeg',
          squareUrl:
            'https://static.inaturalist.org/photos/22221301/square.jpeg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213385308',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Cynara_humilis',
      },
      {
        id: 51286,
        iconicTaxon: 'Plantae',
        binomial: 'Bellardia trixago',
        rank: 'species',
        vernacularName: 'Mediterranean lineseed',
        images: [
          {
            id: 377111325,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377111325/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377235771,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377235771/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 377235779,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377235779/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 3253371,
          url: 'https://static.inaturalist.org/photos/3253371/square.JPG',
          licenceCode: '',
          mediumUrl: 'https://static.inaturalist.org/photos/3253371/medium.JPG',
          squareUrl: 'https://static.inaturalist.org/photos/3253371/square.JPG',
        },
        observationUrl: 'https://www.inaturalist.org/observations/213385304',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Bellardia_trixago',
      },
    ],
  }

  const collection2 = {
    id: '2',
    type: 'taxonomy',
    name: 'Benenden fieldnotes',
    date: 'Sunday 19 May 2024',
    location: 'Benenden, UK',
    fieldNotes: {
      url: 'https://ifieldnotes.org/danielhartley-benenden-uk-sun-may-19-2024/',
    },
    items: [
      {
        id: 55801,
        iconicTaxon: 'Plantae',
        binomial: 'Carpinus betulus',
        rank: 'species',
        vernacularName: 'European Hornbeam',
        images: [
          {
            id: 391066130,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/391066130/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 391066230,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/391066230/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 391066236,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/391066236/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 46763976,
          url: 'https://static.inaturalist.org/photos/46763976/square.jpeg',
          licenceCode: '',
          mediumUrl:
            'https://static.inaturalist.org/photos/46763976/medium.jpeg',
          squareUrl:
            'https://static.inaturalist.org/photos/46763976/square.jpeg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/220854906',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Carpinus_betulus',
      },
      {
        id: 43151,
        iconicTaxon: 'Mammalia',
        binomial: 'Oryctolagus cuniculus',
        rank: 'species',
        vernacularName: 'European Rabbit',
        images: [
          {
            id: 391063785,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/391063785/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 479605587,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/479605587/square.jpg',
          licenceCode: 'cc-by-nc-nd',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/479605587/medium.jpg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/479605587/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/220853772',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/European_rabbit',
      },
      {
        id: 121763,
        iconicTaxon: 'Plantae',
        binomial: 'Castanea sativa',
        rank: 'species',
        vernacularName: 'Sweet Chestnut',
        images: [
          {
            id: 388502816,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/388502816/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 388504750,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/388504750/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 12739074,
          url: 'https://static.inaturalist.org/photos/12739074/square.jpg',
          licenceCode: '',
          mediumUrl:
            'https://static.inaturalist.org/photos/12739074/medium.jpg',
          squareUrl:
            'https://static.inaturalist.org/photos/12739074/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/219487351',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Castanea_sativa',
      },
      {
        id: 55801,
        iconicTaxon: 'Plantae',
        binomial: 'Carpinus betulus',
        rank: 'species',
        vernacularName: 'European Hornbeam',
        images: [
          {
            id: 388502806,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/388502806/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 46763976,
          url: 'https://static.inaturalist.org/photos/46763976/square.jpeg',
          licenceCode: '',
          mediumUrl:
            'https://static.inaturalist.org/photos/46763976/medium.jpeg',
          squareUrl:
            'https://static.inaturalist.org/photos/46763976/square.jpeg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/219487348',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Carpinus_betulus',
      },
      {
        id: 56152,
        iconicTaxon: 'Plantae',
        binomial: 'Allium ursinum',
        rank: 'species',
        vernacularName: 'Ramsons',
        images: [
          {
            id: 388502802,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/388502802/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 388503894,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/388503894/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 388503897,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/388503897/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 388503898,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/388503898/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 10674,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/10674/square.jpg',
          licenceCode: 'cc-by',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/10674/medium.jpg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/10674/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/219487347',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Allium_ursinum',
      },
      {
        id: 56152,
        iconicTaxon: 'Plantae',
        binomial: 'Allium ursinum',
        rank: 'species',
        vernacularName: 'Ramsons',
        images: [
          {
            id: 386375257,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/386375257/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 388504439,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/388504439/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 388504498,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/388504498/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 10674,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/10674/square.jpg',
          licenceCode: 'cc-by',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/10674/medium.jpg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/10674/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/218351684',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Allium_ursinum',
      },
      {
        id: 61906,
        iconicTaxon: 'Plantae',
        binomial: 'Helminthotheca echioides',
        rank: 'species',
        vernacularName: 'bristly oxtongue',
        images: [
          {
            id: 386375225,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/386375225/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 386377195,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/386377195/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 386377196,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/386377196/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 386377199,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/386377199/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 386377203,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/386377203/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 231490858,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/231490858/square.jpg',
          licenceCode: 'cc-by-nc',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/231490858/medium.jpg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/231490858/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/218351677',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Helminthotheca_echioides',
      },
      {
        id: 51610,
        iconicTaxon: 'Plantae',
        binomial: 'Veronica chamaedrys',
        rank: 'species',
        vernacularName: 'Germander Speedwell',
        images: [
          {
            id: 386372440,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/386372440/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 386374107,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/386374107/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 92414767,
          url: 'https://static.inaturalist.org/photos/92414767/square.jpeg',
          licenceCode: '',
          mediumUrl:
            'https://static.inaturalist.org/photos/92414767/medium.jpeg',
          squareUrl:
            'https://static.inaturalist.org/photos/92414767/square.jpeg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/218349688',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Veronica_chamaedrys',
      },
      {
        id: 204339,
        iconicTaxon: 'Plantae',
        binomial: 'Lamium galeobdolon',
        rank: 'species',
        vernacularName: 'yellow archangel',
        images: [
          {
            id: 386372434,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/386372434/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 386373403,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/386373403/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 386373407,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/386373407/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 386373409,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/386373409/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 386373413,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/386373413/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 72097716,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/72097716/square.jpg',
          licenceCode: 'cc-by-nc',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/72097716/medium.jpg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/72097716/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/218349687',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Lamium_galeobdolon',
      },
      {
        id: 1024536,
        iconicTaxon: 'Plantae',
        binomial: 'Rabelera holostea',
        rank: 'species',
        vernacularName: 'greater stitchwort',
        images: [
          {
            id: 386372408,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/386372408/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 386373223,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/386373223/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 386373225,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/386373225/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 731375,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/731375/square.jpg',
          licenceCode: 'cc-by-nc-sa',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/731375/medium.jpg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/731375/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/218349685',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Rabelera',
      },
      {
        id: 52724,
        iconicTaxon: 'Plantae',
        binomial: 'Equisetum arvense',
        rank: 'species',
        vernacularName: 'field horsetail',
        images: [
          {
            id: 386372413,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/386372413/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 386373076,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/386373076/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 72881677,
          url: 'https://static.inaturalist.org/photos/72881677/square.jpg',
          licenceCode: '',
          mediumUrl:
            'https://static.inaturalist.org/photos/72881677/medium.jpg',
          squareUrl:
            'https://static.inaturalist.org/photos/72881677/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/218349683',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Equisetum_arvense',
      },
      {
        id: 53178,
        iconicTaxon: 'Plantae',
        binomial: 'Plantago lanceolata',
        rank: 'species',
        vernacularName: 'ribwort plantain',
        images: [
          {
            id: 386372404,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/386372404/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 386372814,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/386372814/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 289213594,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/289213594/square.jpg',
          licenceCode: 'cc-by',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/289213594/medium.jpg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/289213594/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/218349682',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Plantago_lanceolata',
      },
      {
        id: 207977,
        iconicTaxon: 'Insecta',
        binomial: 'Aglais io',
        rank: 'species',
        vernacularName: 'European Peacock Butterfly',
        images: [
          {
            id: 385100238,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/385100238/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 385100425,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/385100425/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 385100428,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/385100428/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 385100430,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/385100430/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 385100429,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/385100429/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 385100431,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/385100431/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 4710619,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/4710619/square.jpg',
          licenceCode: 'cc-by',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/4710619/medium.jpg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/4710619/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/217669408',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Aglais_io',
      },
      {
        id: 855297,
        iconicTaxon: 'Mammalia',
        binomial: 'Meles meles',
        rank: 'species',
        vernacularName: 'European Badger',
        images: [
          {
            id: 385098489,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/385098489/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 385098491,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/385098491/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 385098486,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/385098486/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 385098512,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/385098512/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 385098531,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/385098531/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 385098539,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/385098539/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 385097517,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/385097517/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 385098485,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/385098485/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 385098488,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/385098488/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 385098493,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/385098493/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 385098508,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/385098508/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 385098510,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/385098510/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 385098513,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/385098513/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 385098526,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/385098526/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 385098530,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/385098530/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 385098541,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/385098541/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 172054371,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/172054371/square.jpg',
          licenceCode: 'cc-by',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/172054371/medium.jpg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/172054371/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/217668045',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/European_badger',
      },
    ],
  }

  const collection3 = {
    id: '3',
    type: 'taxonomy',
    name: 'Barreiro fieldnotes',
    date: 'Thu Apr 18 2024',
    location: 'Barreiro, Portugal',
    items: [
      {
        id: 58379,
        iconicTaxon: 'Plantae',
        binomial: 'Lamarckia aurea',
        rank: 'species',
        vernacularName: 'goldentop grass',
        images: [
          {
            id: 368933241,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/368933241/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 368933973,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/368933973/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 368933982,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/368933982/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 426312020,
          url: 'https://static.inaturalist.org/photos/426312020/square.jpg',
          licenceCode: '',
          mediumUrl:
            'https://static.inaturalist.org/photos/426312020/medium.jpg',
          squareUrl:
            'https://static.inaturalist.org/photos/426312020/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/208514642',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Lamarckia',
      },
      {
        id: 79141,
        iconicTaxon: 'Plantae',
        binomial: 'Solanum nigrum',
        rank: 'species',
        vernacularName: 'black nightshade',
        images: [
          {
            id: 368933236,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/368933236/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 368933725,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/368933725/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 368933737,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/368933737/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 250702428,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/250702428/square.jpeg',
          licenceCode: 'cc-by-nc',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/250702428/medium.jpeg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/250702428/square.jpeg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/208514639',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Solanum_nigrum',
      },
      {
        id: 333717,
        iconicTaxon: 'Plantae',
        binomial: 'Andryala integrifolia',
        rank: 'species',
        vernacularName: 'Common Andryala',
        images: [
          {
            id: 368917915,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/368917915/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 368921040,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/368921040/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 368921041,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/368921041/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 2062923,
          url: 'https://static.inaturalist.org/photos/2062923/square.jpg',
          licenceCode: '',
          mediumUrl: 'https://static.inaturalist.org/photos/2062923/medium.jpg',
          squareUrl: 'https://static.inaturalist.org/photos/2062923/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/208506851',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Andryala_integrifolia',
      },
      {
        id: 57643,
        iconicTaxon: 'Plantae',
        binomial: 'Geranium purpureum',
        rank: 'species',
        vernacularName: 'Little-Robin',
        images: [
          {
            id: 368917893,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/368917893/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 368920283,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/368920283/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 368920284,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/368920284/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 368920287,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/368920287/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 368920289,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/368920289/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 368920295,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/368920295/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 21874983,
          url: 'https://static.inaturalist.org/photos/21874983/square.jpeg',
          licenceCode: '',
          mediumUrl:
            'https://static.inaturalist.org/photos/21874983/medium.jpeg',
          squareUrl:
            'https://static.inaturalist.org/photos/21874983/square.jpeg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/208506846',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Geranium_purpureum',
      },
      {
        id: 792216,
        iconicTaxon: 'Plantae',
        binomial: 'Lysimachia foemina',
        rank: 'species',
        vernacularName: 'Foemina Blue Pimpernel',
        images: [
          {
            id: 368917894,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/368917894/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 368921355,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/368921355/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 265898979,
          url: 'https://static.inaturalist.org/photos/265898979/square.jpeg',
          licenceCode: '',
          mediumUrl:
            'https://static.inaturalist.org/photos/265898979/medium.jpeg',
          squareUrl:
            'https://static.inaturalist.org/photos/265898979/square.jpeg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/208506840',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Lysimachia_foemina',
      },
      {
        id: 52698,
        iconicTaxon: 'Plantae',
        binomial: 'Avena fatua',
        rank: 'species',
        vernacularName: 'wild oat',
        images: [
          {
            id: 368917865,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/368917865/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 368932950,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/368932950/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 368932955,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/368932955/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 68891941,
          url: 'https://static.inaturalist.org/photos/68891941/square.jpg',
          licenceCode: '',
          mediumUrl:
            'https://static.inaturalist.org/photos/68891941/medium.jpg',
          squareUrl:
            'https://static.inaturalist.org/photos/68891941/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/208506837',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Avena_fatua',
      },
      {
        id: 55631,
        iconicTaxon: 'Plantae',
        binomial: 'Trifolium nigrescens',
        rank: 'species',
        vernacularName: 'small white clover',
        images: [
          {
            id: 368914369,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/368914369/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 368916548,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/368916548/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 71289830,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/71289830/square.jpeg',
          licenceCode: 'cc-by-nc',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/71289830/medium.jpeg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/71289830/square.jpeg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/208504386',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Trifolium_nigrescens',
      },
      {
        id: 77479,
        iconicTaxon: 'Plantae',
        binomial: 'Hyparrhenia hirta',
        rank: 'species',
        vernacularName: 'thatching grass',
        images: [
          {
            id: 368909622,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/368909622/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 368912657,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/368912657/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 368912658,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/368912658/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 368912659,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/368912659/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 368912661,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/368912661/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 256086487,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/square.jpeg',
          licenceCode: 'cc-by-nc',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/medium.jpeg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/256086487/square.jpeg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/208501121',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Hyparrhenia_hirta',
      },
      {
        id: 424860,
        iconicTaxon: 'Reptilia',
        binomial: 'Podarcis virescens',
        rank: 'species',
        vernacularName: 'Green Iberian Wall Lizard',
        images: [
          {
            id: 368909592,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/368909592/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 368913863,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/368913863/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 464363083,
          url: 'https://static.inaturalist.org/photos/464363083/square.jpeg',
          licenceCode: '',
          mediumUrl:
            'https://static.inaturalist.org/photos/464363083/medium.jpeg',
          squareUrl:
            'https://static.inaturalist.org/photos/464363083/square.jpeg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/208501115',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Podarcis_virescens',
      },
      {
        id: 167773,
        iconicTaxon: 'Plantae',
        binomial: 'Reichardia picroides',
        rank: 'species',
        vernacularName: 'brighteyes',
        images: [
          {
            id: 368909588,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/368909588/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 368910150,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/368910150/square.jpeg',
            licenceCode: 'cc0',
          },
          {
            id: 368910149,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/368910149/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 596847,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/596847/square.jpg',
          licenceCode: 'cc-by-nc',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/596847/medium.jpg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/596847/square.jpg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/208501113',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Reichardia',
      },
      {
        id: 60218,
        iconicTaxon: 'Plantae',
        binomial: 'Ficus carica',
        rank: 'species',
        vernacularName: 'common fig',
        images: [
          {
            id: 368909591,
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/368909591/square.jpeg',
            licenceCode: 'cc0',
          },
        ],
        image: {
          id: 425438609,
          url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/425438609/square.jpeg',
          licenceCode: 'cc-by-nc',
          mediumUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/425438609/medium.jpeg',
          squareUrl:
            'https://inaturalist-open-data.s3.amazonaws.com/photos/425438609/square.jpeg',
        },
        observationUrl: 'https://www.inaturalist.org/observations/208501108',
        wikipediaUrl: 'http://en.wikipedia.org/wiki/Common_fig',
      },
    ],
  }

  const collection4 = {
    id: '4',
    name: 'Test',
    date: 'Today',
    location: 'Here',
    items: [],
  }

  const dedupe = (items: any[]) => {
    const deduped = Array.from(
      new Map(items.map(item => [item.id, item])).values()
    )

    return deduped
  }

  return new Promise((resolve, reject) => {
    resolve([
      {
        ...collection1,
        items: dedupe(collection1.items),
      },
      {
        ...collection2,
        items: dedupe(collection2.items),
      },
      {
        ...collection3,
        items: dedupe(collection3.items),
      },
    ])
  })
}

export const getCollectionById = async (
  id: string
): Promise<Collection<Taxon> | undefined> => {
  const collections = await getCollections()
  return collections.find(c => c.id === id)
}
