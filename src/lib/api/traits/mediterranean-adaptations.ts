// functional traits and ecological drivers
// plant trait–environmental associations
// plant trait–environmental associations should be evident over ranges of environmental indicators corresponding to key drivers of future climate and land use changes in Southern Europe

// export const traits = [
//   {
//     items: [
//       {
//         trait: 'Root Structure',
//         annualCharacteristic:
//           "Shallow, fibrous root systems that don't need to store energy for multiple growing seasons",
//         perennialCharacteristic:
//           'Deep, extensive root systems often with energy storage structures like taproots, rhizomes, bulbs, or tubers',
//         characteristics: [
//           "Shallow, fibrous root systems that don't need to store energy for multiple growing seasons",
//           'Deep, extensive root systems often with energy storage structures like taproots, rhizomes, bulbs, or tubers',
//         ],
//         visualClues:
//           'After pulling plants: annuals come out easily with minimal root structure; perennials resist pulling and may break, leaving parts of roots/rhizomes in soil',
//         environmentalContext:
//           'In Mediterranean dry summers, perennials often have deeper roots to access water tables unavailable to annuals',
//         annualExamples: [
//           { commonName: 'Common Poppy', scientificName: 'Papaver rhoeas' },
//           {
//             commonName: 'Field Marigold',
//             scientificName: 'Calendula arvensis',
//           },
//         ],
//         perennial_examples: [
//           { commonName: 'Rosemary', scientificName: 'Salvia rosmarinus' },
//           { commonName: 'Asphodel', scientificName: 'Asphodelus aestivus' },
//           { commonName: 'Common chicory', scientificName: 'Cichorium intybus' },
//           { commonName: 'Century plant', scientificName: 'Agave americana' },
//         ],
//         seasonalIndicators:
//           'After summer drought, annuals will be completely dead while perennials may maintain living root structures even if aboveground parts die back',
//         source: 'https://en.wikipedia.org/wiki/Perennial_plant#Roots',
//       },
//       {
//         trait: 'Life Cycle Response to Fire',
//         annualCharacteristic:
//           'Often among the first to germinate after fires from dormant seed banks in soil, completing entire life cycle within one growing season',
//         perennialCharacteristic:
//           'May resprout from protected underground structures like bulbs, lignotubers, or rhizomes after fire damage to aboveground parts',
//         visualClues:
//           'After Mediterranean wildfires, quick carpet of flowering annuals followed by slower recovery of perennial species from surviving root structures',
//         environmentalContext:
//           'Post-fire landscapes in Mediterranean regions often show succession pattern with annuals dominating initially, followed by perennial regrowth',
//         annualExamples: [
//           { commonName: 'Fire Poppy', scientificName: 'Papaver argemone' },
//           { commonName: 'Field Mustard', scientificName: 'Brassica rapa' },
//         ],
//         perennialExamples: [
//           { commonName: 'Kermes Oak', scientificName: 'Quercus coccifera' },
//           { commonName: 'Cork Oak', scientificName: 'Quercus suber' },
//         ],
//         seasonalIndicators:
//           'First growing season after fire shows dramatic annual flowering displays that diminish in subsequent years as perennials reestablish dominance',
//         source:
//           'https://en.wikipedia.org/wiki/Fire_ecology#Mediterranean_forests',
//       },
//     ],
//   },
// ]

// const adaptations = [
//   {
//     ecologicalDriver: 'fire',
//     traits: [
//       {
//         name: 'annual',
//         characteristics: [
//           'Often among the first to germinate after fires from dormant seed banks in soil, completing entire life cycle within one growing season',
//           'Post-fire landscapes in Mediterranean regions often show succession pattern with annuals dominating initially',
//         ],
//         examples: [
//           { commonName: 'Fire Poppy', scientificName: 'Papaver argemone' },
//           { commonName: 'Field Mustard', scientificName: 'Brassica rapa' },
//         ],
//       },
//       {
//         name: 'perennial',
//         characteristics: [
//           'May resprout from protected underground structures like bulbs, lignotubers, or rhizomes after fire damage to aboveground parts',
//         ],
//         examples: [
//           { commonName: 'Kermes Oak', scientificName: 'Quercus coccifera' },
//           { commonName: 'Cork Oak', scientificName: 'Quercus suber' },
//         ],
//       },
//     ],
//   },
//   {
//     ecologicalDriver: 'hot, dry summers',
//     traits: [
//       {
//         name: ['annual'],
//         characteristics: [
//           "Shallow, fibrous root systems that don't need to store energy for multiple growing seasons",
//           'After pulling plants: annuals come out easily with minimal root structure',
//         ],
//       },
//       {
//         name: ['sclerophyllous'],
//         characteristics: [
//           'leaf orientation which is parallel or oblique to direct sunlight',
//         ],
//       },
//     ],
//   },
// ]

// Traits Collection
// DESCRIPTION REPLACED BY LINK TO TERM?
// Traits collection would contain traits as items
const traits = [
  {
    trait: 'sclerophyllous',
    name: 'Sclerophyllous Leaves',
    source: 'https://en.wikipedia.org/wiki/Sclerophyll',
    description:
      'Hard, tough leaves with thick cuticles and reduced surface area',
    morphology: [
      'Thick, leathery leaves',
      'Often small or narrow leaf shape',
      'Waxy, glossy or reflective surface',
      'Grey-green colouration',
      'Leaves may be rolled, needle-like or scale-like',
    ],
    phenology: {
      spring: 'New growth may appear softer but quickly hardens',
      summer: 'Full hardening of leaves, sometimes with reduced angle to sun',
      autumn: "Persistent, doesn't shed during typical autumn leaf drop",
      winter:
        'Maintained year-round, allowing photosynthesis during mild winter days',
    },
    examples: [
      {
        commonName: 'Holm Oak',
        scientificName: 'Quercus ilex',
        wikipedia: 'https://en.wikipedia.org/wiki/Quercus_ilex',
        inaturalist: 'https://www.inaturalist.org/taxa/78805-Quercus-ilex',
      },
      {
        commonName: 'Olive Tree',
        scientificName: 'Olea europaea',
        wikipedia: 'https://en.wikipedia.org/wiki/Olive',
        inaturalist: 'https://www.inaturalist.org/taxa/57140-Olea-europaea',
      },
      {
        commonName: 'Strawberry Tree',
        scientificName: 'Arbutus unedo',
        wikipedia: 'https://en.wikipedia.org/wiki/Arbutus_unedo',
        inaturalist: 'https://www.inaturalist.org/taxa/82689-Arbutus-unedo',
      },
    ],
  },
  {
    trait: 'serotiny',
    name: 'Serotinous Cones/Fruits',
    source: 'https://en.wikipedia.org/wiki/Serotiny',
    description:
      'Seeds held in closed cones or fruits that open in response to environmental triggers, especially heat from fires',
    morphology: [
      'Woody cones/fruits that remain closed on plant for years',
      'Cones often have thick, resinous seals',
      'Seeds released en masse after fire',
      'Plant may have mixture of different aged cones/fruits',
    ],
    phenology: {
      spring: 'New cones/fruits begin forming after flowering',
      summer: 'Cones mature but remain closed',
      autumn: 'No seasonal release of seeds',
      winter: 'Cones remain tightly closed despite moisture',
    },
    examples: [
      {
        commonName: 'Maritime Pine',
        scientificName: 'Pinus pinaster',
        wikipedia: 'https://en.wikipedia.org/wiki/Pinus_pinaster',
        inaturalist: 'https://www.inaturalist.org/taxa/82723-Pinus-pinaster',
      },
      {
        commonName: 'Aleppo Pine',
        scientificName: 'Pinus halepensis',
        wikipedia: 'https://en.wikipedia.org/wiki/Pinus_halepensis',
        inaturalist: 'https://www.inaturalist.org/taxa/82722-Pinus-halepensis',
      },
      {
        commonName: 'Rockrose',
        scientificName: 'Cistus ladanifer',
        wikipedia: 'https://en.wikipedia.org/wiki/Cistus_ladanifer',
        inaturalist: 'https://www.inaturalist.org/taxa/76362-Cistus-ladanifer',
      },
    ],
  },
  {
    trait: 'root architecture',
    name: 'Deep Root Systems',
    description:
      'Extensive root systems that reach well below surface soil levels',
    morphology: [
      'Plants resist uprooting even in loose soil',
      'May have visible woody root crown',
      'Often wider spacing between individual plants',
      'Can thrive in seemingly dry sites',
    ],
    phenology: {
      spring: 'Early access to soil moisture allows head start on growth',
      summer: 'Plant remains green when shallow-rooted species have dried out',
      autumn: 'Continued activity later into dry season',
      winter: 'Protected from frost damage underground',
    },
    examples: [
      {
        commonName: 'Cork Oak',
        scientificName: 'Quercus suber',
        wikipedia: 'https://en.wikipedia.org/wiki/Quercus_suber',
        inaturalist: 'https://www.inaturalist.org/taxa/50868-Quercus-suber',
      },
      {
        commonName: 'Wild Olive',
        scientificName: 'Olea europaea var. sylvestris',
        wikipedia: 'https://en.wikipedia.org/wiki/Olea_oleaster',
        inaturalist:
          'https://www.inaturalist.org/taxa/237528-Olea-europaea-europaea',
      },
      {
        commonName: 'Mastic Tree',
        scientificName: 'Pistacia lentiscus',
        wikipedia: 'https://en.wikipedia.org/wiki/Pistacia_lentiscus',
        inaturalist:
          'https://www.inaturalist.org/taxa/128188-Pistacia-lentiscus',
      },
    ],
  },
]

// Ecological Drivers Collection
// RELATIONSHIP: TOO VAGUE? HOW MEASURED?
// Topic collection would contain ecologicalDrivers as items
// SELECTIVE (EVOLUTIONARY OR SELECTION) PRESSURES INSTEAD OF ECOLOGICAL DRIVERS?

const ecologicalDrivers = [
  {
    id: 'summerDrought',
    name: 'Hot, Dry Summers',
    description:
      'Mediterranean climate pattern with prolonged summer drought and heat',
    relatedDrivers: [
      'highEvaporation',
      'seasonalWaterStress',
      'highUVExposure',
    ],
    adaptations: [
      {
        trait: 'sclerophyllous',
        relationship: 'strong',
        tradeoffs: {
          advantages: [
            'Reduces water loss through transpiration',
            'Protects against UV damage',
            'Resists wilting under high temperatures',
          ],
          disadvantages: [
            'Higher energy cost to produce tough leaves',
            'Reduced photosynthetic efficiency',
            'Slower growth rates',
          ],
        },
      },
      {
        trait: 'root architecture',
        relationship: 'strong',
        tradeoffs: {
          advantages: [
            'Access to deeper water tables during drought',
            'Stability during seasonal flash floods',
            'Storage of resources for sustained summer growth',
          ],
          disadvantages: [
            'High energy investment in root development',
            'Reduced ability to quickly colonise new areas',
            'Vulnerable to long-term groundwater depletion',
          ],
        },
      },
    ],
  },
  {
    id: 'frequentFire',
    name: 'Frequent Fire Regime',
    description:
      'Landscape subject to regular burning, typically every 10-30 years',
    relatedDrivers: [
      'summerDrought',
      'highFuelAccumulation',
      'seasonalLightning',
    ],
    adaptations: [
      {
        trait: 'serotiny',
        relationship: 'strong',
        tradeoffs: {
          advantages: [
            'Mass seed release into nutrient-rich post-fire soil',
            'Reduced competition for seedlings in cleared landscape',
            'Protection from seed predators',
          ],
          disadvantages: [
            'Seeds vulnerable if fire interval too short',
            'Energy investment in protective structures',
            'Limited dispersal mechanisms when fires absent',
          ],
        },
      },
      {
        trait: 'root architecture',
        relationship: 'moderate',
        tradeoffs: {
          advantages: [
            'Protected from surface fire heat',
            'Allows resprouting after aboveground parts burn',
            'Access to moisture during post-fire recovery',
          ],
          disadvantages: [
            'Energetic cost to maintain extensive root systems',
            'Slower initial growth compared to seed specialists',
            'Vulnerability to repeated burning at short intervals',
          ],
        },
      },
    ],
  },
]

// item === ??

// Sources:
// https://www.sciencedirect.com/topics/earth-and-planetary-sciences/life-history-theory

// Terms:
// coriaceous

// Mediterranean definition:
// All these areas (Mediterranean-type biomes, characterized by warm summers with a distinct drought period lasting from 2 up to 10 months) are covered by a peculiar and hyper-diverse vegetation dominated by evergreen trees and shrubs with small and coriaceous leaves. Drought adaptation of Mediterranean plants relies on different mechanisms including deep rooting patterns, avoidance or resistance of cavitation-induced embolism, compensation or repair of embolism-induced hydraulic damage. The complementarity and/or co-occurrence of these physiological traits in different species inhabiting Mediterranean biomes is probably the basis for high plant biodiversity in these fascinating habitats.

// Usefulness of the Term for Describing Species Adaptations:
// "Ecological drivers" can absolutely be used to describe the selective pressures that lead to species adaptations, but it's a somewhat broad and systemic term, typically used in the context of ecosystem-level changes rather than specific evolutionary adaptations.

// In your example:
// Yes, hot, dry summers can be considered an ecological driver that contributes to the evolution of sclerophyllous (thick, tough-leaved) plants. However, when focusing specifically on adaptation and natural selection, more precise terminology may be helpful.

// Alternative or More Specific Terms:
// When discussing evolutionary causes or pressures:
// Selective pressure (more focused on evolution and adaptation)

// Environmental constraint

// Adaptive pressure

// Abiotic stressor (e.g., drought, heat)

// 🔍 Example: “Hot, dry summers are a selective pressure favoring the evolution of sclerophyllous traits in plants.”

// Morphological adaptations: Plants can alter their growth patterns to minimize stress. For example, under drought conditions, they may reduce leaf area to conserve water or develop deeper root systems to access deeper water sources.
