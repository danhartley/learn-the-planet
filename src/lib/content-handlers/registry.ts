import { ContentTypeHandler, ContentHandlerType } from '@/types'
import { TaxonContentHandler } from './TaxonContentHandler'
import { DefinitionContentHandler } from './DefinitionContentHandler'
import { LocaleContentHandler } from './LocaleContentHandler'

export const contentHandlers: Record<
  ContentHandlerType,
  ContentTypeHandler<any>
> = {
  taxon: new TaxonContentHandler(),
  definition: new DefinitionContentHandler(),
  locale: new LocaleContentHandler(),
}
