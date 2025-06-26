import { EditTopicImage } from '@/components/collection/topic/edit/EditTopicImage'
import { EditTopicTaxa } from '@/components/collection/topic/edit/EditTopicTaxa'
import { EditTopicText } from '@/components/collection/topic/edit/EditTopicText'

import { SectionType } from '@/types'

type Props = {
  sectionType: SectionType
}

export const EditTopicMap = ({ sectionType }: Props) => {
  const sectionComponent: {
    [K in SectionType]: React.ComponentType
  } = {
    text: EditTopicText,
    image: EditTopicImage,
    taxon: EditTopicTaxa,
  }

  const Component = sectionComponent[sectionType]

  return <Component />
}
