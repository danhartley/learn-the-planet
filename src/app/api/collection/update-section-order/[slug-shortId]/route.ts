import { NextRequest, NextResponse } from 'next/server'
import { updateCollectionSectionOrder } from '@/api/database'
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

    const fields = await req.json()

    if (!fields) {
      return NextResponse.json(
        { error: 'Missing fields in body' },
        { status: 400 }
      )
    }

    const collection = await updateCollectionSectionOrder(shortId, fields)

    if (!collection) {
      return NextResponse.json(
        { error: 'Collection not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(collection)
  } catch (error) {
    console.error('Failed to get collection:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
