import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const public_id = searchParams.get('public_id')
  const folder = searchParams.get('folder')
  const max_results = searchParams.get('max_results') || '10'
  const next_cursor = searchParams.get('next_cursor')
  const resource_type = searchParams.get('resource_type') || 'image'
  const tags = searchParams.get('tags')
  const collectionId = searchParams.get('collectionId')
  const userId = searchParams.get('userId')

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
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
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
