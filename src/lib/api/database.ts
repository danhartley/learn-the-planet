import {
  Collection,
  CollectionSummary,
  UpdateCollectionFieldsOptions,
  CollectionStatus,
  Credit,
  CollectionFilters,
} from '@/types'
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
        imageUrl: collection.imageUrl || '',
        sectionOrder: collection.sectionOrder,
        ownerId: collection.ownerId,
        date: collection.date,
        location: collection.location,
        author: collection?.author,
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
      .sort({ createdAt: -1 }) // -1 for descending (newest first), 1 for ascending (oldest first)
      .toArray()

    return collections.map(collection => {
      return {
        id: collection._id.toString(),
        shortId: collection?.shortId || '',
        type: collection.type,
        name: collection.name,
        slug: collection?.slug || '',
        date: collection.date,
        location: collection.location,
        itemCount: collection.itemCount || 0,
        imageUrl: collection.imageUrl || '',
        status: collection.status,
        ownerId: collection.ownerId,
        author: collection?.author,
        createdAt: collection.createdAt,
        locale: collection.locale,
        country: collection.country,
        featured: true,
        tags: [],
        popularity: 0, // starts at 0
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

  const selectedCollection = {
    id: collection._id.toString(),
    shortId: collection.shortId || '',
    slug: collection.slug || '',
    items: collection.items,
    name: collection.name,
    type: collection.type,
    itemCount: collection.itemCount || collection.items?.length || 0,
    collections: collection?.collections || [],
    imageUrl: collection.imageUrl || '',
    sectionOrder: collection.sectionOrder,
    ownerId: collection.ownerId,
    date: collection.date,
    location: collection.location,
    author: collection?.author,
  }

  const orderedItems =
    collection.type === 'topic'
      ? selectedCollection.sectionOrder.map((order: string) => {
          return selectedCollection.items.find(
            (item: { id: string }) => (item.id as string) === order
          )
        })
      : collection.items

  return {
    ...selectedCollection,
    items: orderedItems,
  }
}

export const createCollection = async ({
  collection,
  collectionSummary,
}: {
  collection: Collection<unknown>
  collectionSummary: CollectionSummary
}) => {
  const client = await clientPromise
  const db = client.db(DB_NAME)
  const shortId = crypto.randomUUID().split('-')[0]
  const slug = collection.name.toLowerCase().replace(/\s+/g, '-')
  const itemCount = collection?.items?.length || 0 // 0
  const sectionOrder = collection.items?.map(
    item => (item as { id: string }).id
  ) // []

  let insertedId: string | null = null

  try {
    // Step 1: Insert into main collections table
    const result = await db.collection('collections').insertOne({
      ...collection,
      shortId,
      slug,
      itemCount,
      sectionOrder,
    })
    insertedId = result.insertedId.toString()

    // Step 2: Insert into collections summary table
    const summaryData: Omit<CollectionSummary, 'id'> = {
      ...collectionSummary,
      shortId,
      slug,
      itemCount,
    }

    await db.collection('collectionsSummary').insertOne({
      ...summaryData,
      _id: result.insertedId, // Use the same ID as the main collection
      createdAt: new Date(),
      updatedAt: new Date(),
      featured: false,
      popularity: 0,
    })

    return {
      id: insertedId,
      ...collection,
      shortId,
      slug,
      itemCount,
      sectionOrder,
    }
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
  console.log('updates', updates)
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
    // Replace the entire items array and recalculate itemCount
    const result = await db.collection('collections').findOneAndUpdate(
      { shortId },
      [
        {
          $set: {
            items: itemsArray, // Simply replace with the new array
          },
        },
        {
          $set: {
            itemCount: { $size: '$items' }, // Reference the field we just set
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
      itemCount: itemsArray.length, // Use the actual array length
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
      sectionOrder: result?.sectionOrder,
      ownerId: result?.ownerId,
      date: result?.date,
      location: result?.location,
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
      .collection<Collection<unknown>>('collections')
      .updateOne(
        { shortId: parentShortId },
        { $pull: { collections: { shortId: childShortId } } }
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

export const updateLinkedCollections = async (
  parentShortId: string,
  linkedCollections: CollectionSummary[]
): Promise<{
  success: boolean
  error?: string
  collection?: Collection<unknown>
}> => {
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

    // Step 2: Validate that all child collections exist (if any provided)
    if (linkedCollections.length > 0) {
      const childCollections = await db
        .collection('collections')
        .find({ shortId: { $in: linkedCollections.map(c => c.shortId) } })
        .toArray()

      if (childCollections.length !== linkedCollections.length) {
        const foundIds = childCollections.map(c => c.shortId)
        const missingIds = linkedCollections
          .map(c => c.shortId)
          .filter(id => !foundIds.includes(id))
        return {
          success: false,
          error: `Child collections not found: ${missingIds.join(', ')}`,
        }
      }
    }

    // Step 3: Update the parent collection's collections array
    const result = await db
      .collection('collections')
      .findOneAndUpdate(
        { shortId: parentShortId },
        { $set: { collections: linkedCollections } },
        { returnDocument: 'after' }
      )

    if (result?.matchedCount === 0) {
      return {
        success: false,
        error: 'Failed to update parent collection',
      }
    }

    return {
      success: true,
      collection: result as unknown as Collection<unknown>,
    }
  } catch (error) {
    console.error('Failed to update linked collections:', error)
    return {
      success: false,
      error: 'Database error occurred while updating linked collections',
    }
  }
}

export const updateCollectionFields = async (
  shortId: string,
  options: UpdateCollectionFieldsOptions
): Promise<Collection<unknown> | undefined> => {
  const client = await clientPromise
  const db = client.db(DB_NAME)

  // Build update object with only provided fields
  const updateFields: Record<string, string | Credit> = {}

  if (options.name !== undefined) {
    updateFields.name = options.name
  }

  if (options.slug !== undefined) {
    updateFields.slug = options.slug
  }

  if (options.imageUrl !== undefined) {
    updateFields.imageUrl = options.imageUrl
  }

  if (options.date !== undefined && options.date !== '') {
    updateFields.date = options.date
  }

  if (options.location !== undefined && options.location !== '') {
    updateFields.location = options.location
  }

  if (
    options.author !== undefined &&
    Array.isArray(options.author.authors) &&
    options.author.authors.length > 0
  ) {
    updateFields.author = options.author
  }

  // If no fields to update, return undefined
  if (Object.keys(updateFields).length === 0) {
    return undefined
  }

  try {
    const result = await db.collection('collections').findOneAndUpdate(
      { shortId },
      {
        $set: updateFields,
      },
      { returnDocument: 'after' }
    )

    if (!result) {
      return undefined
    }

    // Also update the collectionsSummary collection with the same fields
    await db.collection('collectionsSummary').updateOne(
      { shortId },
      {
        $set: updateFields,
      }
    )

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
      imageUrl: result?.imageUrl || '',
      sectionOrder: result?.sectionOrder,
      ownerId: result?.ownerId,
      date: result?.date,
      location: result?.location,
      author: result?.author,
    }
  } catch (error) {
    console.error('Failed to update collection fields:', error)
    throw error
  }
}

export const updateCollectionSectionOrder = async (
  shortId: string,
  sectionOrder: string[]
): Promise<Collection<unknown> | undefined> => {
  const client = await clientPromise
  const db = client.db(DB_NAME)

  try {
    const result = await db.collection('collections').findOneAndUpdate(
      { shortId },
      {
        $set: {
          sectionOrder: sectionOrder, // Simply replace with the new array
        },
      },
      { returnDocument: 'after' }
    )

    if (!result) {
      return undefined
    }

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
      imageUrl: result?.imageUrl || '',
      sectionOrder: result?.sectionOrder,
      ownerId: result?.ownerId,
      date: result?.date,
      location: result?.location,
      author: result?.author,
    }
  } catch (error) {
    console.error('Failed to update collection fields:', error)
    throw error
  }
}

export const updateAuthor = async (
  shortId: string,
  author: Credit
): Promise<Collection<unknown> | undefined> => {
  const client = await clientPromise
  const db = client.db(DB_NAME)

  try {
    const result = await db.collection('collections').findOneAndUpdate(
      { shortId },
      {
        $set: {
          author: author,
        },
      },
      { returnDocument: 'after' }
    )

    if (!result) {
      return undefined
    }

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
      imageUrl: result?.imageUrl || '',
      sectionOrder: result?.sectionOrder,
      ownerId: result?.ownerId,
      date: result?.date,
      location: result?.location,
      author: result?.author,
    }
  } catch (error) {
    console.error('Failed to update collection fields:', error)
    throw error
  }
}

export const updateCollectionItem = async (
  shortId: string,
  itemId: string,
  updatedItem: unknown
): Promise<unknown> => {
  const client = await clientPromise
  const db = client.db(DB_NAME)

  try {
    // First, try to update existing item
    const updateResult = await db.collection('collections').findOneAndUpdate(
      {
        shortId,
        'items.id': itemId,
      },
      {
        $set: {
          'items.$': updatedItem,
        },
      },
      { returnDocument: 'after' }
    )

    // If item was found and updated, return the updated collection
    if (updateResult) {
      return updateResult
    }

    // If item wasn't found, add it to the collection
    const addResult = await db.collection('collections').findOneAndUpdate(
      { shortId },
      {
        $push: {
          items: updatedItem,
          sectionOrder: itemId, // Add the itemId to sectionOrder array
          //eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
        $inc: {
          itemCount: 1,
        },
      },
      { returnDocument: 'after' }
    )

    // Update the summary collection with the new item count
    if (addResult) {
      await updateCollectionSummary(shortId, {
        itemCount: addResult.itemCount,
      })
    }

    if (!addResult) {
      throw new Error(`Collection with shortId ${shortId} not found`)
    }

    // Return the updated collection with newly added item
    return addResult
  } catch (error) {
    console.error('Failed to update collection item:', error)
    throw error
  }
}

export const deleteCollectionItem = async (
  shortId: string,
  itemId: string
): Promise<unknown> => {
  const client = await clientPromise
  const db = client.db(DB_NAME)

  try {
    // Delete the item from the collection and return updated collection
    const deleteResult = await db.collection('collections').findOneAndUpdate(
      {
        shortId,
        'items.id': itemId,
      },
      {
        $pull: {
          items: { id: itemId },
          sectionOrder: itemId, // Remove the itemId from sectionOrder array
          //eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
        $inc: {
          itemCount: -1,
        },
      },
      { returnDocument: 'after' }
    )

    if (!deleteResult) {
      throw new Error(`Item with id ${itemId} not found in collection`)
    }

    // Update the summary collection with the new item count
    if (deleteResult) {
      await updateCollectionSummary(shortId, {
        itemCount: deleteResult.itemCount,
      })
    }

    return deleteResult
  } catch (error) {
    console.error('Failed to delete collection item:', error)
    throw error
  }
}

export const updateCollectionStatus = async (
  shortId: string,
  status: CollectionStatus
): Promise<CollectionSummary | null> => {
  const client = await clientPromise
  const db = client.db(DB_NAME)

  try {
    const result = await db
      .collection('collectionsSummary')
      .findOneAndUpdate(
        { shortId },
        { $set: { status } },
        { returnDocument: 'after' }
      )

    if (!result) {
      console.log(`Collection with shortId ${shortId} not found`)
      return null
    }

    // Convert MongoDB _id to string id for the return type
    const updatedDocument: CollectionSummary = {
      ...result,
      id: result._id.toString(),
    } as unknown as CollectionSummary

    // Remove the _id field since we're using id
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (updatedDocument as any)._id

    return updatedDocument
  } catch (error) {
    console.error('Failed to update collection status:', error)
    throw error
  }
}

export const getFilteredCollectionSummaries = async (
  filters: CollectionFilters
): Promise<CollectionSummary[]> => {
  const client = await clientPromise
  const db = client.db(DB_NAME)

  try {
    // Build MongoDB query
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {}

    // Type filter
    if (filters.type) {
      query.type = filters.type
    }
    // Date range filter (inclusive)
    if (filters.updatedAt) {
      query.updatedAt = {
        $gte: new Date(filters.updatedAt.start),
        $lte: new Date(filters.updatedAt.end),
      }
    }
    console.log(filters?.updatedAt?.start)

    // Status filter
    if (filters.status) {
      query.status = filters.status
    }

    // Owner filter
    if (filters.ownerId) {
      query.ownerId = filters.ownerId
    }

    // Locale filter
    if (filters.locale) {
      query['locale.code'] = filters.locale
    }

    // Country filter
    if (filters.country) {
      query['country.code'] = filters.country
    }

    // Featured filter
    if (filters.featured !== undefined) {
      query.featured = filters.featured
    }

    // Tags filter (case insensitive, AND/OR logic)
    if (filters.tags && filters.tags.values.length > 0) {
      const normalisedTags = filters.tags.values.map(tag => tag.toLowerCase())

      if (filters.tags.logic === 'AND') {
        // All tags must be present
        query.tags = { $all: normalisedTags }
      } else {
        // Any tag can be present (OR logic)
        query.tags = { $in: normalisedTags }
      }
    }

    // Popularity filter (minimum threshold)
    if (filters.popularity !== undefined) {
      query.popularity = { $gte: filters.popularity }
    }

    const results = await db
      .collection('collectionsSummary')
      .find(query)
      .sort({ updatedAt: -1 }) // -1 for descending (newest first), 1 for ascending (oldest first)
      .toArray()

    // Convert MongoDB results to CollectionSummary format
    const collections: CollectionSummary[] = results.map(
      doc =>
        ({
          ...doc,
          id: doc._id.toString(),
          _id: undefined,
        }) as unknown as CollectionSummary
    )

    return collections
  } catch (error) {
    console.error('Failed to filter collections:', error)
    throw error
  }
}

// Single document update function
export const updateCollectionsSummaryField = async (
  shortId: string,
  fieldName: keyof CollectionSummary,
  fieldValue: unknown
): Promise<CollectionSummary | null> => {
  const client = await clientPromise
  const db = client.db(DB_NAME)

  try {
    // Normalise tags to lowercase if updating tags field
    let normalisedValue = fieldValue
    if (fieldName === 'tags' && Array.isArray(fieldValue)) {
      normalisedValue = fieldValue.map((tag: string) => tag.toLowerCase())
    }

    console.log(
      `Updating collection ${shortId}: ${String(fieldName)} = ${JSON.stringify(normalisedValue)}`
    )

    const result = await db
      .collection('collectionsSummary')
      .findOneAndUpdate(
        { shortId },
        { $set: { [fieldName]: normalisedValue } },
        { returnDocument: 'after' }
      )

    if (!result) {
      console.log(`Collection with shortId ${shortId} not found`)
      return null
    }

    // Convert MongoDB _id to string id for the return type
    const updatedDocument: CollectionSummary = {
      ...result,
      id: result._id.toString(),
    } as unknown as CollectionSummary

    // Remove the _id field since we're using id
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (updatedDocument as any)._id

    console.log(`Successfully updated collection ${shortId}`)
    return updatedDocument
  } catch (error) {
    console.error(`Failed to update collection field for ${shortId}:`, error)
    throw error
  }
}

// Bulk update function (all documents)
export const updateCollectionsSummaryFields = async (
  fieldName: keyof CollectionSummary,
  fieldValue: unknown
): Promise<number> => {
  const client = await clientPromise
  const db = client.db(DB_NAME)

  try {
    // Normalise tags to lowercase if updating tags field
    let normalisedValue = fieldValue
    if (fieldName === 'tags' && Array.isArray(fieldValue)) {
      normalisedValue = fieldValue.map((tag: string) => tag.toLowerCase())
    }

    console.log(
      `Bulk updating ALL collections: ${String(fieldName)} = ${JSON.stringify(normalisedValue)}`
    )

    const result = await db.collection('collectionsSummary').updateMany(
      {}, // Empty filter = all documents
      { $set: { [fieldName]: normalisedValue } }
    )

    console.log(`Successfully updated ${result.modifiedCount} collections`)
    return result.modifiedCount
  } catch (error) {
    console.error('Failed to bulk update collection fields:', error)
    throw error
  }
}

// Helper function to initialise new fields for existing collections
// export const initialiseNewFields = async (): Promise<number> => {
//   const client = await clientPromise
//   const db = client.db(DB_NAME)

//   try {
//     console.log('Initialising new fields for existing collections...')

//     // Default values for new fields
//     const defaultValues = {
//       locale: { code: 'en-GB', language: 'English (UK)' },
//       country: { code: 'GB', name: 'United Kingdom' },
//       featured: true,
//       tags: [],
//       popularity: 0,
//     }

//     // Use $setOnInsert for new documents and $set for existing documents with missing fields
//     const result = await db.collection('collectionsSummary').updateMany(
//       {
//         $or: [
//           { locale: { $exists: false } },
//           { country: { $exists: false } },
//           { featured: { $exists: false } },
//           { tags: { $exists: false } },
//           { popularity: { $exists: false } },
//         ],
//       },
//       {
//         $set: defaultValues,
//         $setOnInsert: defaultValues, // This ensures new documents get these values too
//       },
//       { upsert: false } // Set to true if you want to create documents that don't exist
//     )

//     console.log(
//       `Initialised new fields for ${result.modifiedCount} collections`
//     )
//     return result.modifiedCount
//   } catch (error) {
//     console.error('Failed to initialise new fields:', error)
//     throw error
//   }
// }

// export const initialiseNewFields = async (): Promise<number> => {
//   const client = await clientPromise
//   const db = client.db(DB_NAME)

//   try {
//     console.log('Adding or updating fields for collections...')

//     // Default values for new fields
//     const defaultValues = {
//       locale: { code: 'en-GB', language: 'English (UK)' },
//       country: {
//         code: 'en-GB',
//         countryCode: 'GB',
//         name: 'United Kingdom',
//       },
//       featured: true,
//       tags: [],
//       popularity: 0,
//     }

//     // Update all documents - add missing fields or update existing ones
//     const result = await db.collection('collectionsSummary').updateMany(
//       {}, // Empty filter to match all documents
//       {
//         $set: defaultValues, // This will add missing fields or update existing ones
//       }
//     )

//     console.log(
//       `Added or updated fields for ${result.modifiedCount} collections`
//     )
//     return result.modifiedCount
//   } catch (error) {
//     console.error('Failed to add or update fields:', error)
//     throw error
//   }
// }

export const initialiseNewFields = async (): Promise<number> => {
  const client = await clientPromise
  const db = client.db(DB_NAME)

  try {
    console.log('Adding or updating fields for collections...')

    // Default values for new fields
    const defaultValues = {
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Update all documents - add missing fields or update existing ones
    const result = await db.collection('collectionsSummary').updateMany(
      {}, // Empty filter to match all documents
      {
        $set: defaultValues, // This will add missing fields or update existing ones
      }
    )

    console.log(
      `Added or updated fields for ${result.modifiedCount} collections`
    )
    return result.modifiedCount
  } catch (error) {
    console.error('Failed to add or update fields:', error)
    throw error
  }
}

// Example usage:

/*
// Filter examples:
const recentEnglishCollections = await filterCollectionsSummary({
  updatedAt: {
    start: new Date('2024-01-01'),
    end: new Date('2024-12-31')
  },
  locale: 'en',
  featured: true,
  popularity: 10
})

const collectionsWithNatureTags = await filterCollectionsSummary({
  tags: {
    values: ['nature', 'wildlife'],
    logic: 'OR'
  },
  status: 'public'
})

// Update examples:
await updateCollectionsSummaryField('abc123', 'featured', true)
await updateCollectionsSummaryField('def456', 'tags', ['nature', 'Biology'])

// Bulk update examples:
await updateCollectionsSummaryFields('popularity', 0) // Reset all popularity scores
await updateCollectionsSummaryFields('featured', false) // Unfeature all collections

// Initialise new fields for existing collections:
await initialiseNewFields()
*/
