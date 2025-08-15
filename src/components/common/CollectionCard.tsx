'use client'

import Link from 'next/link'
import Image from 'next/image'

import { CollectionSummary } from '@/types'

import { getBtnText, formatDateToReadable } from '@/utils/strings'

type Props = {
  collectionSummary: CollectionSummary
  handleStartTest: () => Promise<void>
}

// Helper component for metadata display
const CollectionMetadata = ({
  collectionSummary,
}: {
  collectionSummary: CollectionSummary
}) => {
  switch (collectionSummary.type.toString()) {
    case 'term':
      return (
        <div className="collection-metadata">
          <em>{`${collectionSummary.itemCount} items`}</em>
        </div>
      )

    case 'topic':
      return (
        <div className="collection-metadata">
          <div>
            <em>{formatDateToReadable(collectionSummary.date || '')}</em>
          </div>
          <div>
            <em>{collectionSummary.location}</em>
          </div>
        </div>
      )

    case 'taxon':
    case 'trait':
      return (
        <div className="collection-metadata">
          <em>{`${collectionSummary.itemCount} items`}</em>
        </div>
      )

    default:
      return null
  }
}

export const CollectionCard = ({
  collectionSummary,
  handleStartTest,
}: Props) => {
  const linkText = {
    taxon: 'View taxa',
    term: 'Review terms',
    topic: 'Read notes',
    trait: 'View traits',
  }[collectionSummary.type.toString()]

  const collectionUrl = `/collection/${collectionSummary.slug}-${collectionSummary.shortId}`
  const showTestButton = collectionSummary.type.toString() !== 'topic'

  return (
    <section
      className="card"
      aria-labelledby={`collection-${collectionSummary.id}`}
    >
      {/* Image Section */}
      {collectionSummary.imageUrl ? (
        <div className="collection-image">
          <Link className="breadcrumb" href={collectionUrl}>
            <Image
              src={collectionSummary.imageUrl}
              alt={collectionSummary.name}
              width={75}
              height={75}
              style={{
                width: '100%',
                height: '160px',
                objectFit: 'cover',
              }}
            />
          </Link>
        </div>
      ) : (
        <div></div>
      )}

      {/* Content Section */}
      <div className="list-group">
        <h3 id={`collection-${collectionSummary.id}`}>
          {collectionSummary.name}
        </h3>

        <CollectionMetadata collectionSummary={collectionSummary} />

        <Link className="breadcrumb" href={collectionUrl}>
          {linkText}
        </Link>
      </div>

      {/* Action Section */}
      {showTestButton ? (
        <div className="collection-actions">
          <button id="start-test" onClick={handleStartTest}>
            {getBtnText(collectionSummary.type.toString())}
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </section>
  )
}
