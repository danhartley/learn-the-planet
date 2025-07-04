'use client'

import { useSession } from 'next-auth/react'

export function useAuth() {
  const { data: session, status } = useSession()
  console.log(session?.user)
  return {
    user: session?.user,
    isLoading: status === 'loading',
    isAuthenticated: !!session?.user,
    canEdit: (ownerId: string) => session?.user?.id === ownerId,
  }
}
