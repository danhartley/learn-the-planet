// app/api/user/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { accessToken } = await req.json()

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Missing access token' },
        { status: 400 }
      )
    }

    // Make request to iNaturalist API with the given token
    const res = await fetch('https://api.inaturalist.org/v1/users/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      // SSR-friendly: prevent caching sensitive user info
      cache: 'no-store',
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: `iNaturalist API request failed with ${res.status}` },
        { status: res.status }
      )
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    console.error('Error fetching iNaturalist user info:', err)
    return NextResponse.json(
      { error: 'Server error when fetching user info' },
      { status: 500 }
    )
  }
}
