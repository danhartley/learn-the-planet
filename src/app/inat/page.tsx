'use client'

import { useState } from 'react'

import { CollectionProvider } from '@/contexts/CollectionContext'

import { IconicTaxaFilter } from '@/components/inat/IconicTaxonFilter'

import { IconicTaxon } from '@/types'

export default function Page() {
  const [selectedIconicTaxons, setSelectedIconicTaxons] =
    useState<IconicTaxon[]>()

  return (
    <CollectionProvider>
      <IconicTaxaFilter setSelectedIconicTaxons={setSelectedIconicTaxons} />
    </CollectionProvider>
  )
}
