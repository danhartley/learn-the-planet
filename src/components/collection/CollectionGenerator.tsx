'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { useCollection } from '@/contexts/CollectionContext'

import { Collection, AddCollectionProps, ContentHandlerType } from '@/types'

type Props = {
  topicCollection: Collection<unknown>
}

export const CollectionGenerator = ({ topicCollection }: Props) => {
  const { data: session } = useSession()
  const { collection, addCollection } = useCollection()
  const [selectedType, setSelectedType] = useState<ContentHandlerType | null>(
    null
  )
  const [isCreating, setIsCreating] = useState<boolean>(false)

  const router = useRouter()

  useEffect(() => {
    if (collection?.id) {
      setIsCreating(false) // Reset loading state
      router.push(`/collection/edit/${collection?.slug}-${collection?.shortId}`)
    }
  }, [collection?.id, router])

  // Only work with topic collections
  if (topicCollection.type !== ('topic' as unknown as ContentHandlerType)) {
    return null
  }

  const getTypePlural = (type: ContentHandlerType): string => {
    switch (type as unknown as string) {
      case 'taxon':
        return 'taxa'
      case 'trait':
        return 'traits'
      case 'term':
        return 'terms'
      default:
        return ''
    }
  }

  const createCollection = async () => {
    // Prevent multiple calls if already creating
    if (isCreating || !selectedType) return

    if (session?.user && session.user.id) {
      setIsCreating(true)
      try {
        const typePlural = getTypePlural(selectedType)
        const newName = `${topicCollection.name} (${typePlural})`

        const props: AddCollectionProps = {
          name: newName,
          type: selectedType as unknown as ContentHandlerType,
          ownerId: topicCollection.ownerId,
          locale: {
            code: 'en-GB',
            language: 'English (UK)',
          },
          country: {
            code: 'en-GB',
            countryCode: 'GB', // United Kingdom
            name: 'United Kingdom',
          },
        }

        await addCollection(props)
      } catch (error) {
        console.error('Error creating collection:', error)
        // Reset creating state on error so user can try again
        setIsCreating(false)
      }
      // Note: setIsCreating(false) is handled in useEffect when collection is created
    }
  }

  const getButtonLabel = (): string => {
    if (!selectedType) {
      return 'Please select a type'
    }
    return `A collection of type ${selectedType} will be created`
  }

  const isButtonDisabled = !selectedType || isCreating

  return (
    <div>
      <div>
        <div>
          <input
            type="radio"
            id="taxon"
            name="collectionType"
            value="taxon"
            checked={
              selectedType === ('taxon' as unknown as ContentHandlerType)
            }
            onChange={e =>
              setSelectedType(e.target.value as unknown as ContentHandlerType)
            }
          />
          <label htmlFor="taxon">taxon</label>
        </div>

        <div>
          <input
            type="radio"
            id="term"
            name="collectionType"
            value="term"
            checked={selectedType === ('term' as unknown as ContentHandlerType)}
            onChange={e =>
              setSelectedType(
                e.target
                  .value as unknown as ContentHandlerType as ContentHandlerType
              )
            }
          />
          <label htmlFor="term">term</label>
        </div>

        <div>
          <input
            type="radio"
            id="trait"
            name="collectionType"
            value="trait"
            checked={
              selectedType === ('trait' as unknown as ContentHandlerType)
            }
            onChange={e =>
              setSelectedType(e.target.value as unknown as ContentHandlerType)
            }
          />
          <label htmlFor="trait">trait</label>
        </div>
      </div>

      <button onClick={createCollection} disabled={isButtonDisabled}>
        {isCreating ? 'Creating...' : 'Create collection'}
      </button>

      <div>{getButtonLabel()}</div>
    </div>
  )
}
