import { TestPlan } from './types'
import { TestPlanner } from './test-planner'

// Test collection

const collection = {
  id: '1',
  name: 'Mediterranean wildflowers',
  count: 10,
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
}

// Create a new test planner with a collection
const testPlanner = new TestPlanner(collection)

// console.log(testPlanner)

// Get the current question layout
let currentLayout = testPlanner.getCurrentLayout()

console.log(currentLayout)

// When user submits an answer
const score = testPlanner.markAnswer('userAnswer')

console.log(score)

if (testPlanner.moveToNextQuestion()) {
} else {
}

currentLayout = testPlanner.getCurrentLayout()

console.log(currentLayout)
