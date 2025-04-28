import { ContentTypeHandler, ContentHandlerType } from '@/types'
import { TaxonContentHandler } from './TaxonContentHandler'
import { DefinitionContentHandler } from './DefinitionContentHandler'

export const contentHandlers: Record<
  ContentHandlerType,
  ContentTypeHandler<any>
> = {
  taxon: new TaxonContentHandler(),
  definition: new DefinitionContentHandler(),
}
