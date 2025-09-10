// Test component to verify NextAuth is working
// components/AuthTest.tsx
'use client'

import { useSession, signIn } from 'next-auth/react'

export function AuthTest() {
  const { data: session, status } = useSession()

  const testNextAuth = async () => {
    try {
      // Test if NextAuth endpoints are accessible
      const response = await fetch('/api/auth/providers')
      const providers = await response.json()
      console.log('Available providers:', providers)

      // Test session endpoint
      const sessionResponse = await fetch('/api/auth/session')
      const sessionData = await sessionResponse.json()
      console.log('Session data:', sessionData)
    } catch (error) {
      console.error('NextAuth test failed:', error)
    }
  }

  return (
    <div>
      <h3>NextAuth Test</h3>
      <p>Status: {status}</p>
      <p>Session: {session ? 'Active' : 'None'}</p>

      <div className="grid-md">
        <button onClick={testNextAuth}>Test NextAuth Endpoints</button>

        <button onClick={() => signIn('google')}>Test Google Sign In</button>

        <button
          onClick={() => {
            console.log('Attempting iNaturalist sign in...')
            signIn('inaturalist')
          }}
        >
          Test iNaturalist Sign In
        </button>
        <button onClick={() => window.open('/api/auth/providers', '_blank')}>
          Check /api/auth/providers
        </button>
      </div>
    </div>
  )
}
