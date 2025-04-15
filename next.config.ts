// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  basePath: '',
  images: {
    remotePatterns: [
      new URL('https://content.eol.org/data/media/**'),
      new URL('https://inaturalist-open-data.s3.amazonaws.com/**'),
      new URL('https://static.inaturalist.org/photos/**'),
    ],
  },
}

export default nextConfig
