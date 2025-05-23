// Shared Database Logic (for direct calls on the server and via a network request on the client)

import { Collection } from '@/types'
// import { sortAlphabeticallyBy } from '@/utils/strings'
// import { generateGenusAndSpeciesFields } from '@/utils/taxa'
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

export const getCollectionByShortId = async (
  shortId: string
): Promise<Collection<unknown> | undefined> => {
  const client = await clientPromise
  const db = client.db(DB_NAME)
  const collection = await db.collection('collections').findOne({ shortId })

  if (!collection) {
    return undefined
  }

  return {
    id: collection._id.toString(),
    shortId: collection.shortId || '',
    slug: collection.slug || '',
    items: collection.items,
    name: collection.name,
    type: collection.type,
  }
}

export const createCollection = async (collection: Collection<unknown>) => {
  const client = await clientPromise
  const db = client.db('ltp')

  const shortId = crypto.randomUUID().split('-')[0]
  const slug = collection.name.toLowerCase().replace(/\s+/g, '-')

  const result = await db.collection('collections').insertOne({
    ...collection,
    shortId,
    slug,
  })

  return { id: result.insertedId.toString(), shortId, slug }
}
