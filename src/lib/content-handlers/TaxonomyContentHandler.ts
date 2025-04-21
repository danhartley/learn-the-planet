import { Taxon } from '@/types'
import { ContentHandlerBase } from './ContentHandlerBase'
import { generateTaxonomyDistractors } from './distractor-generators'

export class TaxonomyContentHandler extends ContentHandlerBase<Taxon> {
  constructor() {
    super(generateTaxonomyDistractors)
  }
}
