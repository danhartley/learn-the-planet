import { getAuthorByOwnerId } from '@/api/database'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const parts = request.nextUrl.pathname.split('/')
    const ownerId = parts[3]

    if (!ownerId) {
      return NextResponse.json(
        { error: 'Missing ownerId in path' },
        { status: 400 }
      )
    }

    const author = await getAuthorByOwnerId(ownerId)

    if (!author) {
      return NextResponse.json({ error: 'Author not found' }, { status: 404 })
    }

    return NextResponse.json(author)
  } catch (error) {
    console.error('Failed to get author:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
