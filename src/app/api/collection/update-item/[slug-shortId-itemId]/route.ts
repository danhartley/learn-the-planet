import { NextRequest, NextResponse } from 'next/server'
import { updateCollectionItem } from '@/api/database'
import { extractShortIdFromThreeParams, extractItemId } from '@/utils/strings'

export async function PUT(req: NextRequest) {
  try {
    const pathname = req.nextUrl.pathname
    const shortId = extractShortIdFromThreeParams(pathname)
    const itemId = extractItemId(pathname) || ''

    if (!shortId) {
      return NextResponse.json(
        { error: 'Missing shortId in path' },
        { status: 400 }
      )
    }

    if (!itemId) {
      return NextResponse.json(
        { error: 'Missing itemId in path' },
        { status: 400 }
      )
    }

    const updatedItem = await req.json()

    if (!updatedItem) {
      return NextResponse.json(
        { error: 'Missing items in body' },
        { status: 400 }
      )
    }

    const collection = await updateCollectionItem(shortId, itemId, updatedItem)

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
