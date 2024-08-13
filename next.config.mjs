/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['khtml.kr.object.ncloudstorage.com'],
  },
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    NCP_ACCESS_KEY_ID: process.env.NCP_ACCESS_KEY_ID,
    NCP_SECRET_ACCESS_KEY: process.env.NCP_SECRET_ACCESS_KEY,
    NCP_BUCKET_NAME: process.env.NCP_BUCKET_NAME,
    NCP_REGION: process.env.NCP_REGION,
  },
}

export default nextConfig
