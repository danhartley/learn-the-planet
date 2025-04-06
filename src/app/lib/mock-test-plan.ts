import { TestPlan } from './types'

export const testPlan: TestPlan = {
  id: 'Test plan 1',
  collection: {
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
      },
      {
        id: 484542,
        binomial: 'Thymus vulgaris',
        common: 'Thyme',
        family: 'Lamiaceae',
      },
      {
        id: 579367,
        binomial: 'Origanum vulgare',
        common: 'Oregano',
        family: 'Lamiaceae',
      },
      {
        id: 578478,
        binomial: 'Salvia officinalis',
        common: 'Common Sage',
        family: 'Lamiaceae',
      },
      {
        id: 581421,
        binomial: 'Petroselinum crispum',
        common: 'Parsley',
        family: 'Apiaceae',
      },
      {
        id: 581687,
        binomial: 'Coriandrum sativum',
        common: 'Coriander',
        family: 'Apiaceae',
      },
      {
        id: 577604,
        binomial: 'Artemisia dracunculus',
        common: 'Wild Tarragon',
        family: 'Asteraceae',
      },
      {
        id: 579364,
        binomial: 'Ocimum basilicum',
        common: 'Basil',
        family: 'Lamiaceae',
      },
      {
        id: 579697,
        binomial: 'Mentha spicata',
        common: 'Spearmint',
        family: 'Lamiaceae',
      },
      {
        id: 579379,
        binomial: 'Rosmarinus officinalis',
        common: 'Rosemary',
        family: 'Lamiaceae',
      },
    ],
  },
  state: {
    layoutIndex: 0,
    collectionIndex: 0,
  },
  score: {
    isCorrect: false,
    questionCount: 1,
    correctCount: 0,
    incorrectCount: 0,
  },
  layouts: [
    {
      id: 'layout 1',
      level: 'level 1',
      index: 0,
      question: {
        type: 'Multiple choice',
        text: 'Select the flower that belongs to the Mint family',
        key: 'Thymus vulgaris',
        options: [
          {
            key: 'Thymus vulgaris',
            value: 'Photo of Thymus vulgaris',
          },
          {
            key: 'Coriandrum sativum',
            value: 'Photo of Coriandrum sativum',
          },
        ],
      },
    },
    {
      id: 'layout 1',
      level: 'level 1',
      index: 1,
      question: {
        type: 'Multiple choice',
        text: 'Select the flower that belongs to the Mint family',
        key: 'Thymus vulgaris',
        options: [
          {
            key: 'Thymus vulgaris',
            value: 'Photo of Thymus vulgaris',
          },
          {
            key: 'Coriandrum sativum',
            value: 'Photo of Coriandrum sativum',
          },
        ],
      },
    },
  ],
}
