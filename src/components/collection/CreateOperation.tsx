'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { CollectionTextField } from '@/components/common/CollectionTextField'
import { CollectionType } from '@/components/common/CollectionType'
import { CountrySelector } from '@/components/collection/search/FilterByCountry'
import { LocaleSelector } from '@/components/inat/Locale'
import { SignIn } from '@/components/oauth/SignIn'

import { useCollection } from '@/contexts/CollectionContext'

import {
  ContentHandlerType,
  Country,
  UserLocale,
  AddCollectionProps,
} from '@/types'

import { CountryDefault, LocaleDefault } from '@/config'

export const CreateOperation = () => {
  const { data: session, status } = useSession()
  const { collection, addCollection } = useCollection()
  const [name, setName] = useState<string>('')
  const [type, setType] = useState<ContentHandlerType>(
    'topic' as unknown as ContentHandlerType
  )
  const [imageUrl, setImageUrl] = useState<string>('')
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [country, setCountry] = useState<Country>(CountryDefault)
  const [locale, setLocale] = useState<UserLocale>(LocaleDefault)

  const MIN_NAME_LENGTH = 5

  const router = useRouter()

  const createCollection = async () => {
    // Prevent multiple calls if already creating
    if (isCreating) return

    if (name && name.length > MIN_NAME_LENGTH && session?.user) {
      setIsCreating(true)
      try {
        if (session && session.user && session.user.id) {
          const props: AddCollectionProps = {
            name,
            type,
            ownerId: session.user.id,
            locale,
            country,
            imageUrl,
          }
          await addCollection(props)
        }
      } catch (error) {
        console.error('Error creating collection:', error)
        // Reset creating state on error so user can try again
        setIsCreating(false)
      }
      // Note: setIsCreating(false) is handled in useEffect when collection is created
    }
  }

  useEffect(() => {
    if (collection) {
      setIsCreating(false) // Reset loading state
      router.push(`/collection/edit/${collection?.slug}-${collection?.shortId}`)
    }
  }, [collection, router])

  // Show loading state
  if (status === 'loading') {
    return <div>Loading...</div>
  }

  const isButtonDisabled = name.length < MIN_NAME_LENGTH || isCreating

  // Show create form if authenticated
  return (
    <>
      {session?.user && (
        <>
          <CollectionType operation={'create'} type={type} setType={setType} />

          <CollectionTextField
            fieldValue={name}
            setFieldValue={setName}
            fieldText="collection name"
            type={type}
            required={true}
          />

          <CollectionTextField
            fieldValue={imageUrl}
            setFieldValue={setImageUrl}
            fieldText="collection image url"
            type={type}
          />

          <CountrySelector
            country={country}
            setCountry={setCountry}
            type={type}
          />

          <LocaleSelector
            userLocale={locale}
            setUserLocale={setLocale}
            type={type}
          />

          <button onClick={createCollection} disabled={isButtonDisabled}>
            {isCreating ? 'Creating...' : 'Create collection'}
          </button>
        </>
      )}
      <SignIn
        signInText="Sign in to create collection"
        className="wide login"
      />
    </>
  )
}
