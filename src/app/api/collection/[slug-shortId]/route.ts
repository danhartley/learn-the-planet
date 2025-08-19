import {
  getCollectionByShortId,
  getCollectionSummaryByShortId,
} from '@/api/database'
import { NextRequest, NextResponse } from 'next/server'
import { extractShortId } from '@/utils/strings'

export async function GET(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname
    const shortId = extractShortId(pathname)

    if (!shortId) {
      return NextResponse.json(
        { error: 'Missing shortId in path' },
        { status: 400 }
      )
    }

    const collection = await getCollectionByShortId(shortId)
    const collectionSummary = await getCollectionSummaryByShortId(shortId)

    if (!collection || !collectionSummary) {
      return NextResponse.json(
        { error: 'Collection not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ collection, collectionSummary })
  } catch (error) {
    console.error('Failed to get collection:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
