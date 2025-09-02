'use client'

import { useState, useEffect } from 'react'

import Link from 'next/link'

import { SignIn } from '@/components/oauth/SignIn'

import { useSession } from 'next-auth/react'
import { useAuthenticatedAuthor } from '@/hooks/useAuthenticatedAuthor'

import { SessionState } from '@/types'

export const Header = () => {
  const { data: session } = useSession()
  const [userName, setUserName] = useState('')

  const authenticatedAuthor = useAuthenticatedAuthor(
    session as unknown as SessionState
  )

  useEffect(() => {
    setUserName(authenticatedAuthor?.displayName || 'incognito')
  }, [authenticatedAuthor])

  return (
    <header>
      <div>
        <div>
          <Link href="/">Learn the Planet</Link>
        </div>
        <div>
          <div className="font-xs capitalise">{userName}</div>
          <SignIn signInText="Sign in" className="small" />
        </div>
      </div>
    </header>
  )
}
