import { updateLinkedCollections } from '@/api/database'
import { NextRequest, NextResponse } from 'next/server'
import { extractShortId } from '@/utils/strings'

type Props = {
  params: Promise<{ 'slug-shortId': string }>
}

export async function PUT(
  req: NextRequest,
  { params }: Props
): Promise<
  | NextResponse<{
      error: string | undefined
    }>
  | NextResponse<{
      success: boolean
    }>
> {
  try {
    const { 'slug-shortId': slugShortId } = await params

    const shortId = extractShortId(slugShortId)

    if (!shortId) {
      return NextResponse.json(
        { error: 'Missing shortId in path' },
        { status: 400 }
      )
    }

    const body = await req.json()

    const { linkedCollections } = body

    if (!Array.isArray(linkedCollections)) {
      console.log(
        'ERROR: Collections is not an array:',
        typeof linkedCollections,
        linkedCollections
      )
      return NextResponse.json(
        { error: 'Collections must be an array' },
        { status: 400 }
      )
    }

    // Check for undefined values in collections array
    const hasUndefined = linkedCollections.some(
      c => c === undefined || c === null
    )
    if (hasUndefined) {
      console.log(
        'ERROR: Collections array contains undefined/null values:',
        linkedCollections
      )
      return NextResponse.json(
        { error: 'Collections array contains invalid values' },
        { status: 400 }
      )
    }

    const result = await updateLinkedCollections(shortId, linkedCollections)

    if (!result.success) {
      console.log('ERROR from updateLinkedCollections:', result.error)
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({ success: true, collection: result.collection })
  } catch (error) {
    console.error('Failed to update linked collections:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
