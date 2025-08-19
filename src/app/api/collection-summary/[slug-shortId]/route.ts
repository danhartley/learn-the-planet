import { NextRequest, NextResponse } from 'next/server'
import {
  updateCollectionStatus,
  getCollectionSummaryByShortId,
} from '@/api/database'
import { extractShortId } from '@/utils/strings'

export async function PUT(req: NextRequest) {
  try {
    const pathname = req.nextUrl.pathname
    const shortId = extractShortId(pathname)

    if (!shortId) {
      return NextResponse.json(
        { error: 'Missing shortId in path' },
        { status: 400 }
      )
    }

    const { status } = await req.json()

    if (!status) {
      return NextResponse.json(
        { error: 'Missing status in body' },
        { status: 400 }
      )
    }

    const updatedCollectionSummary = await updateCollectionStatus(
      shortId,
      status
    )

    if (!updatedCollectionSummary) {
      return NextResponse.json(
        { error: 'Collection not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedCollectionSummary)
  } catch (error) {
    console.error('Failed to update collection status:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname
    const shortId = extractShortId(pathname)
    console.log('shortId', shortId)
    if (!shortId) {
      return NextResponse.json(
        { error: 'Missing shortId in path' },
        { status: 400 }
      )
    }

    const collectionSummary = await getCollectionSummaryByShortId(shortId)

    if (!collectionSummary) {
      return NextResponse.json(
        { error: 'Collection not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(collectionSummary)
  } catch (error) {
    console.error('Failed to get collection summary:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
