'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export const Authentication = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') return <p>Loading...</p>

  if (session) {
    return (
      <div className="space-y-2">
        <p>Signed in as {session.user?.email}</p>
        {session.user?.inaturalist_user_id && (
          <p>iNaturalist User ID: {session.user.inaturalist_user_id}</p>
        )}
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Sign out
        </button>
      </div>
    )
  }

  return (
    <div className="form-row">
      <button onClick={() => signIn('google')}>Sign in with Google</button>
      <button onClick={() => signIn('inaturalist')}>
        Sign in with iNaturalist
      </button>
    </div>
  )
}
