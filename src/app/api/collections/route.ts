import { Collection } from '@/types'
import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/api/mongodb'

interface ApiError {
  message: string
  error?: string
  success: false
}

const DB_NAME = 'ltp'

export async function POST(
  req: NextRequest
): Promise<NextResponse<Collection<unknown> | ApiError>> {
  const client = await clientPromise
  try {
    // Parse request body
    const collection: Collection<unknown> = await req.json()

    if (!collection.name) {
      return NextResponse.json(
        { message: 'Collection name is required', success: false },
        { status: 400 }
      )
    }

    // Generate shortId and slug
    const shortId = crypto.randomUUID().split('-')[0]
    const slug = collection.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .slice(0, 50) // Limit length

    // Connect to MongoDB
    const db = client.db(DB_NAME)
    const collections = db.collection('collections')

    // Check for duplicate shortId + slug (very unlikely but good practice)
    let attempts = 0
    let finalShortId = shortId

    while (attempts < 5) {
      const existing = await collections.findOne({
        shortId: finalShortId,
        slug,
      })

      if (!existing) break

      // Generate new shortId if collision
      finalShortId = crypto.randomUUID().split('-')[0]
      attempts++
    }

    if (attempts >= 5) {
      return NextResponse.json(
        { message: 'Unable to generate unique identifier', success: false },
        { status: 500 }
      )
    }

    // Insert document
    const result = await collections.insertOne({
      ...collection,
      shortId: finalShortId,
      slug,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // Return response
    return NextResponse.json(
      {
        id: result.insertedId.toString(),
        shortId: finalShortId,
        slug,
      } as Collection<unknown>,
      { status: 201 }
    )
  } catch (error) {
    console.error('Error adding collection:', error)

    return NextResponse.json(
      {
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false,
      },
      { status: 500 }
    )
  } finally {
    // Close MongoDB connection
    await client.close()
  }
}

export async function GET(): Promise<
  NextResponse<Collection<unknown>[] | ApiError>
> {
  try {
    const client = await clientPromise
    const db = client.db(DB_NAME)
    const collections = await db.collection('collections').find({}).toArray()

    const formattedCollections: Collection<unknown>[] = collections.map(
      collection => ({
        id: collection._id.toString(),
        shortId: collection?.shortId || '',
        slug: collection?.slug || '',
        items: collection.items || [],
        name: collection.name || '',
        type: collection.type || '',
      })
    )

    return NextResponse.json(formattedCollections)
  } catch (error) {
    console.error('Failed to get collections:', error)

    return NextResponse.json(
      {
        message: 'Failed to fetch collections',
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false,
      },
      { status: 500 }
    )
  }
}
