import { Collection, CollectionSummary } from '@/types'
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
        itemCount: collection.itemCount || collection.items?.length || 0,
      }
    })
  } catch (error) {
    console.error('Failed to get posts collection:', error)
    return undefined
  }
}

export async function getCollectionSummaries(): Promise<
  CollectionSummary[] | undefined
> {
  try {
    const client = await clientPromise
    const db = client.db(DB_NAME)
    const collections = await db
      .collection('collectionsSummary')
      .find({})
      .toArray()
    return collections.map(collection => {
      return {
        id: collection._id.toString(),
        shortId: collection?.shortId || '',
        slug: collection?.slug || '',
        name: collection.name,
        type: collection.type,
        date: collection.date,
        location: collection.location,
        itemCount: collection.itemCount || 0,
      }
    })
  } catch (error) {
    console.error('Failed to get collections summary:', error)
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
    itemCount: collection.itemCount || collection.items?.length || 0,
    collections: collection?.collections || [],
  }
}

export const createCollection = async (collection: Collection<unknown>) => {
  const client = await clientPromise
  const db = client.db(DB_NAME)

  const shortId = crypto.randomUUID().split('-')[0]
  const slug = collection.name.toLowerCase().replace(/\s+/g, '-')
  const itemCount = collection.items?.length || 0

  let insertedId: string | null = null

  try {
    // Step 1: Insert into main collections table
    const result = await db.collection('collections').insertOne({
      ...collection,
      shortId,
      slug,
      itemCount,
    })

    insertedId = result.insertedId.toString()

    // Step 2: Insert into collections summary table
    const summaryData: Omit<CollectionSummary, 'id'> = {
      shortId,
      slug,
      name: collection.name,
      type: collection.type,
      date: collection.date,
      location: collection.location,
      itemCount,
    }

    await db.collection('collectionsSummary').insertOne({
      ...summaryData,
      _id: result.insertedId, // Use the same ID as the main collection
    })

    return { id: insertedId, shortId, slug }
  } catch (error) {
    console.error('Failed to create collection:', error)

    // Rollback: If we successfully inserted into collections but failed on summary,
    // delete from collections
    if (insertedId) {
      try {
        await db.collection('collections').deleteOne({
          _id: new (await import('mongodb')).ObjectId(insertedId),
        })
        console.log(
          'Rolled back collection insertion due to summary insert failure'
        )
      } catch (rollbackError) {
        console.error('Failed to rollback collection insertion:', rollbackError)
        // Log this as a critical error - manual cleanup may be needed
      }
    }

    throw error
  }
}

// Helper function to update collection summary when main collection changes
export const updateCollectionSummary = async (
  shortId: string,
  updates: Partial<
    Pick<
      Collection<unknown>,
      'name' | 'slug' | 'date' | 'location' | 'itemCount'
    >
  >
) => {
  const client = await clientPromise
  const db = client.db(DB_NAME)

  try {
    const result = await db
      .collection('collectionsSummary')
      .updateOne({ shortId }, { $set: updates })

    return result.matchedCount > 0
  } catch (error) {
    console.error('Failed to update collection summary:', error)
    throw error
  }
}

// Helper function to update item count in both collections
export const updateItemCount = async (
  shortId: string,
  newItemCount: number
) => {
  const client = await clientPromise
  const db = client.db(DB_NAME)

  try {
    // Update both collections with the new item count
    const [collectionResult, summaryResult] = await Promise.all([
      db
        .collection('collections')
        .updateOne({ shortId }, { $set: { itemCount: newItemCount } }),
      db
        .collection('collectionsSummary')
        .updateOne({ shortId }, { $set: { itemCount: newItemCount } }),
    ])

    return collectionResult.matchedCount > 0 && summaryResult.matchedCount > 0
  } catch (error) {
    console.error('Failed to update item count:', error)
    throw error
  }
}
