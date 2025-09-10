import { useEffect, useCallback } from 'react'
import { useCollection } from '@/contexts/CollectionContext'
import { Author, SessionState } from '@/types'

// localStorage utility functions
const saveAuthorToStorage = (author: Author | undefined): void => {
  if (typeof window === 'undefined') return

  try {
    if (author) {
      localStorage.setItem('authenticatedAuthor', JSON.stringify(author))
    } else {
      localStorage.removeItem('authenticatedAuthor')
    }
  } catch (error) {
    console.error('Failed to save author to localStorage:', error)
  }
}

const getAuthorFromStorage = (): Author | undefined => {
  if (typeof window === 'undefined') return undefined

  try {
    const stored = localStorage.getItem('authenticatedAuthor')
    return stored ? JSON.parse(stored) : undefined
  } catch (error) {
    console.error('Failed to get author from localStorage:', error)
    return undefined
  }
}

export const useAuthenticatedAuthor = (
  session: SessionState | undefined
): Author | undefined => {
  const {
    getAuthorByOwnerId,
    authenticatedAuthor,
    setAuthenticatedAuthor,
    getInatToken,
  } = useCollection()

  const fetchAndSetAuthor = useCallback(
    async (userId: string, inaturalistName?: string) => {
      try {
        const author = await getAuthorByOwnerId(userId)

        // Add iNaturalist token if available
        if (author && inaturalistName) {
          const token = await getInatToken(userId)
          if (token) {
            author.inatToken = token
          }
        }

        setAuthenticatedAuthor(author)
        saveAuthorToStorage(author)
        return author
      } catch (error) {
        console.error('Failed to fetch authenticated author:', error)
        setAuthenticatedAuthor(undefined)
        saveAuthorToStorage(undefined)
        return undefined
      }
    },
    [getAuthorByOwnerId, getInatToken, setAuthenticatedAuthor]
  )

  const clearAuthor = useCallback(() => {
    setAuthenticatedAuthor(undefined)
    saveAuthorToStorage(undefined)
  }, [setAuthenticatedAuthor])

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedAuthor = getAuthorFromStorage()
    if (storedAuthor && !authenticatedAuthor) {
      setAuthenticatedAuthor(storedAuthor)
    }
  }, [authenticatedAuthor, setAuthenticatedAuthor])

  // Handle session changes
  useEffect(() => {
    if (session?.user?.id) {
      fetchAndSetAuthor(session.user.id, session.user.inaturalist_name)
    } else {
      clearAuthor()
    }
  }, [session, fetchAndSetAuthor, clearAuthor])

  return authenticatedAuthor
}
