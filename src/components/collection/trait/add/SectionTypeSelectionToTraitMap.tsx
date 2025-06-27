import { AddTraitMorphology } from '@/components/collection/trait/add/AddTraitMorphology'
import { AddTraitPhenology } from '@/components/collection/trait/add/AddTraitPhenology'
import { AddTraitTaxa } from '@/components/collection/trait/add/AddTraitTaxa'

import { TraitSectionType } from '@/types'

type Props = {
  sectionType: TraitSectionType
}

export const SectionTypeSelectionToTraitMap = ({ sectionType }: Props) => {
  const sectionComponent: {
    [K in TraitSectionType]: React.ComponentType
  } = {
    morphology: AddTraitMorphology,
    phenology: AddTraitPhenology,
    taxon: AddTraitTaxa,
  }

  const Component = sectionComponent[sectionType]

  return <Component />
}
