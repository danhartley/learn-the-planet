import { getCollectionSummaries } from '@/api/database'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const collectionSummaries = await getCollectionSummaries()
    return NextResponse.json(collectionSummaries)
  } catch (error) {
    console.error('Failed to get collection summaries:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
