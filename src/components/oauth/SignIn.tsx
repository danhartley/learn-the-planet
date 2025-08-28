'use client'

import { useEffect } from 'react'

import { signIn, signOut, useSession } from 'next-auth/react'

import { useCollection } from '@/contexts/CollectionContext'

type Props = {
  signInText: string
}

export function SignIn({ signInText = 'Sign in' }: Props) {
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

  if (status === 'loading') return <p>Loading...</p>

  if (session?.user) {
    return (
      <button id="sign-out-btn" onClick={() => signOut()} className="save">
        Sign out
      </button>
    )
  } else {
    return (
      <button
        id="sign-in-btn"
        onClick={() => signIn('google')}
        className="save"
      >
        {signInText}
      </button>
    )
  }
}
