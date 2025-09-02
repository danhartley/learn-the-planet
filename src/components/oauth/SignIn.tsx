'use client'

import { useEffect } from 'react'

import { signIn, signOut, useSession } from 'next-auth/react'

import { useCollection } from '@/contexts/CollectionContext'

type Props = {
  signInText: string
  className?: string
}

export function SignIn({ signInText = 'Sign in', className }: Props) {
  const { getAuthorByOwnerId } = useCollection()
  const { data: session, status } = useSession()

  useEffect(() => {
    const getAuthenticatedAuthor = async () => {
      if (session?.user?.id) {
        await getAuthorByOwnerId(session.user.id)
      }
    }
    getAuthenticatedAuthor()
  }, [session])

  if (status === 'loading') return null
  // return <div className={`${className}`}>Loading...</div>

  if (session?.user) {
    return (
      <button
        id="sign-out-btn"
        onClick={() => signOut()}
        className={`save ${className}`}
      >
        Sign out
      </button>
    )
  } else {
    return (
      <button
        id="sign-in-btn"
        onClick={() => signIn('google')}
        className={`save ${className}`}
      >
        {signInText}
      </button>
    )
  }
}
