import { Taxon } from '@/types'
import { ContentHandlerBase } from './ContentHandlerBase'
import { generateTaxonDistractors } from './distractor-generators'

export class TaxonContentHandler extends ContentHandlerBase<Taxon> {
  constructor() {
    super(generateTaxonDistractors)
  }
}
