/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {protocol: 'https', hostname: 'sungate.md', port: '', pathname: '/account13/**' }
    ],
    domains: ['sungate.md']
  }
}

module.exports = nextConfig
