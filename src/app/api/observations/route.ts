import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function GET(request: NextRequest) {
  const session = await auth()

  if (!session || !session.user?.inaturalist_user_id) {
    return NextResponse.json(
      {
        error: 'Not authenticated with iNaturalist',
      },
      { status: 401 }
    )
  }

  try {
    const url = new URL(request.url)
    const page = url.searchParams.get('page') || '1'
    const perPage = url.searchParams.get('per_page') || '20'

    // Use the access token if available for authenticated requests
    const headers: HeadersInit = {
      Accept: 'application/json',
    }

    // If you stored the access token in the session (be careful in production!)
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const accessToken = (session as any).inaturalist_access_token
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`
    }

    const response = await fetch(
      `https://api.inaturalist.org/v1/observations?user_id=${session.user.inaturalist_user_id}&page=${page}&per_page=${perPage}`,
      { headers }
    )

    if (!response.ok) {
      throw new Error(`iNaturalist API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching observations:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch observations',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
