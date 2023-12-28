/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "edenartlab-prod-data.s3.us-east-1.amazonaws.com",
        hostname: "edenartlab-stage-data.s3.us-east-1.amazonaws.com",
      },
      {
        hostname: "edenartlab-prod-data.s3.us-east-1.amazonaws.com",
        hostname: "edenartlab-stage-data.s3.us-east-1.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
