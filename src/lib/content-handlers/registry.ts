import { ContentHandlerType } from '@/types'
import { TaxonContentHandler } from './TaxonContentHandler'
import { TermContentHandler } from './TermContentHandler'
import { TopicContentHandler } from './TopicContentHandler'
import { TraitContentHandler } from './TraitContentHandler'

export const getContentHander = (type: ContentHandlerType) => {
  switch (type.toString()) {
    case 'topic':
      return new TopicContentHandler()
    case 'trait':
      return new TraitContentHandler()
    case 'taxon':
      return new TaxonContentHandler()
    case 'term':
      return new TermContentHandler()
    default:
      return new TaxonContentHandler()
  }
}
