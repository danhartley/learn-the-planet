'use client'

import { useState } from 'react'

import { CollectionProvider } from '@/contexts/CollectionContext'

import { IconicTaxaFilter } from '@/components/inat/IconicTaxonFilter'
import { IdentifierFilter } from '@/components/inat/IdentifierFilter'
import { ObservationDates } from '@/components/inat/ObservationDates'

import { IconicTaxon, InatIdentifier } from '@/types'

export default function Page() {
  const [selectedIconicTaxons, setSelectedIconicTaxons] =
    useState<IconicTaxon[]>()
  const [identifierFilter, setIdentifierFilter] = useState<
    InatIdentifier | undefined
  >()

  interface DateChangeParams {
    startDate: string | undefined
    endDate: string | undefined
  }

  const onDateChange = (
    startDate: DateChangeParams['startDate'],
    endDate: DateChangeParams['endDate']
  ) => {
    console.log(startDate)
    console.log(endDate)
  }

  return (
    <CollectionProvider>
      <IconicTaxaFilter setSelectedIconicTaxons={setSelectedIconicTaxons} />
      <IdentifierFilter setIdentifierFilter={setIdentifierFilter} />
      <ObservationDates onDateChange={onDateChange} />
    </CollectionProvider>
  )
}
