import { AddTopicImage } from '@/components/collection/topic/add/AddTopicImage'
import { AddTopicTaxa } from '@/components/collection/topic/add/AddTopicTaxa'
import { AddTopicText } from '@/components/collection/topic/add/AddTopicText'

import { SectionType } from '@/types'

type Props = {
  sectionType: SectionType
}

export const AddTopicMap = ({ sectionType }: Props) => {
  const sectionComponent: {
    [K in SectionType]: React.ComponentType
  } = {
    text: AddTopicText,
    image: AddTopicImage,
    taxon: AddTopicTaxa,
  }

  const Component = sectionComponent[sectionType]

  return <Component />
}
