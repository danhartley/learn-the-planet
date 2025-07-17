import { IconicTaxon } from '@/types'

type IconicIcon = {
  icon: string
  credit: string
  taxon: string
  licence: string
}

export const taxonUrls: Record<IconicTaxon, IconicIcon> = {
  plantae: {
    icon: 'https://images.phylopic.org/images/acab7795-7403-4a93-b68d-1502c9f0d955/source.svg',
    credit: 'Andy Wilson',
    taxon: 'Parthenocissus quinquefolia',
    licence:
      'https://www.phylopic.org/images/acab7795-7403-4a93-b68d-1502c9f0d955/parthenocissus-quinquefolia',
  },
  insecta: {
    icon: 'https://images.phylopic.org/images/45323e5a-468e-49e2-ac90-a62e0139dc20/vector.svg',
    credit: 'Margot Michaud',
    taxon: 'Melinaea ludovica',
    licence:
      'https://www.phylopic.org/images/45323e5a-468e-49e2-ac90-a62e0139dc20/melinaea-ludovica',
  },
  mammalia: {
    icon: 'https://images.phylopic.org/images/f41fe5d9-2b32-4f10-9546-f1f9f801db1b/vector.svg',
    credit: 'Maija Karala',
    taxon: 'Equus hemionus',
    licence:
      'https://www.phylopic.org/images/f41fe5d9-2b32-4f10-9546-f1f9f801db1b/equus-hemionus-ssp-kulan',
  },
  reptilia: {
    icon: 'https://images.phylopic.org/images/48273d33-29fa-4f3a-91d5-7ede3d7de26c/vector.svg',
    credit: 'Jose Carlos Arenas-Monroy',
    taxon: 'Tarentola mauritanica',
    licence:
      'https://www.phylopic.org/images/48273d33-29fa-4f3a-91d5-7ede3d7de26c/tarentola-mauritanica',
  },
  aves: {
    icon: 'https://images.phylopic.org/images/5311f33f-6db1-47b0-94c4-c60fa7521884/source.svg',
    credit: 'Ferran Sayol',
    taxon: 'Cuculidae',
    licence:
      'https://www.phylopic.org/images/5311f33f-6db1-47b0-94c4-c60fa7521884/cuculidae',
  },
  amphibia: {
    icon: 'https://images.phylopic.org/images/bc7feaaa-4161-4dd9-82bc-a686956575b9/vector.svg',
    credit: 'Jose Carlos Arenas-Monroy',
    taxon: 'Indirana chiravasi',
    licence:
      'https://www.phylopic.org/images/bc7feaaa-4161-4dd9-82bc-a686956575b9/indirana-chiravasi',
  },
  actinopterygii: {
    icon: 'https://images.phylopic.org/images/7360374f-8860-44c5-b74b-af53ca1a8af4/source.svg',
    credit: 'T. Michael Keesey',
    taxon: '	Palaeoniscum freieslebeni',
    licence:
      'https://www.phylopic.org/images/7360374f-8860-44c5-b74b-af53ca1a8af4/palaeoniscum-freieslebeni',
  },
  mollusca: {
    icon: 'https://images.phylopic.org/images/04990095-2aea-4982-9b6d-412b2d16536b/vector.svg',
    credit: 'Katie Collins',
    taxon: 'Yoldiella phillipiana',
    licence:
      'https://www.phylopic.org/images/04990095-2aea-4982-9b6d-412b2d16536b/yoldiella-phillipiana',
  },
  fungi: {
    icon: 'https://images.phylopic.org/images/e5d32221-7ea9-46ed-8e0a-d9dbddab0b4a/source.svg',
    credit: 'Carlo De Rito',
    taxon: 'Boletus edulis',
    licence:
      'https://www.phylopic.org/images/e5d32221-7ea9-46ed-8e0a-d9dbddab0b4a/boletus-edulis',
  },
  animalia: {
    icon: 'https://images.phylopic.org/images/5672a6f8-b1a2-4dfd-88c0-6048b4fd0202/vector.svg',
    credit: 'Scott Hartman',
    taxon: 'Bolinopsis infundibulum',
    licence:
      'https://www.phylopic.org/images/5672a6f8-b1a2-4dfd-88c0-6048b4fd0202/bolinopsis-infundibulum',
  },
  arachnida: {
    icon: 'https://images.phylopic.org/images/44fa6ec0-6bad-42bd-ae91-48d00c9b035c/vector.svg',
    credit: 'Michael Scroggie',
    taxon: 'Nephila edulis',
    licence:
      'https://www.phylopic.org/images/44fa6ec0-6bad-42bd-ae91-48d00c9b035c/nephila-edulis',
  },
}
