// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'orqnbchaxsghayeyoqtc.supabase.co',
        port: '',
        pathname: '/**',
      }
    ]
  },
};

module.exports = nextConfig;