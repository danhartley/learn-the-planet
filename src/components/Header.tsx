'use client'

import { useState, useEffect } from 'react'

import Link from 'next/link'

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
        <Link href="/">Learn the Planet</Link>
        <div className="font-xs capitalise">{userName}</div>
      </div>
    </header>
  )
}
