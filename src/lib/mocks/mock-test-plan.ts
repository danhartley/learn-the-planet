import { TestPlan } from '@/types'

export const testPlan: TestPlan = {
  id: 'Test plan 1',
  collection: {
    id: '1',
    name: 'Mediterranean wildflowers',
    date: '',
    location: '',
    index: 0,
    items: [
      {
        id: 584995,
        binomial: 'Anethum graveolens',
        vernacularName: 'Dill',
        family: 'Apiaceae',
      },
      {
        id: 484542,
        binomial: 'Thymus vulgaris',
        vernacularName: 'Thyme',
        family: 'Lamiaceae',
      },
      {
        id: 579367,
        binomial: 'Origanum vulgare',
        vernacularName: 'Oregano',
        family: 'Lamiaceae',
      },
      {
        id: 578478,
        binomial: 'Salvia officinalis',
        vernacularName: 'vernacularName Sage',
        family: 'Lamiaceae',
      },
      {
        id: 581421,
        binomial: 'Petroselinum crispum',
        vernacularName: 'Parsley',
        family: 'Apiaceae',
      },
      {
        id: 581687,
        binomial: 'Coriandrum sativum',
        vernacularName: 'Coriander',
        family: 'Apiaceae',
      },
      {
        id: 577604,
        binomial: 'Artemisia dracunculus',
        vernacularName: 'Wild Tarragon',
        family: 'Asteraceae',
      },
      {
        id: 579364,
        binomial: 'Ocimum basilicum',
        vernacularName: 'Basil',
        family: 'Lamiaceae',
      },
      {
        id: 579697,
        binomial: 'Mentha spicata',
        vernacularName: 'Spearmint',
        family: 'Lamiaceae',
      },
      {
        id: 579379,
        binomial: 'Rosmarinus officinalis',
        vernacularName: 'Rosemary',
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
