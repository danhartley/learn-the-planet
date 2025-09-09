'use client'

import { useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useCollection } from '@/contexts/CollectionContext'

import { Author } from '@/types'

type Props = {
  signInText: string
  className?: string
}

export function SignIn({ signInText = 'Sign in', className }: Props) {
  const { getAuthorByOwnerId, getInatToken, setAuthenticatedAuthor } =
    useCollection()
  const { data: session, status } = useSession()

  useEffect(() => {
    const getAuthenticatedAuthor = async () => {
      if (session?.user?.id) {
        const author = await getAuthorByOwnerId(session.user.id)
        if (author && session?.user?.inaturalist_name) {
          const token = await getInatToken(session.user.id)
          if (token) {
            author.inatToken = token
          }
          setAuthenticatedAuthor(author)
        }
      }
    }
    getAuthenticatedAuthor()
  }, [session])

  const handleSignIn = (provider: string) => {
    signIn(provider)
  }

  const handleSignOut = () => {
    signOut()
  }

  if (status === 'loading') {
    return (
      <button id="sign-in-loading" className={`${className} small`}>
        Updating…
      </button>
    )
  }

  if (session?.user) {
    return (
      <button id="sign-out-btn" onClick={handleSignOut} className={className}>
        Sign out
      </button>
    )
  } else {
    return (
      <select
        id="sign-in-select"
        aria-label="Sign in with provider"
        className={className}
        onChange={e => {
          const provider = e.target.value
          if (provider) {
            handleSignIn(provider)
          }
        }}
        defaultValue=""
      >
        <option value="" disabled>
          {signInText}
        </option>
        <option value="google">Google</option>
        <option value="inaturalist">iNaturalist</option>
      </select>
    )
  }
}
