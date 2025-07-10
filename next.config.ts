// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  distDir: 'out', // output build directory
  basePath: '',
  images: {
    remotePatterns: [
      new URL('https://content.eol.org/data/media/**'),
      new URL('https://inaturalist-open-data.s3.amazonaws.com/**'),
      new URL('https://static.inaturalist.org/photos/**'),
      new URL('https://res.cloudinary.com/**'),
    ],
  },
}

export default nextConfig
