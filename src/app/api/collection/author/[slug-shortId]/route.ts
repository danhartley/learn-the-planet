import { NextRequest, NextResponse } from 'next/server'
import { updateAuthor } from '@/api/database'
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

    const author = await req.json()

    if (!author) {
      return NextResponse.json(
        { error: 'Missing author in body' },
        { status: 400 }
      )
    }

    const collection = await updateAuthor(shortId, author)

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
