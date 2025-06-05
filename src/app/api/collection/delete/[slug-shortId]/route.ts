import { NextRequest, NextResponse } from 'next/server'
import { deleteCollection } from '@/api/database'
import { extractShortId } from '@/utils/strings'

export async function DELETE(req: NextRequest) {
  try {
    const pathname = req.nextUrl.pathname
    const shortId = extractShortId(pathname)

    if (!shortId) {
      return NextResponse.json(
        { error: 'Missing shortId in path' },
        { status: 400 }
      )
    }

    const result = await deleteCollection(shortId)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to remove collection reference:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
