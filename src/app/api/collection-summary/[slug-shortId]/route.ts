import { NextRequest, NextResponse } from 'next/server'
import { updateCollectionStatus } from '@/api/database'
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

    console.log('status', status)

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
