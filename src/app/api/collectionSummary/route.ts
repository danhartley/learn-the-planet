import { getCollectionsSummary } from '@/api/database'
import { NextResponse } from 'next/server'

export async function GET() {
  const collectionSummaries = await getCollectionsSummary()
  return NextResponse.json(collectionSummaries)
}
