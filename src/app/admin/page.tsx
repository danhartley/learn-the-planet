'use client'

import { CollectionProvider } from '@/contexts/CollectionContext'

import { AdminUtils } from '@/components/admin/AdminUtils'

export default function Page() {
  return (
    <CollectionProvider>
      <AdminUtils />
    </CollectionProvider>
  )
}
