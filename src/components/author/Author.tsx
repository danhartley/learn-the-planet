'use client'

import { useState } from 'react'

import { useCollection } from '@/contexts/CollectionContext'

import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import {
  Author as AuthorType,
  ContentHandlerType,
  Role,
  TrustLevel,
} from '@/types'

import { CollectionTextField } from '@/components/common/CollectionTextField'

type Props = {
  authenticatedAuthor: AuthorType
  authorToEdit?: AuthorType | undefined
}

export const Author = ({ authenticatedAuthor, authorToEdit }: Props) => {
  const { updateAuthenticatedAuthor, apiResponse } = useCollection()
  const [name, setName] = useState(
    authorToEdit?.displayName || authenticatedAuthor.displayName
  )
  const [bio, setBio] = useState(authorToEdit?.bio || authenticatedAuthor.bio)
  const [selectedRole, setSelectedRole] = useState<Role>(
    authorToEdit?.role || authenticatedAuthor.role
  )
  const [selectedTrustLevel, setSelectedTrustLevel] = useState<TrustLevel>(
    authorToEdit?.trustLevel || authenticatedAuthor.trustLevel
  )
  const [website, setWebsite] = useState<string>(authorToEdit?.website || '')

  const saveChanges = () => {
    const author = authorToEdit || authenticatedAuthor
    const updaterRole = authenticatedAuthor.role // the logged in, authenticated user
    let updates = {}

    if (updaterRole === 'author') {
      updates = {
        bio,
      }
    }

    if (updaterRole === 'admin') {
      updates = {
        displayName: name,
        bio,
        role: selectedRole,
        trustLevel: selectedTrustLevel,
        website: website || '',
      }
    }

    updateAuthenticatedAuthor(author.ownerId, updaterRole, updates)
  }

  return (
    <>
      {authenticatedAuthor.role === 'admin' ? (
        <>
          <CollectionTextField
            fieldValue={name}
            setFieldValue={setName}
            fieldText="Display name"
            type={'topic' as unknown as ContentHandlerType}
            required={true}
          />
          <CollectionTextField
            fieldValue={bio}
            setFieldValue={setBio}
            fieldText="Short biography"
            type={'topic' as unknown as ContentHandlerType}
            required={true}
          />
          <CollectionTextField
            fieldValue={website || ''}
            setFieldValue={setWebsite}
            fieldText="Personal website"
            type={'topic' as unknown as ContentHandlerType}
            required={true}
          />

          {/* Role Radio Buttons */}
          <div className="list-group">
            <label>Role</label>
            <div className="list-group">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="author"
                  checked={selectedRole === 'author'}
                  onChange={e => setSelectedRole(e.target.value as Role)}
                />
                Author
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={selectedRole === 'admin'}
                  onChange={e => setSelectedRole(e.target.value as Role)}
                />
                Admin
              </label>
            </div>
          </div>

          {/* Trust Level Radio Buttons */}
          <div className="list-group">
            <label>Trust Level</label>
            <div className="list-group">
              <label>
                <input
                  type="radio"
                  name="trustLevel"
                  value="untrusted"
                  checked={selectedTrustLevel === 'untrusted'}
                  onChange={e =>
                    setSelectedTrustLevel(e.target.value as TrustLevel)
                  }
                />
                Untrusted
              </label>
              <label>
                <input
                  type="radio"
                  name="trustLevel"
                  value="trusted"
                  checked={selectedTrustLevel === 'trusted'}
                  onChange={e =>
                    setSelectedTrustLevel(e.target.value as TrustLevel)
                  }
                />
                Trusted
              </label>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>{name}</div>
          <CollectionTextField
            fieldValue={bio}
            setFieldValue={setBio}
            fieldText="Short biography"
            type={'topic' as unknown as ContentHandlerType}
            required={true}
          />
        </>
      )}

      <div className="form-row">
        <button onClick={saveChanges}>Save details</button>
        <ApiResponseMessage apiResponse={apiResponse} />
      </div>
    </>
  )
}
