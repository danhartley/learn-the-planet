import { describe, it, expect, beforeEach } from 'vitest'
import { Collection, Taxon } from '@/types'
import { generateDistractors } from '@/utils/distractors'

describe('distractors', () => {
  let values: string[]
  const count = 2
  const distractorType = 'binomial'
  const collection = {
    id: '',
    name: '',
    count: 1,
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
        distractors: [
          {
            id: 484542,
            binomial: 'Distractor 1',
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
            binomial: 'Distractor 2',
            common: 'Oregano',
            family: 'Lamiaceae',
            images: [
              {
                url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377211281/small.jpeg',
              },
            ],
          },
        ],
      },
    ],
  }
  values = generateDistractors(
    collection,
    collection.items[0],
    count,
    distractorType
  ).map((v: Taxon) => v[distractorType])
  it('should return only distractor binomial values', () => {
    const allExpectedValues = ['Distractor 1', 'Distractor 2'].every(v =>
      values.includes(v)
    )

    expect(allExpectedValues).toBe(true)
  })
  it('should return all distractor binomial values and one non-distractor binomial value', () => {
    const count = 3
    const distractorType = 'binomial'
    const collection = {
      id: '',
      name: '',
      count: 1,
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
          distractors: [
            {
              id: 484542,
              binomial: 'Distractor 1',
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
              binomial: 'Distractor 2',
              common: 'Oregano',
              family: 'Lamiaceae',
              images: [
                {
                  url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377211281/small.jpeg',
                },
              ],
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
      ],
    }
    values = generateDistractors(
      collection,
      collection.items[0],
      count,
      distractorType
    ).map((v: Taxon) => v[distractorType])

    const expectedValues = [
      'Distractor 1',
      'Distractor 2',
      'Petroselinum crispum',
    ]
    const allExpectedValues = expectedValues.every(
      v => values.includes(v) && expectedValues.length === values.length
    )

    expect(allExpectedValues).toBe(true)
  })
})
