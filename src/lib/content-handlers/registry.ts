import { ContentTypeHandler, ContentHandlerType } from '@/types'
import { TaxonomyContentHandler } from './TaxonomyContentHandler'
import { DefinitionContentHandler } from './DefinitionContentHandler'

export const contentHandlers: Record<
  ContentHandlerType,
  ContentTypeHandler<any>
> = {
  taxonomy: new TaxonomyContentHandler(),
  definition: new DefinitionContentHandler(),
}
