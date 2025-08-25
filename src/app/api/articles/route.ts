import { NextRequest, NextResponse } from 'next/server'
import { getCollectionSummariesByOwnerId } from '@/api/database'

export async function POST(req: NextRequest) {
  try {
    const ownerId = await req.json()

    if (!ownerId) {
      return NextResponse.json(
        { error: 'Missing fields in body' },
        { status: 400 }
      )
    }

    const collectionSummaries = await getCollectionSummariesByOwnerId(ownerId)

    if (!collectionSummaries) {
      return NextResponse.json(
        { error: 'Collection summaries not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(collectionSummaries)
  } catch (error) {
    console.error('Failed to get collection summaries:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
