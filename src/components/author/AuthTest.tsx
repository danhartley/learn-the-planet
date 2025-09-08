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
    <div className="p-4 border rounded">
      <h3 className="font-bold mb-2">NextAuth Test</h3>
      <p>Status: {status}</p>
      <p>Session: {session ? 'Active' : 'None'}</p>

      <div className="mt-4 space-x-2">
        <button
          onClick={testNextAuth}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
        >
          Test NextAuth Endpoints
        </button>

        <button
          onClick={() => signIn('google')}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm"
        >
          Test Google Sign In
        </button>

        <button
          onClick={() => {
            console.log('Attempting iNaturalist sign in...')
            signIn('inaturalist')
          }}
          className="bg-green-500 text-white px-3 py-1 rounded text-sm"
        >
          Test iNaturalist Sign In
        </button>
      </div>

      <div className="mt-2">
        <button
          onClick={() => window.open('/api/auth/providers', '_blank')}
          className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
        >
          Check /api/auth/providers
        </button>
      </div>
    </div>
  )
}
