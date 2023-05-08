/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.node = {
        __dirname: true,
      }
    }

    return config
  },
}

module.exports = nextConfig
