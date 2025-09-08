'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export const Authentication = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') return <p>Loading...</p>

  if (session) {
    return (
      <div>
        <p>Signed in as {session.user?.email || session.user?.name}</p>
        {session.user?.inaturalist_user_id && (
          <div>
            <p>iNaturalist User ID: {session.user.inaturalist_user_id}</p>
            <p>iNaturalist Login: {session.user.inaturalist_login}</p>
          </div>
        )}
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }

  return (
    <div>
      <button onClick={() => signIn('google')}>Sign in with Google</button>
      <button onClick={() => signIn('inaturalist')}>
        Sign in with iNaturalist
      </button>
    </div>
  )
}
