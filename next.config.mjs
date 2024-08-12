/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://lh6ujwj0tj.execute-api.ap-northeast-2.amazonaws.com/:path*",
      },
    ];
  },
};

export default nextConfig
