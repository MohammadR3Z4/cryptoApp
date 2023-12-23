/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  ...nextConfig,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.coinranking.com' ,
        port: '',
        pathname: '/**/**',
      },
      {
        protocol: 'https',
        hostname: 'www.coindesk.com',
        port: '',
        pathname: '/resizer/**',
      },
    ],
  },
};