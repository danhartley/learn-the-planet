import { NextRequest, NextResponse } from 'next/server'

import RSS from 'rss'

import { getFilteredCollectionSummaries } from '@/api/database'

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
  }
  const collections = await getFilteredCollectionSummaries(filters)

  return collections
}

export async function GET(request: NextRequest) {
  try {
    const collections = await getPublishedTopicCollections()

    const feed = new RSS({
      title: 'Learn the Planet - Nature Topics',
      description:
        'Latest nature lessons, field notes, and articles from Learn the Planet',
      feed_url: request.url, // This will be the actual URL being accessed
      site_url: 'https://learn-the-planet.com',
      language: 'en',
      pubDate: new Date().toISOString(),
      ttl: 60, // cache for 60 minutes
    })

    collections.forEach((collection: CollectionSummary) => {
      // Build description with HTML including images
      let description = ''

      // Add featured image if available
      if (collection.imageUrl) {
        description += `<img src="${collection.imageUrl}" alt="${collection.name}" />`
      }

      // Add location if available
      if (collection.location) {
        description += `<strong>Location:</strong> ${collection.location}`
      }

      feed.item({
        title: collection.name,
        description: description || `New collection: ${collection.name}`,
        url: `https://learn-the-planet.com/collection/${collection.slug}-${collection.shortId}`,
        date: collection.createdAt || collection.updatedAt || new Date(),
        // Use custom_elements to include raw HTML description
        // custom_elements: description
        //   ? [{ 'content:encoded': { _cdata: description } }]
        //   : [],
        // // You can also use enclosure for the main image
        // ...(collection.imageUrl && {
        //   enclosure: {
        //     url: collection.imageUrl,
        //     type: 'image/jpeg', // you might want to detect the actual type
        //   },
        // }),
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
