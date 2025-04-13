// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  basePath: '',
  images: {
    remotePatterns: [new URL('https://content.eol.org/data/media/**')],
  },
}

export default nextConfig
