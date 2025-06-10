'use client'

import Link from 'next/link'
import Image from 'next/image'

import { useRouter } from 'next/navigation'
import { useTestPlanner } from '@/hooks/useTestPlanner'
import { CollectionSummary, ContentHandlerType } from '@/types'

type Props = {
  collectionSummary: CollectionSummary
}

export function CollectionItem({ collectionSummary }: Props) {
  const router = useRouter()
  const { startTest } = useTestPlanner()

  const handleStartTest = async () => {
    try {
      const response = await fetch(
        `/api/collection/}${collectionSummary.slug}-${collectionSummary.shortId}`,
        {
          method: 'GET',
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const collection = await response.json()

      startTest({ collection })
      router.push('/test')
    } catch (error) {
      console.error('Failed to fetch collection:', error)
    }
  }

  let linkText

  switch (collectionSummary.type as ContentHandlerType) {
    case 'taxon':
      linkText = 'View taxa'
      break
    case 'term':
      linkText = 'Review terms'
      break
    case 'topic':
      linkText = 'Read field notes'
      break
    case 'trait':
      linkText = 'View traits'
      break
  }

  return (
    <section className="group card" aria-labelledby="collection">
      <div className="group image">
        <div>
          {collectionSummary.imageUrl && (
            <Link
              className="breadcrumb"
              href={`/collection/${collectionSummary.slug}-${collectionSummary.shortId}`}
            >
              <Image
                id={collectionSummary.id}
                src={collectionSummary.imageUrl}
                alt={collectionSummary.name}
                width={75}
                height={75}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                }}
              />
            </Link>
          )}
          <h3 id="collection">{collectionSummary.name}</h3>
          <Link
            className="breadcrumb"
            href={`/collection/${collectionSummary.slug}-${collectionSummary.shortId}`}
          >
            {linkText}
          </Link>
        </div>
      </div>
      <div>{collectionSummary.date}</div>
      <div>{collectionSummary.location}</div>
      <button id="start-test" onClick={handleStartTest}>
        Start test
      </button>
    </section>
  )
}
