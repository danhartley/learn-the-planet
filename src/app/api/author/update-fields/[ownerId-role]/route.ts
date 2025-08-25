import { NextRequest, NextResponse } from 'next/server'
import { updateAuthenticatedAuthor } from '@/api/database'

import { Role } from '@/types'

export async function PUT(req: NextRequest) {
  try {
    const parts = req.nextUrl.pathname.split('/')
    const auth = parts[4].split('-')

    const ownerId = auth[0]
    const role = auth[1] as unknown as Role

    if (!ownerId) {
      return NextResponse.json(
        { error: 'Missing shortId in path' },
        { status: 400 }
      )
    }

    const updates = await req.json()

    if (!updates) {
      return NextResponse.json(
        { error: 'Missing updates in body' },
        { status: 400 }
      )
    }

    const collection = await updateAuthenticatedAuthor(ownerId, updates, role)

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
