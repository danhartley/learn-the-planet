import { getAuthors } from '@/api/database'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const authors = await getAuthors()

    if (!authors) {
      return NextResponse.json({ error: 'authors not found' }, { status: 404 })
    }

    return NextResponse.json({ authors })
  } catch (error) {
    console.error('Failed to get authors:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
