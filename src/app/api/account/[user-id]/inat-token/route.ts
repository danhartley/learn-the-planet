import { getInatToken } from '@/api/database'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const parts = request.nextUrl.pathname.split('/')
    console.log('parts', parts)
    const userId = parts[3]
    console.log('userId', userId)
    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId in path' },
        { status: 400 }
      )
    }

    const token = await getInatToken(userId)

    if (!token) {
      return NextResponse.json(
        { error: 'Account token not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(token)
  } catch (error) {
    console.error('Failed to get token:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
