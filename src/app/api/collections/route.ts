import { getCollections, createCollection } from '@/api/database'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  req: NextRequest
): Promise<NextResponse<{ id: string; shortId: string; slug: string }>> {
  const data = await req.json()
  const result = await createCollection(data)
  return NextResponse.json(result)
}

export async function GET() {
  const collections = await getCollections()
  return NextResponse.json(collections)
}
