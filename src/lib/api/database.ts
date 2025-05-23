import { Collection, Taxon } from '@/types'
import { sortAlphabeticallyBy } from '@/utils/strings'
import { generateGenusAndSpeciesFields } from '@/utils/taxa'
import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/api/mongodb'

const DB_NAME = 'ltp'

export async function getCollections(): Promise<
  Collection<unknown>[] | undefined
> {
  try {
    const client = await clientPromise
    const db = client.db(DB_NAME)
    const collections = await db.collection('collections').find({}).toArray()
    return collections.map(collection => {
      return {
        id: collection._id.toString(),
        shortId: collection?.shortId || '',
        slug: collection?.slug || '',
        items: collection.items,
        name: collection.name,
        type: collection.type,
      }
    })
  } catch (error) {
    console.error('Failed to get posts collection:', error)
    return undefined
  }
}

export const getCollectionById = async () => {
  let shortId, slug
  let attempts = 0

  const client = await clientPromise
  const db = client.db(DB_NAME)
  do {
    shortId = crypto.randomUUID().split('-')[0]
    slug = req.body.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 50)
    attempts++
  } while (
    attempts < 5 &&
    (await db.collection('collections').findOne({ shortId, slug }))
  )
}
