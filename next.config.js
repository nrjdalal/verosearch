/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    APIURL: process.env.APIURL || 'https://prowlarr.at7.in', // Your Prowlarr hosting URL/Domain e.g. https://prowlarr.com
    APIKEY: process.env.APIKEY || '3fbb3827a1c34737bf268287c4c93986', // Prowlarr > Settings > General > Security > API Key
  },
}

module.exports = nextConfig
