import { NextRequest, NextResponse } from 'next/server'

import RSS from 'rss'

import {
  getFilteredCollectionSummaries,
  getAuthorsByOwnerIds,
} from '@/api/database'

import {
  CollectionFilters,
  ContentHandlerType,
  CollectionSummary,
} from '@/types'

async function getPublishedTopicCollections() {
  const topic: ContentHandlerType = 'topic' as unknown as ContentHandlerType
  const filters: CollectionFilters = {
    type: topic,
    status: 'public',
    limit: 10, // number of topics to return in the feed
  }
  const collections = await getFilteredCollectionSummaries(filters)

  // Get unique owner IDs (for batch author lookup)
  const ownerIds = [
    ...new Set(collections.map(collection => collection.ownerId)),
  ]

  // Batch fetch authors
  const authors = await getAuthorsByOwnerIds(ownerIds)

  // Create author lookup map
  const authorMap = new Map(
    authors.map(author => [author.ownerId, author.displayName])
  )

  return { collections, authors, authorMap }
}

function createSafeUrl(slug: string, shortId: string) {
  return `https://learn-the-planet.com/collection/${encodeURIComponent(slug)}-${shortId}`
}

export async function GET(request: NextRequest) {
  try {
    const { collections, authors, authorMap } =
      await getPublishedTopicCollections()

    const feed = new RSS({
      title: 'Learn the Planet',
      description:
        'Latest nature lessons, field notes, and articles from Learn the Planet',
      feed_url: request.url, // The URL being accessed
      site_url: 'https://learn-the-planet.com',
      pubDate: new Date().toISOString(),
      ttl: 120, // cache for 2 hours
    })

    collections.forEach((collection: CollectionSummary) => {
      // Build description with HTML including images
      let description = ''

      const author = authorMap.get(collection.ownerId)

      if (author) {
        description += `<p><strong>Author</strong>: ${author}</p>`
      }

      // Add featured image if available
      if (collection.imageUrl) {
        description += `<p style="width: 130px; height: 78px; margin: 10px 0; padding: 10px;"><img src="${collection.imageUrl}" alt="${collection.name}" style="width: 130px; height: 78px;" /></p>`
      }

      // Add location if available
      if (collection.location) {
        description += `<p><strong>Location:</strong> ${collection.location}</p>`
      }

      feed.item({
        title: collection.name,
        description: description || collection.name,
        url: createSafeUrl(collection.slug, collection.shortId || ''),
        date: collection.createdAt || collection.updatedAt || new Date(),
      })
    })

    const xml = feed.xml({ indent: true })

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('RSS feed generation error:', error)
    return new NextResponse('Error generating RSS feed', { status: 500 })
  }
}

// Optional: Handle HEAD requests
export async function HEAD(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}
