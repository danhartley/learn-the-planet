export const iconicTaxa = {
  // kingdom
  FUNGI: 'Fungi',
  PLANTAE: 'Plants',

  // phlyum
  // MOLLUSCA: 'Mollusks',

  // class
  AVES: 'Birds',
  AMPHIBIA: 'Amphibians',
  REPTILIA: 'Reptilians',
  MAMMALIA: 'Mammals',
  INSECTA: 'Insects',
  // ACTINOPTERYGII: 'Ray-finned fishes',
  ARACHNIDA: 'Arachnids',

  //order
  LEPIDOPTERA: 'Lepidoptera',
}

export const matchTaxonKey = (taxonomy, iconicTaxaKeys) => {
  let taxon = { rank: '', value: '' }
  if (!taxonomy) return taxon
  if (taxonomy.order && iconicTaxaKeys.includes(taxonomy.order.toLowerCase()))
    taxon = { rank: 'order', value: taxonomy.order.toLowerCase() }
  if (
    taxon.value === '' &&
    taxonomy.class &&
    iconicTaxaKeys.includes(taxonomy.class.toLowerCase())
  )
    taxon = { rank: 'class', value: taxonomy.class.toLowerCase() }
  if (
    taxon.value === '' &&
    taxonomy.kingdom &&
    iconicTaxaKeys.includes(taxonomy.kingdom.toLowerCase())
  )
    taxon = { rank: 'kingdom', value: taxonomy.kingdom.toLowerCase() }

  return taxon
}

export const matchTaxon = (taxonomy, iconicTaxa) => {
  if (!taxonomy) return false
  let iconicTaxaKeys = Object.keys(iconicTaxa).map(key => key.toLowerCase())
  const taxon = matchTaxonKey(taxonomy, iconicTaxaKeys)
  return taxon
}

export const findRankByIconicTaxon = (taxonomy, iconicTaxon) => {
  return Object.keys(taxonomy).find(
    key => taxonomy[key].toLowerCase() === iconicTaxon.toLowerCase()
  )
}

export const matchIcon = (taxonomy, iconicTaxa) => {
  if (!taxonomy) return ''
  const rank = matchTaxon(taxonomy, iconicTaxa).value
  if (!rank) return ''
  return matchRank(rank)
}

export const matchRank = rank => {
  let icon
  switch (rank.toLowerCase()) {
    case 'aves':
      icon = 'fas fa-dove'
      break
    case 'lepidoptera':
      icon = 'fas fa-barcode'
      break
    case 'amphibia':
      icon = 'fas fa-frog'
      break
    case 'mammalia':
    case 'actinopterygii':
      icon = 'fas fa-paw'
      break
    case 'reptilia':
      icon = 'fas fa-registered'
      break
    case 'insecta':
    case 'arachnida':
      icon = 'fas fa-bug'
      break
    case 'fungi':
      icon = './static/icons/mushroom.svg'
      break
    case 'plantae':
      icon = 'fas fa-leaf'
      break
  }
  return icon
}
