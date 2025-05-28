import { getCollections } from '@/api/database'
import { NextResponse } from 'next/server'

export async function GET() {
  const collections = await getCollections()
  return NextResponse.json(collections)
}
