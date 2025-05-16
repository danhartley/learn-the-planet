import { ContentHandlerType } from '@/types'
import { CollectionItemTermPicker } from './CollectionItemTermPicker'
import { CollectionItemTaxonPicker } from './CollectionItemTaxonPicker'

type Props = {
  type: ContentHandlerType
}

export function CollectionItemPicker({ type }: Props) {
  type ComponentMap = {
    [key in ContentHandlerType]: React.ComponentType<any>
  }

  const itemComponent: ComponentMap = {
    term: CollectionItemTermPicker,
    taxon: CollectionItemTaxonPicker,
    topic: CollectionItemTaxonPicker,
    trait: CollectionItemTaxonPicker,
  }

  const Component = itemComponent[type]

  return <Component />
}
