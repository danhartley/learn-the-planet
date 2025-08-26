import { useState, useEffect } from 'react'
import { useCollection } from '@/contexts/CollectionContext'
import { Author, SessionState } from '@/types'

// localStorage utility functions
const saveAuthorToStorage = (author: Author | undefined): void => {
  // Check if running in browser
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
  // Check if running in browser
  if (typeof window === 'undefined') return undefined

  try {
    const stored = localStorage.getItem('authenticatedAuthor')
    return stored ? JSON.parse(stored) : undefined
  } catch (error) {
    console.error('Failed to get author from localStorage:', error)
    return undefined
  }
}

// Custom hook
export const useAuthenticatedAuthor = (
  session: SessionState | undefined
): Author | undefined => {
  const { getAuthorByOwnerId } = useCollection()
  const [authenticatedAuthor, setAuthenticatedAuthor] = useState<
    Author | undefined
  >(undefined)

  // Load from localStorage after component mounts (client-side only)
  useEffect(() => {
    const storedAuthor = getAuthorFromStorage()
    if (storedAuthor) {
      setAuthenticatedAuthor(storedAuthor)
    }
  }, [])

  useEffect(() => {
    const fetchAuthenticatedAuthor = async () => {
      if (session?.user.id) {
        try {
          const author = await getAuthorByOwnerId(session.user.id)
          setAuthenticatedAuthor(author)
          saveAuthorToStorage(author)
        } catch (error) {
          console.error('Failed to fetch authenticated author:', error)
          // Clear localStorage on error
          saveAuthorToStorage(undefined)
        }
      } else {
        // No session, clear author
        setAuthenticatedAuthor(undefined)
        saveAuthorToStorage(undefined)
      }
    }

    fetchAuthenticatedAuthor()
  }, [session])

  return authenticatedAuthor
}
