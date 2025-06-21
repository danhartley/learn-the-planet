'use client'
import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'

import { EditOperations } from '@/components/collection/EditOperations'
import { CollectionProvider } from '@/contexts/CollectionContext'
import { Collection } from '@/types'
import { extractShortId, extractSlug } from '@/utils/strings'

export default function Page({
  params,
}: {
  params: Promise<{ 'slug-shortId': string }>
}) {
  const [collection, setCollection] = useState<Collection<unknown> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const resolvedParams = await params
        const shortId = extractShortId(resolvedParams['slug-shortId'])
        const slug = extractSlug(resolvedParams['slug-shortId'])

        if (!shortId) {
          setError(true)
          return
        }

        const response = await fetch(`/api/collection/${slug}-${shortId}`)

        if (!response.ok) {
          setError(true)
          return
        }

        const fetchedCollection = await response.json()
        setCollection(fetchedCollection)
      } catch (err) {
        console.error('Failed to fetch collection:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchCollection()
  }, [params])

  if (loading) return <div>Loading...</div>
  if (error) return notFound()
  if (!collection) return <div>Collection not found</div>

  return (
    <CollectionProvider initialCollection={collection}>
      <EditOperations collection={collection} />
    </CollectionProvider>
  )
}
