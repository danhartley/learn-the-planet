import { useEffect, useRef } from 'react'
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

  // Track the last fetched user ID to prevent duplicate requests
  const lastFetchedUserId = useRef<string | null>(null)
  const isInitialized = useRef(false)

  // Initialise from localStorage on mount (only once)
  useEffect(() => {
    if (!isInitialized.current) {
      const storedAuthor = getAuthorFromStorage()
      if (storedAuthor && !authenticatedAuthor) {
        setAuthenticatedAuthor(storedAuthor)
      }
      isInitialized.current = true
    }
  }, []) // Empty dependency array - only run once

  // Handle session changes
  useEffect(() => {
    const fetchAndSetAuthor = async (
      userId: string,
      inaturalistName?: string
    ) => {
      // Prevent duplicate requests for the same user
      if (lastFetchedUserId.current === userId) {
        return
      }

      lastFetchedUserId.current = userId

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
      } catch (error) {
        console.error('Failed to fetch authenticated author:', error)
        setAuthenticatedAuthor(undefined)
        saveAuthorToStorage(undefined)
      }
    }

    const clearAuthor = () => {
      lastFetchedUserId.current = null
      setAuthenticatedAuthor(undefined)
      saveAuthorToStorage(undefined)
    }

    if (session?.user?.id) {
      fetchAndSetAuthor(session.user.id, session.user.inaturalist_name)
    } else {
      clearAuthor()
    }
  }, [
    session?.user?.id,
    session?.user?.inaturalist_name,
    getAuthorByOwnerId,
    getInatToken,
    setAuthenticatedAuthor,
  ])

  return authenticatedAuthor
}
