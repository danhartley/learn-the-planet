import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import { TaxonCard } from '@/components/common/TaxonCard'
import { spec } from 'node:test/reporters'

describe('Taxon', () => {
  const species = {
    id: 76610,
    iconicTaxon: 'Plantae',
    binomial: 'Daucus carota',
    rank: 'species',
    vernacularName: 'carota',
    images: [
      {
        url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377115955/square.jpeg',
      },
      {
        url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/377118267/square.jpeg',
      },
    ],
    image: {
      id: 84336733,
      license_code: null,
      attribution:
        '(c) Michelle Layton, all rights reserved, uploaded by Michelle Layton',
      url: 'https://static.inaturalist.org/photos/84336733/square.jpeg',
      original_dimensions: {
        height: 2048,
        width: 1536,
      },
      flags: [],
      square_url: 'https://static.inaturalist.org/photos/84336733/square.jpeg',
      medium_url: 'https://static.inaturalist.org/photos/84336733/medium.jpeg',
    },
  }
  beforeEach(() => {
    render(<TaxonCard taxon={species} />)
  })
  it('renders', () => {})

  it('renders the taxon image', () => {
    screen.getByAltText(species.binomial)
    expect(screen.getByText(species.binomial)).toBeInTheDocument()
  })
})
