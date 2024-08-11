/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "malabargoldanddiamonds.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
