import { Collection, CollectionSummary } from '@/types'
// import { sortAlphabeticallyBy } from '@/utils/strings'
// import { generateGenusAndSpeciesFields } from '@/utils/taxa'
import clientPromise from '@/api/mongodb'

const DB_NAME = 'ltp'

export const getCollections = async (): Promise<
  Collection<unknown>[] | undefined
> => {
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

export const getCollectionSummaries = async (): Promise<
  CollectionSummary[] | undefined
> => {
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

export const addItemsToCollection = async (
  shortId: string,
  items: unknown | unknown[]
): Promise<Collection<unknown> | undefined> => {
  const client = await clientPromise
  const db = client.db(DB_NAME)

  // Convert single item to array if necessary
  const itemsArray = Array.isArray(items) ? items : [items]

  try {
    // Update the collection with new items and recalculate itemCount
    const result = await db.collection('collections').findOneAndUpdate(
      { shortId },
      [
        {
          $set: {
            items: {
              $setUnion: [
                { $ifNull: ['$items', []] }, // Handle case where items field doesn't exist
                itemsArray,
              ],
            },
          },
        },
        {
          $set: {
            itemCount: { $size: '$items' },
          },
        },
      ],
      { returnDocument: 'after' }
    )

    if (!result) {
      return undefined
    }

    // Update the summary collection with the new item count
    await updateCollectionSummary(shortId, {
      itemCount: result.items?.length || 0,
    })

    // Return the updated collection in the same format as other functions
    return {
      id: result._id.toString(),
      shortId: result.shortId || '',
      slug: result.slug || '',
      items: result.items,
      name: result.name,
      type: result.type,
      itemCount: result.itemCount || result.items?.length || 0,
      collections: result?.collections || [],
    }
  } catch (error) {
    console.error('Failed to add items to collection:', error)
    throw error
  }
}

export const deleteCollection = async (
  shortId: string
): Promise<{ success: boolean; error?: string }> => {
  const client = await clientPromise
  const db = client.db(DB_NAME)

  try {
    // Step 1: Check if this collection is referenced by any other collection
    const referencingCollection = await db
      .collection('collections')
      .findOne({ collections: shortId })

    if (referencingCollection) {
      return {
        success: false,
        error: `Cannot delete collection: it is referenced by collection "${referencingCollection.name}" (${referencingCollection.shortId})`,
      }
    }

    // Step 2: Check if the collection exists
    const collectionToDelete = await db
      .collection('collections')
      .findOne({ shortId })

    if (!collectionToDelete) {
      return {
        success: false,
        error: 'Collection not found',
      }
    }

    // Step 3: Delete from both collections and collectionsSummary
    const [collectionResult, summaryResult] = await Promise.all([
      db.collection('collections').deleteOne({ shortId }),
      db.collection('collectionsSummary').deleteOne({ shortId }),
    ])

    // Step 4: Verify both deletions were successful
    if (collectionResult.deletedCount === 0) {
      // If main collection deletion failed, we have a problem
      // Try to ensure summary is also not deleted if it somehow succeeded
      if (summaryResult.deletedCount > 0) {
        console.error(
          'Inconsistent state: summary deleted but main collection was not. Manual cleanup may be required.'
        )
      }
      return {
        success: false,
        error: 'Failed to delete collection from main table',
      }
    }

    if (summaryResult.deletedCount === 0) {
      console.warn(
        `Collection ${shortId} deleted from main table but summary was not found or failed to delete`
      )
    }

    return { success: true }
  } catch (error) {
    console.error('Failed to delete collection:', error)
    return {
      success: false,
      error: 'Database error occurred while deleting collection',
    }
  }
}

export const removeCollectionReference = async (
  parentShortId: string,
  childShortId: string
): Promise<{ success: boolean; error?: string }> => {
  const client = await clientPromise
  const db = client.db(DB_NAME)

  try {
    // Step 1: Check if the parent collection exists
    const parentCollection = await db
      .collection('collections')
      .findOne({ shortId: parentShortId })

    if (!parentCollection) {
      return {
        success: false,
        error: 'Parent collection not found',
      }
    }

    // Step 2: Check if the child collection reference exists in the parent's collections array
    if (!parentCollection.collections?.includes(childShortId)) {
      return {
        success: false,
        error: 'Collection reference not found in parent collection',
      }
    }

    // Step 3: Remove the child collection reference from the parent's collections array
    const result = await db
      .collection('collections')
      .updateOne(
        { shortId: parentShortId },
        { $pull: { collections: childShortId } }
      )

    if (result.matchedCount === 0) {
      return {
        success: false,
        error: 'Failed to update parent collection',
      }
    }

    if (result.modifiedCount === 0) {
      return {
        success: false,
        error: 'Collection reference was not removed',
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Failed to remove collection reference:', error)
    return {
      success: false,
      error: 'Database error occurred while removing collection reference',
    }
  }
}

export const addCollectionReference = async (
  parentShortId: string,
  childShortId: string
): Promise<{ success: boolean; error?: string }> => {
  const client = await clientPromise
  const db = client.db(DB_NAME)

  try {
    // Step 1: Check if the parent collection exists and is of type 'topic'
    const parentCollection = await db
      .collection('collections')
      .findOne({ shortId: parentShortId })

    if (!parentCollection) {
      return {
        success: false,
        error: 'Parent collection not found',
      }
    }

    if (parentCollection.type !== 'topic') {
      return {
        success: false,
        error: 'Collections can only be added to collections of type "topic"',
      }
    }

    // Step 2: Check if the child collection exists
    const childCollection = await db
      .collection('collections')
      .findOne({ shortId: childShortId })

    if (!childCollection) {
      return {
        success: false,
        error: 'Child collection not found',
      }
    }

    // Step 3: Check if the child collection reference already exists in the parent's collections array
    if (parentCollection.collections?.includes(childShortId)) {
      return {
        success: false,
        error: 'Collection reference already exists in parent collection',
      }
    }

    // Step 4: Add the child collection reference to the parent's collections array
    const result = await db
      .collection('collections')
      .updateOne(
        { shortId: parentShortId },
        { $addToSet: { collections: childShortId } }
      )

    if (result.matchedCount === 0) {
      return {
        success: false,
        error: 'Failed to update parent collection',
      }
    }

    if (result.modifiedCount === 0) {
      return {
        success: false,
        error: 'Collection reference was not added',
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Failed to add collection reference:', error)
    return {
      success: false,
      error: 'Database error occurred while adding collection reference',
    }
  }
}
