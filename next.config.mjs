/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    nodeMiddleware: true,
    typedRoutes: true,
    authInterrupts: true,
  },
}

export default nextConfig
