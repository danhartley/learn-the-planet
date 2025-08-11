'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

type Props = {
  signInText: string
}

export function SignIn({ signInText = 'Sign in' }: Props) {
  const { data: session, status } = useSession()
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
