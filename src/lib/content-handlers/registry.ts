import { ContentTypeHandler, ContentHandlerType } from '@/types'
import { TaxonContentHandler } from './TaxonContentHandler'
import { TermContentHandler } from './TermContentHandler'
import { TopicContentHandler } from './TopicContentHandler'
import { TraitContentHandler } from './TraitContentHandler'

export const contentHandlers: Record<
  ContentHandlerType,
  ContentTypeHandler<unknown>
> = {
  taxon: new TaxonContentHandler(),
  term: new TermContentHandler(),
  topic: new TopicContentHandler(),
  trait: new TraitContentHandler(),
}
