import { Collection } from '@/types'

export const getCollections = (): Promise<Collection[]> => {
  const collection = {
    id: '1',
    name: 'Mediterranean wildflowers',
    count: 10,
    index: 0,
    items: [
      {
        id: 584995,
        binomial: 'Anethum graveolens',
        common: 'Dill',
        family: 'Apiaceae',
        images: [
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377211281/small.jpeg',
          },
        ],
      },
      {
        id: 484542,
        binomial: 'Thymus vulgaris',
        common: 'Thyme',
        family: 'Lamiaceae',
        images: [
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377211281/small.jpeg',
          },
        ],
      },
      {
        id: 579367,
        binomial: 'Origanum vulgare',
        common: 'Oregano',
        family: 'Lamiaceae',
        images: [
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377211281/small.jpeg',
          },
        ],
      },
      {
        id: 578478,
        binomial: 'Salvia officinalis',
        common: 'Common Sage',
        family: 'Lamiaceae',
        images: [
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377211281/small.jpeg',
          },
        ],
      },
      {
        id: 581421,
        binomial: 'Petroselinum crispum',
        common: 'Parsley',
        family: 'Apiaceae',
        images: [
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377211281/small.jpeg',
          },
        ],
      },
      {
        id: 581687,
        binomial: 'Coriandrum sativum',
        common: 'Coriander',
        family: 'Apiaceae',
        images: [
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377211281/small.jpeg',
          },
        ],
      },
      {
        id: 577604,
        binomial: 'Artemisia dracunculus',
        common: 'Wild Tarragon',
        family: 'Asteraceae',
        images: [
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377211281/small.jpeg',
          },
        ],
      },
      {
        id: 579364,
        binomial: 'Ocimum basilicum',
        common: 'Basil',
        family: 'Lamiaceae',
        images: [
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377211281/small.jpeg',
          },
        ],
      },
      {
        id: 579697,
        binomial: 'Mentha spicata',
        common: 'Spearmint',
        family: 'Lamiaceae',
        images: [
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377211281/small.jpeg',
          },
        ],
      },
      {
        id: 579379,
        binomial: 'Rosmarinus officinalis',
        common: 'Rosemary',
        family: 'Lamiaceae',
        images: [
          {
            url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377211281/small.jpeg',
          },
        ],
      },
    ],
  }

  return new Promise((resolve, reject) => {
    resolve([collection])
  })
}
