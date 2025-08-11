import { AddTopicImage } from '@/components/collection/topic/add/AddTopicImage'
import { AddTopicTaxa } from '@/components/collection/topic/add/AddTopicTaxa'
import { AddTopicText } from '@/components/collection/topic/add/AddTopicText'
import { AddTopicCredit } from '@/components/collection/topic/add/AddTopicCredit'
import { AddTopicTerms } from '@/components/collection/topic/add/AddTopicTerms'

import { TopicSectionType } from '@/types'

type Props = {
  sectionType: TopicSectionType
}

export const SectionTypeSelectionToTopicMap = ({ sectionType }: Props) => {
  const sectionComponent: {
    [K in TopicSectionType]: React.ComponentType
  } = {
    text: AddTopicText,
    image: AddTopicImage,
    taxon: AddTopicTaxa,
    credit: AddTopicCredit,
    term: AddTopicTerms,
  }

  const Component = sectionComponent[sectionType]

  return <Component />
}
