import { ContentTypeHandler, ContentHandlerType } from '@/types'
import { TaxonomyContentHandler } from './TaxonomyContentHandler'

export const contentHandlers: Record<
  ContentHandlerType,
  ContentTypeHandler<any>
> = {
  taxonomy: new TaxonomyContentHandler(),
}
