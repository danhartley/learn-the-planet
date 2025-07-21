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

  const linkText = {
    taxon: 'View taxa',
    term: 'Review terms',
    topic: 'Read notes',
    trait: 'View traits',
  }[collectionSummary.type as ContentHandlerType]

  return (
    <section className="card" aria-labelledby="collection">
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
      </div>
      <h3 id="collection">{collectionSummary.name}</h3>
      {collectionSummary.type === 'term' && (
        <div>
          <em>{`${collectionSummary.itemCount} items`}</em>
        </div>
      )}
      {collectionSummary.type === 'topic' && (
        <>
          <div>
            <em>{collectionSummary.date}</em>
          </div>
          <div>
            <em>{collectionSummary.location}</em>
          </div>
        </>
      )}
      <div>
        <Link
          className="breadcrumb"
          href={`/collection/${collectionSummary.slug}-${collectionSummary.shortId}`}
        >
          {linkText}
        </Link>
      </div>
      {collectionSummary.type !== 'topic' ? (
        <button id="start-test" onClick={handleStartTest}>
          Start test
        </button>
      ) : null}
    </section>
  )
}
