// app/debug/page.tsx - Debug page to test auth
import { auth } from '@/auth'

// verify NextAuth is working
import { AuthTest } from '@/components/author/AuthTest'

export default async function DebugPage() {
  const session = await auth()

  return (
    <div>
      <h1>Auth Debug Page</h1>

      <div>
        <h2>Session Data:</h2>
        <pre>
          <code>{JSON.stringify(session, null, 2)}</code>
        </pre>
      </div>

      <div>
        <h2>Environment Check:</h2>
        <ul>
          <li>NEXTAUTH_URL: {process.env.NEXTAUTH_URL || 'Not set'}</li>
          <li>
            INATURALIST_CLIENT_ID:{' '}
            {process.env.INATURALIST_CLIENT_ID ? 'Set' : 'Not set'}
          </li>
          <li>
            INATURALIST_CLIENT_SECRET:{' '}
            {process.env.INATURALIST_CLIENT_SECRET ? 'Set' : 'Not set'}
          </li>
        </ul>
      </div>

      <AuthTest />
    </div>
  )
}
