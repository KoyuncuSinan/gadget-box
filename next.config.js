/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"media.rawg.io",
        port: "",
        pathname: "/media/**"
      },
    ],
  },
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
