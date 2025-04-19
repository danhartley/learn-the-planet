import { ContentTypeHandler, ContentHandlerType } from '@/types'
import { TaxonomyContentHandler } from './content-handlers/TaxonomyContentHandler'

export const contentHandlers: Record<
  ContentHandlerType,
  ContentTypeHandler<any>
> = {
  taxonomy: new TaxonomyContentHandler(),
}
