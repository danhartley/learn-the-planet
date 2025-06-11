import { getCollections } from '@/api/database'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const collections = await getCollections()
    return NextResponse.json(collections)
  } catch (error) {
    console.error('Failed to get collections:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
