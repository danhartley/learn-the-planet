// app/debug/page.tsx - Debug page to test auth
import { auth } from '@/auth'

// verify NextAuth is working
import { AuthTest } from '@/components/author/AuthTest'

export default async function DebugPage() {
  const session = await auth()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Auth Debug Page</h1>

      <div className="bg-gray-100 p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Session Data:</h2>
        <pre className="text-sm overflow-x-auto">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Environment Check:</h2>
        <ul className="list-disc list-inside">
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
