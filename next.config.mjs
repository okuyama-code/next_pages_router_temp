/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3001'
  },
  publicRuntimeConfig: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3001'
  }
}

export default nextConfig