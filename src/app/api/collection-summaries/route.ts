import { getCollectionSummaries } from '@/api/database'
import { NextResponse } from 'next/server'

export async function GET() {
  const collectionSummaries = await getCollectionSummaries()
  return NextResponse.json(collectionSummaries)
}
