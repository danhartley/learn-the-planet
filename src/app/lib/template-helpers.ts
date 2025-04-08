import { Taxon } from './types'

type Distractor = {
  item: Taxon
  count: number
}

const getBinomialDistractors = ({ item, count }: Distractor) => {
  return ['']
}

const getGenusDistractors = ({ item, count }: Distractor) => {
  return ['']
}

const getSpeciesDistractors = ({ item, count }: Distractor) => {
  return ['']
}

const getImageDistractors = ({ item, count }: Distractor) => {
  return ['']
}

export const generateDistractors = (
  item: Taxon,
  count: number,
  distractorType: string
): string[] => {
  switch (distractorType) {
    case 'binomial':
      return getBinomialDistractors({ item, count })
    case 'genus':
      return getGenusDistractors({ item, count })
    case 'species':
      return getSpeciesDistractors({ item, count })
    case 'image':
      return getImageDistractors({ item, count })
    // Add other distractor types
    default:
      throw new Error(`Unknown distractor type: ${distractorType}`)
  }
}

export const questionTemplates = () => [
  {
    type: 'textEntry',
    questionTextTemplate: 'Enter the scientific name for ${item.common}',
    correctAnswerProperty: 'binomial',
    placeholder: 'Scientific name',
  },
]

// export const templates = () => {
//   this.collection.items.forEach((item, index) => {
//     // Question 1: Select species from photos
//     this.layouts.push(
//       this.createMultipleChoiceLayout(
//         index * 4,
//         'level 1',
//         `Select the correct photo for ${item.common} (${item.binomial})`,
//         item.binomial,
//         this.getDistractors(item, 3)
//       )
//     )

//     // Question 2: Select correct species name given genus
//     const genus = item.binomial.split(' ')[0]
//     this.layouts.push(
//       this.createMultipleChoiceLayout(
//         index * 4 + 1,
//         'level 1',
//         `Which species belongs to the genus ${genus}?`,
//         item.binomial,
//         this.getDistractors(item, 3)
//       )
//     )

//     // Question 3: Select correct genus name given species
//     const species = item.binomial.split(' ')[1]
//     this.layouts.push(
//       this.createMultipleChoiceLayout(
//         index * 4 + 2,
//         'level 2',
//         `Which genus does the species ${species} belong to?`,
//         genus,
//         this.getGenusDistractors(item, 3)
//       )
//     )

//     // Question 4: Text entry for full name
//     this.layouts.push(
//       this.createTextEntryLayout(
//         index * 4 + 3,
//         'level 3',
//         `Enter the scientific name for ${item.common}`,
//         item.binomial,
//         'Enter genus and species'
//       )
//     )
// }
