import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

interface CloudinaryResource {
  public_id: string
  format: string
  version: number
  resource_type: string
  type: string
  created_at: string
  bytes: number
  width: number
  height: number
  url: string
  secure_url: string
}

interface ImageResponse {
  success: boolean
  data?: CloudinaryResource | CloudinaryResource[]
  error?: string
  pagination?: {
    next_cursor?: string
    total_count?: number
  }
}

// For App Router (app/api/images/route.ts)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  console.log('searchParams', searchParams)
  const public_id = searchParams.get('public_id')
  const folder = searchParams.get('folder')
  const max_results = searchParams.get('max_results') || '10'
  const next_cursor = searchParams.get('next_cursor')
  const resource_type = searchParams.get('resource_type') || 'image'
  const tags = searchParams.get('tags')
  const collectionId = searchParams.get('collectionId')
  const userId = searchParams.get('userId')
  console.log('collectionId', collectionId)
  console.log('userId', userId)

  // Image transformation parameters
  const width = searchParams.get('width')
    ? parseInt(searchParams.get('width')!, 10)
    : 400
  const height = searchParams.get('height')
    ? parseInt(searchParams.get('height')!, 10)
    : 300
  const crop = searchParams.get('crop') || 'fill'
  const quality = searchParams.get('quality') || 'auto'
  const format = searchParams.get('format') || 'webp'

  try {
    // If public_id is provided, get a specific image
    if (public_id) {
      const result = await cloudinary.api.resource(public_id, {
        resource_type: resource_type as string,
      })

      // Add transformed URLs to the result
      const transformedUrl = cloudinary.url(result.public_id, {
        width,
        height,
        crop,
        quality,
        format,
        secure: true,
      })

      const thumbnailUrl = cloudinary.url(result.public_id, {
        width: 150,
        height: 150,
        crop: 'fill',
        quality: 'auto',
        format: 'webp',
        secure: true,
      })

      console.log('Single image - public_id:', result.public_id) // Debug log
      console.log('Single image - transformed URL:', transformedUrl) // Debug log

      const transformedResult = {
        ...result,
        transformed_url: transformedUrl,
        thumbnail_url: thumbnailUrl,
      }

      return Response.json({
        success: true,
        data: transformedResult,
      })
    }

    // Otherwise, list images with optional filters
    const searchOptions: any = {
      resource_type: resource_type as string,
      max_results: parseInt(max_results, 10),
    }

    if (next_cursor) {
      searchOptions.next_cursor = next_cursor
    }

    if (folder) {
      searchOptions.prefix = folder
    }

    if (tags) {
      searchOptions.tags = true
    }

    const tag = collectionId
      ? `collection-${collectionId}`
      : userId
        ? `user-${userId}`
        : null
    const result = tag
      ? await cloudinary.api.resources_by_tag(tag)
      : await cloudinary.api.resources(searchOptions)

    // Add transformed URLs to each image
    const transformedResources = result.resources.map((resource: any) => {
      console.log('Resource public_id:', resource.public_id) // Debug log

      const transformedUrl = cloudinary.url(resource.public_id, {
        width,
        height,
        crop,
        quality,
        format,
        secure: true,
      })

      const thumbnailUrl = cloudinary.url(resource.public_id, {
        width: 150,
        height: 150,
        crop: 'fill',
        quality: 'auto',
        format: 'webp',
        secure: true,
      })

      // console.log('Generated transformed URL:', transformedUrl) // Debug log
      // console.log('Generated thumbnail URL:', thumbnailUrl) // Debug log

      return {
        ...resource,
        transformed_url: transformedUrl,
        thumbnail_url: thumbnailUrl,
      }
    })

    return Response.json({
      success: true,
      data: transformedResources,
      pagination: {
        next_cursor: result.next_cursor,
        total_count: result.total_count,
      },
    })
  } catch (error) {
    console.error('Cloudinary API error:', error)
    return Response.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : 'Failed to retrieve images',
      },
      { status: 500 }
    )
  }
}

// Helper function to generate transformed URLs
export function getTransformedImageUrl(
  publicId: string,
  transformations: {
    width?: number
    height?: number
    crop?: string
    quality?: string
    format?: string
  } = {}
): string {
  return cloudinary.url(publicId, {
    ...transformations,
    secure: true,
  })
}

// TypeScript types for client-side usage
export type { CloudinaryResource, ImageResponse }
