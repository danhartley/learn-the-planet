import { NextRequest, NextResponse } from 'next/server'
import { deleteCollectionItem } from '@/api/database'
import { extractShortIdFromThreeParams, extractItemId } from '@/utils/strings'

export async function DELETE(req: NextRequest) {
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

    const success = await deleteCollectionItem(shortId, itemId)

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete item' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete item:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
