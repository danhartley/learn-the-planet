'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { CollectionTextField } from '@/components/common/CollectionTextField'
import { CollectionType } from '@/components/common/CollectionType'
import { SignIn } from '@/components/oauth/SignIn'

import { useCollection } from '@/contexts/CollectionContext'

import { ContentHandlerType } from '@/types'

export const CreateOperation = () => {
  const { data: session, status } = useSession()
  const { collection, addCollection } = useCollection()
  const [name, setName] = useState<string>('')
  const [type, setType] = useState<ContentHandlerType>('topic')
  const [imageUrl, setImageUrl] = useState<string>('')

  const MIN_NAME_LENGTH = 5

  const router = useRouter()

  const createCollection = () => {
    const create = async () => {
      if (session && session.user && session.user.id)
        await addCollection(name, type, session.user.id)
    }
    if (name && name.length > MIN_NAME_LENGTH && session?.user) {
      create()
    }
  }

  useEffect(() => {
    if (collection)
      router.push(`/collection/edit/${collection?.slug}-${collection?.shortId}`)
  }, [collection, router])

  // Show loading state
  if (status === 'loading') {
    return <div>Loading...</div>
  }

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

          <button
            onClick={createCollection}
            disabled={name.length < MIN_NAME_LENGTH}
          >
            Create collection
          </button>
        </>
      )}

      <SignIn signInText="Sign in to create collection" />
    </>
  )
}
