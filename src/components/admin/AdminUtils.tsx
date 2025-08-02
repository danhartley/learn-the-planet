'use client'

import { useCollection } from '@/contexts/CollectionContext'

export const AdminUtils = () => {
  const { initialiseNewFields } = useCollection()
  const initialise = () => {
    initialiseNewFields()
  }

  return (
    <>
      <h1>Admin page</h1>
      <button id="initialise-collection-summaries" onClick={initialise}>
        Initialise collection summaries
      </button>
    </>
  )
}
